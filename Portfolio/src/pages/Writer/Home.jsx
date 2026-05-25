import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";
import BirdCard from "./components/BirdCard";
import birdImg from "./assets/flying-bird.png";
import "./Writer.css";

const CARD_COLORS = ["lavender", "lime", "sky"];

const PROMISE_CARDS = [
  { color: "lavender", title: "MY STYLE?", text: "Bold and colorful, but still strategic." },
  { color: "lime", title: "MY PROCESS?", text: "Fast, fun, and stress-free." },
  { color: "sky", title: "MY MISSION?", text: "To make sure you have stories you love sharing." },
];

const JOURNEY = [
  { year: "2023", script: "started writing", text: "Began sharing notes, drafts, and ideas in public.", side: "right" },
  { year: "2024", script: "found my lane", text: "Moved from scattered posts to intentional essays.", side: "left" },
  { year: "2025", script: "building this space", text: "This writer page is home base for essays and notes.", side: "right" },
];

function shortText(text, max = 110) {
  if (!text) return "";
  const oneLine = text.replace(/\s+/g, " ").trim();
  return oneLine.length > max ? oneLine.slice(0, max) + "…" : oneLine;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    supabase
      .from("blogs")
      .select("id, title, content, image_url, created_at")
      .order("created_at", { ascending: false })
      .then(({ data, error: dbError }) => {
        if (dbError) {
          setError(dbError.message);
          setPosts([]);
        } else {
          setPosts(data || []);
          setError(null);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="writer-page">
      <header className="writer-nav">
        <Link to="/" className="writer-nav__logo">
          Portfolio
        </Link>
        <nav className="writer-nav__links">
          <a href="#about">About</a>
          <a href="#promise">Promise</a>
          <a href="#blogs">Blogs</a>
          <a href="#journey">Journey</a>
        </nav>
      </header>

      <section className="writer-section writer-hero" id="about">
        <div className="writer-hero__visual">
          <div className="writer-hero__scallop" aria-hidden="true" />
          <div className="writer-hero__photo-frame">
            <img src={birdImg} alt="" className="writer-hero__photo-placeholder" />
          </div>
          <p className="writer-hero__script">SECRET! I don&apos;t ask ChatGPT to write</p>
        </div>
        <div className="writer-hero__copy">
          <span className="writer-hero__arrow" aria-hidden="true">
            ↘
          </span>
          <h1 className="writer-hero__title">
            I traded <strong>QUICK</strong> content for{" "}
            <span className="writer-hero__title-serif">TIMELESS STORIES</span>
          </h1>
          <p className="writer-hero__text">
            This is my writer lane—essays, notes, and posts in my own voice. Same playful
            cards, same bird, same energy as the brand boards that inspired this page.
          </p>
          <p className="writer-hero__closing">THAT&apos;S WHEN I FELL IN LOVE WITH WRITING.</p>
        </div>
      </section>

      <section className="writer-section writer-promise" id="promise">
        <div className="writer-promise__header">
          <h2 className="writer-promise__title">
            A PROMISE <em>from</em> MY BRAND <em>to</em> YOURS
          </h2>
          <div className="writer-promise__intro">
            <p>
              Clean layouts, hand-drawn energy, and cards that feel like stationery—not
              another generic blog grid.
            </p>
            <a className="writer-promise__cta" href="#blogs">
              READ BLOGS
            </a>
          </div>
        </div>
        <div className="writer-promise__grid">
          {PROMISE_CARDS.map((card) => (
            <BirdCard
              key={card.title}
              title={card.title}
              text={card.text}
              color={card.color}
            />
          ))}
        </div>
      </section>

      <section className="writer-section writer-blogs" id="blogs">
        <div className="section-header centered">
          <span className="section-label">From the blog</span>
          <h2 className="section-title">Latest posts</h2>
        </div>

        {loading && <p className="section-copy centered-status">Loading posts…</p>}
        {error && (
          <p className="section-copy centered-status writer-status--error">
            Error loading posts: {error}
          </p>
        )}
        {!loading && !error && posts.length === 0 && (
          <p className="section-copy centered-status">No blog posts yet.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="writer-promise__grid writer-blogs__grid">
            {posts.map((post, i) => (
              <BirdCard
                key={post.id}
                href={`/writer/${post.id}`}
                title={post.title}
                text={shortText(post.content)}
                color={CARD_COLORS[i % CARD_COLORS.length]}
                date={formatDate(post.created_at)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="writer-section writer-journey" id="journey">
        <h2 className="writer-journey__title">
          My JOURNEY <span className="writer-journey__script">(so far)</span>
        </h2>
        <div className="writer-journey__timeline">
          {JOURNEY.map((item) => (
            <article
              key={item.year}
              className={`writer-journey__entry writer-journey__entry--${item.side}`}
            >
              <div className="writer-journey__content">
                <p className="writer-journey__year">{item.year}</p>
                <p className="writer-journey__script-line">{item.script}</p>
                <p className="writer-journey__text">{item.text}</p>
              </div>
              <div className="writer-journey__media">
                <img src={birdImg} alt="" className="writer-journey__thumb" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="writer-footer">
        <Link to="/" className="writer-footer__back">
          ← Back to profiles
        </Link>
      </footer>
    </div>
  );
}
