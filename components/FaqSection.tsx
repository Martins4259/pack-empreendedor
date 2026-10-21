"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import styles from "./ClosingSections.module.css";

const questions = [
  { question: "O aplicativo é realmente gratuito?", answer: "Sim. O Pack Empreendedor será disponibilizado gratuitamente para dispositivos Android." },
  { question: "Preciso fazer cadastro?", answer: "Não. O acesso inicial ao aplicativo não exigirá cadastro obrigatório." },
  { question: "Quais cursos estarão disponíveis?", answer: "O aplicativo reunirá conteúdos sobre empreendedorismo, gestão financeira, marketing, atendimento e desenvolvimento profissional." },
  { question: "Como faço para instalar o aplicativo?", answer: "Após baixar o APK, abra o arquivo no seu celular Android e siga as instruções de instalação. O dispositivo poderá solicitar autorização para instalar aplicativos dessa origem." },
  { question: "O aplicativo funciona no iPhone?", answer: "Esta versão será destinada a dispositivos Android. Ainda não há uma versão disponível para iPhone." },
  { question: "Os cursos oferecem certificado?", answer: "As condições de certificação dependem de cada curso. Consulte as informações correspondentes antes de considerar a emissão de certificados." },
];

export function FaqSection() {
  const [expanded, setExpanded] = useState<string[]>([]);
  return (
    <section id="perguntas" className={styles.faq} aria-labelledby="faq-title">
      <div className={`container ${styles.faqLayout}`}>
        <h2 id="faq-title" className={styles.title}>Ainda tem alguma dúvida?</h2>
        <div className={styles.questions}>
          {questions.map(({ question, answer }, index) => {
            const id = `faq-answer-${index}`;
            const open = expanded.includes(id);
            return (
              <div key={question} className={styles.question}>
                <h3 className={styles.questionHeading}>
                  <button id={`${id}-trigger`} className={styles.trigger} aria-expanded={open} aria-controls={id} onClick={() => setExpanded(current => open ? current.filter(value => value !== id) : [...current, id])}>
                    <span>{question}</span>
                    <Plus className={styles.indicator} size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div id={id} className={styles.answer} data-open={open} role="region" aria-labelledby={`${id}-trigger`} aria-hidden={!open} inert={!open}>
                  <div className={styles.answerInner}><p>{answer}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

