import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../supabase";
import "./Writer.css";

export default function BlogPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    setLoading(true);
    setError(null);

    const id = /^\d+$/.test(postId) ? Number(postId) : postId;

    supabase
      .from("blogs")
      .select("id, title, content, image_url, created_at")
      .eq("id", id)
      .single()
      .then(({ data, error: dbError }) => {
        if (dbError) {
          setError(dbError.message);
          setPost(null);
        } else {
          setPost(data);
        }
        setLoading(false);
      });
  }, [postId]);

  const paragraphs = post?.content
    ? post.content.split("\n\n").map((p) => p.trim()).filter(Boolean)
    : [];

  return (
    <div className="writer-page">
      <header className="writer-nav">
        <Link to="/writer" className="writer-nav__logo">
          Writer
        </Link>
      </header>

      <section className="writer-section writer-blogs">
        <div className="section-header centered">
          <Link to="/writer" className="back-link">
            ← Back to writer
          </Link>

          {loading && <p className="section-copy centered-status">Loading post…</p>}

          {error && (
            <p className="section-copy centered-status writer-status--error">
              Error loading post: {error}
            </p>
          )}

          {!loading && !error && !post && (
            <p className="section-copy centered-status">Blog post not found.</p>
          )}

          {!loading && !error && post && (
            <>
              <span className="section-label">Blog post</span>
              <h1 className="section-title blog-detail-title">{post.title}</h1>
              <div className="signature">esha Bajaj</div>

              {post.image_url && (
                <div className="blog-detail-image">
                  <img src={post.image_url} alt={post.title} loading="lazy" />
                </div>
              )}

              <p className="section-copy">
                Published {new Date(post.created_at).toLocaleDateString()}
              </p>

              <div className="blog-detail-content">
                {paragraphs.length === 0 ? (
                  <p className="section-copy">No content available.</p>
                ) : (
                  paragraphs.map((text, i) => (
                    <p key={i} className="happy-monkey-regular">
                      {text}
                    </p>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
