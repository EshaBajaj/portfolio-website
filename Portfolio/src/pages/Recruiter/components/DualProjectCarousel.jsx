import { useState } from "react";
import { BsGithub, BsArrowUpRight, BsChevronLeft, BsChevronRight, BsX, BsCodeSlash, BsCheckCircleFill } from "react-icons/bs";
import "./DualProjectCarousel.css";

export default function DualProjectCarousel({ projects = [] }) {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  // Maximum 2 projects visible at once
  const visibleProjects = projects.slice(startIndex, startIndex + 2);
  const totalPages = Math.ceil(projects.length / 2);
  const currentPage = Math.floor(startIndex / 2) + 1;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 2));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 2 < projects.length ? prev + 2 : prev));
  };

  return (
    <div className="dual-carousel-wrapper">
      {/* Header Controls Bar */}
      <div className="dual-carousel-header">
        <div className="dual-carousel-page-indicator">
          <span>Page {currentPage} of {totalPages}</span>
        </div>

        <div className="dual-carousel-controls">
          <button
            type="button"
            className="dual-carousel-btn"
            onClick={handlePrev}
            disabled={startIndex === 0}
            aria-label="Previous projects"
          >
            <BsChevronLeft />
          </button>
          <button
            type="button"
            className="dual-carousel-btn"
            onClick={handleNext}
            disabled={startIndex + 2 >= projects.length}
            aria-label="Next projects"
          >
            <BsChevronRight />
          </button>
        </div>
      </div>

      {/* 2-Card Grid Track */}
      <div className="dual-carousel-grid">
        {visibleProjects.map((project) => (
          <article key={project.id} className="project-card">
            {/* Window Header */}
            <div className="project-card__window-header">
              <div className="project-card__dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <span className="project-card__domain">{project.domain || "app.internal"}</span>
            </div>

            {/* Media */}
            <div className="project-card__media">
              <img
                src={project.image}
                alt={project.title}
                className="project-card__img"
                loading="lazy"
              />
              <span className="project-card__category-badge">{project.category}</span>
            </div>

            {/* Content */}
            <div className="project-card__body">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>

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

              {project.tags && (
                <div className="project-card__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

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

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="dual-carousel-dots">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              type="button"
              className={`dual-carousel-dot ${
                idx === Math.floor(startIndex / 2) ? "is-active" : ""
              }`}
              onClick={() => setStartIndex(idx * 2)}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Tech Spec Modal */}
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
