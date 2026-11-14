import { foundationContent as content } from '../config/content'

export function ContentSurface() {
  return <section aria-label="Nội dung chính">
    <h2 id="projects">Dự án</h2>
    {content.projects.map(project => <article key={project.id} id={project.id}>
      <h3>{project.title}</h3><p>{project.description}</p><a href={project.link}>Xem {project.title}</a>
    </article>)}
    <h2 id="contact">Liên hệ với Long</h2><p>Cùng trao đổi.</p>
    <a href={`mailto:${content.email}`}>Email</a> · <a href={content.github}>GitHub</a>
  </section>
}
