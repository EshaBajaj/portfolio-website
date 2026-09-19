import { useState, useEffect, useRef } from "react";
import { BsGithub, BsArrowUpRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./Carousel.css";

export default function Carousel({
  items = [],
  baseWidth = 960,
  autoplay = false,
  autoplayDelay = 4000,
  pauseOnHover = true,
  loop = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef(null);

  useEffect(() => {
    if (!autoplay || isPaused || items.length === 0) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      return;
    }

    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (loop ? (prev + 1) % items.length : Math.min(prev + 1, items.length - 1)));
    }, autoplayDelay);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, autoplayDelay, isPaused, loop, items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (loop ? (prev - 1 + items.length) % items.length : Math.max(prev - 1, 0)));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (loop ? (prev + 1) % items.length : Math.min(prev + 1, items.length - 1)));
  };

  if (!items || items.length === 0) {
    return <div className="carousel">No projects to display</div>;
  }

  const currentItem = items[currentIndex];

  return (
    <div
      className="carousel-container"
      style={{ maxWidth: `${baseWidth}px` }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="carousel-card">
        {/* Visual Preview Side */}
        <div className="carousel-card__media">
          {currentItem.category && (
            <span className="carousel-card__badge">{currentItem.category}</span>
          )}
          {currentItem.image ? (
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="carousel-card__img"
            />
          ) : (
            <div className="carousel-card__img-placeholder">Project Preview</div>
          )}
        </div>

        {/* Content Side */}
        <div className="carousel-card__info">
          <div className="carousel-card__header">
            <span className="carousel-card__counter">
              0{currentIndex + 1} / 0{items.length}
            </span>
            <h3 className="carousel-card__title">{currentItem.title}</h3>
          </div>

          <p className="carousel-card__desc">{currentItem.description}</p>

          {/* Tech Stack Pills */}
          {currentItem.tags && currentItem.tags.length > 0 && (
            <div className="carousel-card__tags">
              {currentItem.tags.map((tag) => (
                <span key={tag} className="carousel-card__tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Links */}
          <div className="carousel-card__actions">
            {currentItem.href && (
              <a
                href={currentItem.href}
                target="_blank"
                rel="noreferrer noopener"
                className="carousel-card__btn carousel-card__btn--primary"
              >
                <span>Live Demo</span>
                <BsArrowUpRight className="carousel-card__btn-icon" />
              </a>
            )}
            {currentItem.github && (
              <a
                href={currentItem.github}
                target="_blank"
                rel="noreferrer noopener"
                className="carousel-card__btn carousel-card__btn--secondary"
              >
                <BsGithub className="carousel-card__btn-icon" />
                <span>Repository</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      {items.length > 1 && (
        <div className="carousel-controls">
          <div className="carousel-controls__dots">
            {items.map((item, idx) => (
              <button
                key={item.id || idx}
                type="button"
                className={`carousel-controls__dot ${
                  idx === currentIndex ? "carousel-controls__dot--active" : ""
                }`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to project ${idx + 1}`}
              />
            ))}
          </div>

          <div className="carousel-controls__nav">
            <button
              type="button"
              className="carousel-controls__btn"
              onClick={handlePrev}
              aria-label="Previous project"
            >
              <BsChevronLeft />
            </button>
            <button
              type="button"
              className="carousel-controls__btn"
              onClick={handleNext}
              aria-label="Next project"
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
