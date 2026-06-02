import { Link } from "react-router-dom";
import SmileyAvatar from "./components/SmileyAvatar";
import "./RoleSelect.css";

const PROFILES = [
  { name: "recruiter", title: "Recruiter", to: "/recruiter", start: "#42a5f5", end: "#1e88e5" },
  { name: "explorer", title: "Explorer", to: "/explorer", start: "#ef5350", end: "#c62828" },
  { name: "writer", title: "Writer", to: "/writer", start: "#ffca28", end: "#f9a825" },
];

export default function RoleSelect() {
  return (
    <div className="role-select">
      <div className="role-select__brand">
        <span className="role-select__netflix" aria-hidden="true">
          NETFLIX
        </span>
        <span className="role-select__signature">Esha Bajaj</span>
      </div>

      <div className="role-select__heading">
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

        <div className="add-profile cursor-target">
          <div className="add-profile__square">
            <span className="add-profile__icon">+</span>
          </div>
          <p className="add-profile__label">Add Profile</p>
        </div>
      </div>
    </div>
  );
}
