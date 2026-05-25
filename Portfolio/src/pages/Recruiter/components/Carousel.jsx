import { useState, useEffect, useRef } from "react";
import "./Carousel.css";

export default function Carousel({
  items = [],
  baseWidth = 860,
  autoplay = false,
  autoplayDelay = 3200,
  pauseOnHover = false,
  loop = true,
  round = false,
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
    return <div className="carousel">No items to display</div>;
  }

  const currentItem = items[currentIndex];
  const itemStyle = round ? { borderRadius: "12px" } : {};

  return (
    <div
      className="carousel"
      style={{ maxWidth: `${baseWidth}px` }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="carousel__viewport">
        <div
          className="carousel__item"
          style={itemStyle}
        >
          {currentItem.image && (
            currentItem.href ? (
              <a
                href={currentItem.href}
                target="_blank"
                rel="noreferrer"
                className="carousel__image-link"
              >
                <img src={currentItem.image} alt={currentItem.title} className="carousel__image" />
              </a>
            ) : (
              <img src={currentItem.image} alt={currentItem.title} className="carousel__image" />
            )
          )}
          <div className="carousel__content">
            <h3 className="carousel__title">
              {currentItem.href ? (
                <a href={currentItem.href} target="_blank" rel="noreferrer">
                  {currentItem.title}
                </a>
              ) : (
                currentItem.title
              )}
            </h3>
            <p className="carousel__description">{currentItem.description}</p>
            {currentItem.href && (
              <a
                href={currentItem.href}
                target="_blank"
                rel="noreferrer"
                className="carousel__link"
              >
                View live site →
              </a>
            )}
          </div>
        </div>
      </div>

      {items.length > 1 && (
        <>
          <button
            className="carousel__button carousel__button--prev"
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="carousel__button carousel__button--next"
            onClick={handleNext}
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="carousel__indicators">
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`carousel__dot ${idx === currentIndex ? "carousel__dot--active" : ""}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
