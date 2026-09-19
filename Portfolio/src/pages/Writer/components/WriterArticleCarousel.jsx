import { useState, useMemo } from "react";
import BirdCard from "./BirdCard";

const CARD_COLORS = ["lavender", "lime", "sky"];

function assignAlternatingColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const avoid = new Set();
    if (i > 0) avoid.add(colors[i - 1]);
    if (i >= 3) avoid.add(colors[i - 3]);
    const pick = CARD_COLORS.find((c) => !avoid.has(c)) ?? CARD_COLORS[i % CARD_COLORS.length];
    colors.push(pick);
  }
  return colors;
}

function shortText(text, max = 110) {
  if (!text) return "";
  const oneLine = text.replace(/\s+/g, " ").trim();
  return oneLine.length > max ? oneLine.slice(0, max) + "…" : oneLine;
}

export default function WriterArticleCarousel({ articles = [] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(articles.length / itemsPerPage) || 1;

  // Ensure page index is bounded
  const activePage = Math.min(currentPage, totalPages - 1);

  const visibleArticles = useMemo(() => {
    const start = activePage * itemsPerPage;
    return articles.slice(start, start + itemsPerPage);
  }, [articles, activePage]);

  const postColors = useMemo(
    () => assignAlternatingColors(visibleArticles.length),
    [visibleArticles.length]
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  if (articles.length === 0) {
    return <p className="section-copy centered-status">No articles found.</p>;
  }

  return (
    <div className="writer-carousel-container">
      {/* 3 Cards Grid */}
      <div className="writer-promise__grid writer-blogs__grid">
        {visibleArticles.map((post, i) => (
          <BirdCard
            key={post.id || i}
            href={`/writer/${post.id}`}
            title={post.title}
            text={shortText(post.excerpt || post.content)}
            color={postColors[i]}
            date={post.date}
            imageUrl={post.coverImage || post.image_url}
          />
        ))}
      </div>

      {/* Carousel Navigation (Only visible if > 3 items) */}
      {totalPages > 1 && (
        <div className="recruiter-carousel__controls" style={{ marginTop: "2rem" }}>
          <button
            type="button"
            className="recruiter-carousel__arrow"
            onClick={handlePrev}
            aria-label="Previous page"
          >
            ‹
          </button>

          <div className="recruiter-carousel__dots">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`recruiter-carousel__dot ${idx === activePage ? "is-active" : ""}`}
                onClick={() => setCurrentPage(idx)}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="recruiter-carousel__arrow"
            onClick={handleNext}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
