import { Link } from "react-router-dom";
import birdImg from "../assets/flying-bird.png";

/** One card style: bird on top, title, optional text. Pass href to make it a blog link. */
export default function BirdCard({ title, text, color = "lavender", href, date }) {
  const classes = `writer-promise-card writer-promise-card--${color}`;

  const content = (
    <>
      <img
        src={birdImg}
        alt=""
        className={`writer-card-bird writer-card-bird--${color}`}
        aria-hidden="true"
      />
      {date && <p className="writer-promise-card__eyebrow">{date}</p>}
      <h3 className="writer-promise-card__label">{title}</h3>
      {text && <p className="writer-promise-card__body">{text}</p>}
      <span className="writer-promise-card__arrow" aria-hidden="true">
        ↑
      </span>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <article className={`${classes} writer-promise-card--static`}>
      {content}
    </article>
  );
}
