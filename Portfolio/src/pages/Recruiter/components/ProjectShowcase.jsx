import { useState } from "react";
import { BsGithub, BsArrowUpRight, BsX, BsCodeSlash, BsCheckCircleFill } from "react-icons/bs";
import "./ProjectShowcase.css";

const CATEGORIES = ["All", "Full-Stack", "Systems & AI", "Open Source"];

export default function ProjectShowcase({ projects = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.filterCategory === activeCategory);

  return (
    <div className="project-showcase">
      {/* Category Filter Tabs */}
      <div className="project-showcase__filters" role="tablist">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat}
            className={`project-showcase__filter-btn ${
              activeCategory === cat ? "is-active" : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="project-showcase__grid">
        {filteredProjects.map((project) => (
          <article key={project.id} className="project-card">
            {/* Mock Window Topbar */}
            <div className="project-card__window-header">
              <div className="project-card__dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <span className="project-card__domain">{project.domain || "app.internal"}</span>
            </div>

            {/* Media Container */}
            <div className="project-card__media">
              <img
                src={project.image}
                alt={project.title}
                className="project-card__img"
                loading="lazy"
              />
              <span className="project-card__category-badge">{project.category}</span>
            </div>

            {/* Info Body */}
            <div className="project-card__body">
              <div className="project-card__header">
                <h3 className="project-card__title">{project.title}</h3>
              </div>

              <p className="project-card__desc">{project.description}</p>

              {/* Technical Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="project-card__highlights">
                  {project.highlights.map((item, idx) => (
                    <li key={idx}>
                      <BsCheckCircleFill className="highlight-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech Stack Pills */}
              {project.tags && (
                <div className="project-card__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions Footer */}
              <div className="project-card__footer">
                <div className="project-card__links">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="project-card__btn project-card__btn--primary"
                    >
                      <span>Live Demo</span>
                      <BsArrowUpRight className="btn-icon" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="project-card__btn project-card__btn--secondary"
                    >
                      <BsGithub className="btn-icon" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                {project.architecture && (
                  <button
                    type="button"
                    className="project-card__details-btn"
                    onClick={() => setSelectedProject(project)}
                  >
                    <BsCodeSlash />
                    <span>Tech Spec</span>
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Technical Spec Drawer / Modal */}
      {selectedProject && (
        <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="project-modal__close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <BsX />
            </button>

            <div className="project-modal__header">
              <span className="project-modal__badge">{selectedProject.category}</span>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
            </div>

            <div className="project-modal__content">
              {selectedProject.architecture && (
                <div className="project-modal__section">
                  <h4>Technical Architecture</h4>
                  <p>{selectedProject.architecture.overview}</p>
                  <ul>
                    {selectedProject.architecture.stackDetails?.map((detail, idx) => (
                      <li key={idx}>
                        <strong>{detail.label}:</strong> {detail.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.architecture?.challenges && (
                <div className="project-modal__section">
                  <h4>Engineering Decisions & Impact</h4>
                  <ul>
                    {selectedProject.architecture.challenges.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="project-modal__footer">
              {selectedProject.href && (
                <a
                  href={selectedProject.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card__btn project-card__btn--primary"
                >
                  Visit Live Site ↗
                </a>
              )}
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card__btn project-card__btn--secondary"
                >
                  <BsGithub /> GitHub Repository
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
