"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowLeft, ArrowRight, Pause, Play, MoveRight } from "lucide-react";
import { courses } from "@/data/courses";
import { CourseCard } from "./CourseCard";
export function CourseCarousel({ informational = false }: { informational?: boolean }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const hovered = useRef(false);
  const focused = useRef(false);
  const [ref, api] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [AutoScroll({ speed: 0.35, startDelay: 1500, playOnInit: false, stopOnInteraction: true, stopOnMouseEnter: true, stopOnFocusIn: true })]);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const resume = useCallback(() => {
    if (!paused && !reduced && !hovered.current && !focused.current) api?.plugins().autoScroll?.play();
  }, [api, paused, reduced]);
  useEffect(() => {
    const plugin = api?.plugins().autoScroll;
    if (paused || reduced) plugin?.stop(); else resume();
    api?.on("pointerUp", resume); api?.on("reInit", resume);
    const visibility = () => { if (document.hidden) plugin?.stop(); else resume(); };
    document.addEventListener("visibilitychange", visibility);
    return () => { api?.off("pointerUp", resume); api?.off("reInit", resume); document.removeEventListener("visibilitychange", visibility); };
  }, [api, paused, reduced, resume]);
  return <section id="cursos" className="courses-section" aria-labelledby="courses-title">
    <div className="container">
      <div className="section-top"><div><p className="eyebrow">CONHECIMENTO QUE VIRA PRÁTICA</p><h2 id="courses-title">{informational ? "Conheça temas para desenvolver seu negócio" : <>Conheça os cursos<br className="desktop-break" /> que estarão no aplicativo</>}</h2></div><p className="section-description">{informational ? "Explore os temas e consulte os conteúdos diretamente no site oficial do Sebrae Goiás." : "Conteúdos gratuitos que você poderá acessar pelo aplicativo para empreender, desenvolver novas habilidades e fazer seu negócio crescer."}</p></div>
      <div className="carousel" role="region" aria-roledescription="carrossel" aria-label={informational ? "Temas sobre empreendedorismo" : "Cursos do aplicativo Pack Empreendedor"} onMouseEnter={() => { hovered.current = true; api?.plugins().autoScroll?.stop(); }} onMouseLeave={() => { hovered.current = false; resume(); }} onFocusCapture={() => { focused.current = true; api?.plugins().autoScroll?.stop(); }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) { focused.current = false; resume(); } }}>
        <div className="carousel-viewport" ref={ref}><div className="carousel-track">{courses.map(course => <div className="carousel-slide" key={course.slug}><CourseCard course={course} /></div>)}</div></div>
        <div className="carousel-bottom"><p className="swipe-hint">Explore os temas <MoveRight size={20} aria-hidden="true" /></p><div className="carousel-controls">
          <button className="icon-button" aria-label="Curso anterior" onClick={() => api?.scrollPrev()}><ArrowLeft size={19} aria-hidden="true" /></button>
          <button className="icon-button" aria-label={paused ? "Ativar movimento automático" : "Pausar movimento automático"} aria-pressed={paused} disabled={reduced} onClick={() => setPaused(value => !value)}>{paused || reduced ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}</button>
          <button className="icon-button" aria-label="Próximo curso" onClick={() => api?.scrollNext()}><ArrowRight size={19} aria-hidden="true" /></button>
        </div></div>
      </div>
      <div className="catalog-note"><p>{informational ? "Os temas apresentados são informativos. Consulte a disponibilidade e as condições dos conteúdos no site oficial." : "O aplicativo reúne 10 cursos sobre empreendedorismo e gestão."}</p><p>As descrições são apresentações editoriais, e não ementas oficiais.</p></div>
    </div>
  </section>;
}


