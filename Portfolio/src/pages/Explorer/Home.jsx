import { Link } from "react-router-dom";
import findImage from "../../assets/images/find.jpeg";
import "./Home.css";

export default function Home() {
  return (
    <main className="explorer-page">
      <Link to="/" className="explorer-back">
        ← Back to profiles
      </Link>

      <div className="explorer-layout">
        <img
          src={findImage}
          alt="Exploring"
          className="explorer-image"
        />

        <p className="explorer-quote">
          <span className="explorer-font-script">Well, I am also </span>
          <span className="explorer-font-goldman">Exploring</span>
          <span className="explorer-font-script"> this Side it seems to be a </span>
          <span className="explorer-font-goldman">Different creature</span>
          <span className="explorer-font-script">.</span>
        </p>
      </div>
    </main>
  );
}
