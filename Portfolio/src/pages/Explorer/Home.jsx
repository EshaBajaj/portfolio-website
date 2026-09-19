import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../../context/PortfolioDataContext";
import explorerImage from "../../assets/images/explorer.jpg";
import ExplorerModal from "./ExplorerModal";
import "./Home.css";

export default function ExplorerHome() {
  const { explorations } = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return explorations;
    if (activeCategory === "Experiments")
      return explorations.filter((item) => item.category === "Experiments");
    if (activeCategory === "Rabbit Hole")
      return explorations.filter((item) => item.category === "Rabbit Hole");
    if (activeCategory === "PRDs & BRDs")
      return explorations.filter(
        (item) => item.category === "PRDs & Case Studies" || item.category === "PRDs & BRDs"
      );
    if (activeCategory === "Desk Notes")
      return explorations.filter((item) => item.category === "Desk Notes");
    return explorations;
  }, [explorations, activeCategory]);

  return (
    <div className="explorer-page-wrapper">
      {/* Top Navigation Back CTA */}
      <header className="explorer-simple-nav">
        <Link to="/" className="explorer-back-cta">
          ← Back to Profiles
        </Link>
      </header>

      {/* Hero Header with Background Woman Graphic */}
      <section className="explorer-hero-section">
        <div className="explorer-hero-container">
          <div className="explorer-hero-text">
            <h1 className="explorer-hero-title">
              things i've been <span className="explorer-hero-highlight">messing with lately...</span>
            </h1>
          </div>

          <div className="explorer-hero-illustration">
            <img
              src={explorerImage}
              alt="Esha Bajaj - Explorer"
              className="explorer-woman-img"
            />
          </div>
        </div>
      </section>

      {/* Filter Category Bar */}
      <section className="explorer-content-section">
        <div className="explorer-filter-bar">
          <button
            type="button"
            className={`explorer-filter-btn ${
              activeCategory === "All" ? "is-active" : ""
            }`}
            onClick={() => setActiveCategory("All")}
          >
            All
          </button>
          <button
            type="button"
            className={`explorer-filter-btn ${
              activeCategory === "Experiments" ? "is-active" : ""
            }`}
            onClick={() => setActiveCategory("Experiments")}
          >
            Experiments
          </button>
          <button
            type="button"
            className={`explorer-filter-btn ${
              activeCategory === "Rabbit Hole" ? "is-active" : ""
            }`}
            onClick={() => setActiveCategory("Rabbit Hole")}
          >
            Rabbit Hole
          </button>
          <button
            type="button"
            className={`explorer-filter-btn ${
              activeCategory === "PRDs & BRDs" ? "is-active" : ""
            }`}
            onClick={() => setActiveCategory("PRDs & BRDs")}
          >
            PRDs & BRDs
          </button>
          <button
            type="button"
            className={`explorer-filter-btn ${
              activeCategory === "Desk Notes" ? "is-active" : ""
            }`}
            onClick={() => setActiveCategory("Desk Notes")}
          >
            Desk Notes
          </button>
        </div>

        {/* Card Grid - Styled like reference image */}
        <div className="explorer-card-grid">
          {filteredItems.map((item, idx) => {
            const hasImage = Boolean(item.image);
            const colorOptions = ["blue", "green", "coral", "yellow", "purple"];
            const colorClass = item.accentColor || colorOptions[idx % colorOptions.length];

            return (
              <div
                key={item.id}
                className={`explorer-color-card explorer-color-card--${colorClass}`}
                onClick={() => setSelectedItem(item)}
              >
                {hasImage ? (
                  /* Image Card with Hover Text Overlay */
                  <div className="explorer-image-card-wrapper">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="explorer-card-cover-image"
                    />
                    {/* Persistent Bottom Bar */}
                    <div className="explorer-card-bottom-bar">
                      <span className="explorer-card-bar-title">{item.title}</span>
                      <span className="explorer-card-bar-category">
                        {item.badgeLabel || item.category}
                      </span>
                    </div>

                    {/* Smooth Hover Overlay */}
                    <div className="explorer-card-hover-overlay">
                      <span className="explorer-overlay-badge">
                        {item.badgeLabel || item.category}
                      </span>
                      <h3 className="explorer-overlay-title">{item.title}</h3>
                      <p className="explorer-overlay-summary">{item.summary}</p>
                      <button type="button" className="explorer-overlay-cta">
                        View Details ↗
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Vibrant Solid Color Card (Reference Image Style) */
                  <div className="explorer-solid-card-content">
                    <div className="explorer-solid-card-header">
                      <h2 className="explorer-solid-title">{item.title}</h2>
                      <p className="explorer-solid-subtitle">{item.summary}</p>
                    </div>

                    <div className="explorer-solid-card-footer">
                      <span className="explorer-solid-badge">
                        {item.badgeLabel || item.category}
                      </span>
                      <span className="explorer-solid-arrow">↗</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <ExplorerModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
