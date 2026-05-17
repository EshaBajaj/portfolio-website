import { Link } from "react-router-dom";

export default function RoleCard({ title, description, to, variant, children }) {
  return (
    <div className="role-card-wrapper">
      <Link to={to} className={`role-card role-card--${variant}`}>
        {children && <div className="role-card__avatar">{children}</div>}
        <h2 className="role-card__title">{title}</h2>
      </Link>
      <p className={`role-card__description role-card__description--${variant}`}>{description}</p>
    </div>
  );
}
