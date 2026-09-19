import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmileyAvatar from "./components/SmileyAvatar";
import "./RoleSelect.css";

const PROFILES = [
  { name: "recruiter", title: "Recruiter", to: "/recruiter", start: "#42a5f5", end: "#1e88e5" },
  { name: "explorer", title: "Explorer", to: "/explorer", start: "#ef5350", end: "#c62828" },
  { name: "writer", title: "Writer", to: "/writer", start: "#ffca28", end: "#f9a825" },
];

export default function RoleSelect() {
  const [hoveringPlus, setHoveringPlus] = useState(false);
  const navigate = useNavigate();

  const handleTitleDoubleClick = () => {
    navigate("/admin");
  };

  return (
    <div className="role-select">
      <div className="role-select__brand">
        <span className="role-select__netflix" aria-hidden="true">
          NETFLIX
        </span>
        <span
          className="role-select__signature"
          title="Admin portal shortcut"
          onDoubleClick={handleTitleDoubleClick}
          style={{ cursor: "pointer" }}
        >
          Esha Bajaj
        </span>
      </div>

      <div className="role-select__heading" onDoubleClick={handleTitleDoubleClick}>
        <h1>Who&apos;s watching?</h1>
        <p className="role-select__tagline">(because I have personalities)</p>
      </div>

      <div className="roles">
        {PROFILES.map((profile) => (
          <div key={profile.to} className="cursor-target">
            <div className="role-card-wrapper">
              <Link to={profile.to} className="role-card">
                <div className="role-card__avatar">
                  <SmileyAvatar
                    name={profile.name}
                    gradientStart={profile.start}
                    gradientEnd={profile.end}
                  />
                </div>
              </Link>
              <p className="role-card__title">{profile.title}</p>
            </div>
          </div>
        ))}

        {/* Netflix-style Add Profile '+' Card */}
        <div
          className="add-profile cursor-target"
          onMouseEnter={() => setHoveringPlus(true)}
          onMouseLeave={() => setHoveringPlus(false)}
        >
          <div className="add-profile__square">
            <span className="add-profile__icon">+</span>
          </div>
          <p className="add-profile__label">Add Profile</p>

          {/* Small, Stable, Subtle Note */}
          {hoveringPlus && (
            <div className="stable-note-tooltip">
              <p className="stable-note-title">Can&apos;t create another me.</p>
              <p className="stable-note-text">
                But you can drop me a message. <br />
                Got something in mind?{" "}
                <a
                  href="mailto:eshabajaj1626@gmail.com"
                  className="stable-note-link"
                >
                  Let&apos;s talk.
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
