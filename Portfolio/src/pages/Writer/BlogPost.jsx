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
    async function loadPost() {
      setLoading(true);
      setError(null);
      const filterValue = /^\d+$/.test(postId) ? Number(postId) : postId;

      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, content, image_url, created_at")
        .eq("id", filterValue)
        .single();

      if (error) {
        console.error("Error loading blog post:", error);
        setError(error.message);
        setPost(null);
      } else {
        setPost(data);
      }

      setLoading(false);
    }

    if (postId) {
      loadPost();
    }
  }, [postId]);

  const renderContent = () => {
    if (!post?.content) return <p className="section-copy">No content available.</p>;
    return post.content.split(/\n\n+/).map((paragraph, index) => (
      <p key={index} className="happy-monkey-regular">{paragraph.trim()}</p>
    ));
  };

  return (
    <div className="writer-page">
      <section className="writer-section writer-blogs">
        <div className="section-header centered">
          <Link to="/writer" className="back-link">
            ← Back to writer
          </Link>
          {loading ? (
            <p className="section-copy">Loading post...</p>
          ) : error ? (
            <p className="section-copy">Error loading post: {error}</p>
          ) : post ? (
            <>
              <span className="section-label">Blog Post</span>
              <h1 className="section-title blog-detail-title">{post.title}</h1>
              <div className="signature">esha Bajaj</div>
              {post.image_url && (
                <div className="blog-detail-image">
                  <img src={post.image_url} alt={post.title} loading="lazy" />
                </div>
              )}
              <p className="section-copy">Published {new Date(post.created_at).toLocaleDateString()}</p>
              <div className="blog-detail-content">{renderContent()}</div>
            </>
          ) : (
            <p className="section-copy">Blog post not found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
