import { useEffect } from "react";

export default function ExplorerModal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="explorer-modal-backdrop" onClick={onClose}>
      <div
        className="explorer-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="explorer-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="explorer-modal-header">
          <span className={`explorer-badge explorer-badge--${item.accentColor || "butter"}`}>
            {item.badgeLabel || item.category}
          </span>
          <h2 className="explorer-modal-title">{item.title}</h2>
        </div>

        {/* Media / Image if available */}
        {item.image && (
          <div className="explorer-modal-image-wrapper">
            <img src={item.image} alt={item.title} className="explorer-modal-image" />
          </div>
        )}

        {/* Summary */}
        <div className="explorer-modal-body">
          <p className="explorer-modal-summary">{item.summary}</p>

          {/* Deep Dives / Insights */}
          {item.whyBuilt && (
            <div className="explorer-modal-block">
              <h4>💡 Why I Built / Dived Into This</h4>
              <p>{item.whyBuilt}</p>
            </div>
          )}

          {item.whatLearned && (
            <div className="explorer-modal-block">
              <h4>🎯 What I Learned & Key Takeaways</h4>
              <p>{item.whatLearned}</p>
            </div>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="explorer-modal-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="explorer-tag-pill">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="explorer-modal-actions">
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="explorer-action-btn explorer-action-btn--primary"
            >
              {item.linkText || "Open Full Document / Demo ↗"}
            </a>
          ) : (
            <span className="explorer-modal-note">
              ✨ Internal thought / note sitting on my desk.
            </span>
          )}
          <button
            type="button"
            className="explorer-action-btn explorer-action-btn--secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
