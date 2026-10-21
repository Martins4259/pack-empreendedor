import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Course } from "@/data/courses";
export function CourseCard({ course }: { course: Course }) {
  return <article className="course-card">
    <div className="course-image">{course.image ?
      <Image src={course.image.src} alt={course.image.alt} fill sizes="(min-width: 1440px) 320px, (min-width: 1024px) 30vw, (min-width: 640px) 40vw, 76vw" style={{ objectFit: "cover", objectPosition: course.image.position }} /> :
      <div className="image-pending"><ImageIcon size={26} aria-hidden="true" /><span>Fotografia em seleção</span></div>}
    </div>
    <div className="course-copy"><h3>{course.title}</h3><p>{course.description}</p></div>
  </article>;
}
