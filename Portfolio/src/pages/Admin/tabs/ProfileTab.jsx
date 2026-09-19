import { useState } from "react";
import { usePortfolioData } from "../../../context/PortfolioDataContext";

export default function ProfileTab() {
  const { profile, updateProfile, education, addEducation, deleteEducation, resetAllData } =
    usePortfolioData();

  const [profileForm, setProfileForm] = useState({
    name: profile.name || "",
    roleTitle: profile.roleTitle || "",
    email: profile.email || "",
    resumeUrl: profile.resumeUrl || "",
    bio: profile.bio || "",
  });

  const [savedMsg, setSavedMsg] = useState("");

  const [newEdu, setNewEdu] = useState({
    year: "",
    institution: "",
    degree: "",
    description: "",
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setSavedMsg("Profile settings updated successfully!");
    setTimeout(() => setSavedMsg(""), 3500);
  };

  const handleAddEdu = (e) => {
    e.preventDefault();
    if (!newEdu.institution || !newEdu.degree) return;
    addEducation(newEdu);
    setNewEdu({ year: "", institution: "", degree: "", description: "" });
  };

  return (
    <div className="admin-tab">
      <div className="admin-tab-header">
        <div>
          <h3>Profile & Education Settings</h3>
          <p>Update bio paragraph, Google Drive resume URL, contact email, and academic timeline.</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--danger"
          onClick={() => {
            if (confirm("Reset all portfolio data to factory defaults?")) {
              resetAllData();
              window.location.reload();
            }
          }}
        >
          Reset All Data to Defaults
        </button>
      </div>

      {savedMsg && <div className="admin-success-toast">{savedMsg}</div>}

      <div className="admin-card">
        <h4>Personal Profile & Resume Link</h4>
        <form onSubmit={handleProfileSubmit} className="admin-form">
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Role / Subtitle</label>
              <input
                type="text"
                value={profileForm.roleTitle}
                onChange={(e) => setProfileForm({ ...profileForm, roleTitle: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label>Contact Email</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Resume Drive URL</label>
              <input
                type="url"
                value={profileForm.resumeUrl}
                onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Hero Bio Paragraph</label>
            <textarea
              rows={4}
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="admin-btn admin-btn--primary">
            Save Profile Changes
          </button>
        </form>
      </div>

      <div className="admin-card" style={{ marginTop: "2rem" }}>
        <h4>Education Timeline</h4>

        <form onSubmit={handleAddEdu} className="admin-form" style={{ marginBottom: "1.5rem" }}>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Years</label>
              <input
                type="text"
                value={newEdu.year}
                onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
                placeholder="2025 - 2027"
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Institution</label>
              <input
                type="text"
                value={newEdu.institution}
                onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                placeholder="IIT Patna"
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Degree / Program</label>
              <input
                type="text"
                value={newEdu.degree}
                onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                placeholder="BS in AI/ML"
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Description</label>
              <input
                type="text"
                value={newEdu.description}
                onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
                placeholder="Focus area"
              />
            </div>
          </div>

          <button type="submit" className="admin-btn admin-btn--secondary">
            + Add Education Entry
          </button>
        </form>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Institution & Degree</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {education.map((edu) => (
                <tr key={edu.id}>
                  <td>{edu.year}</td>
                  <td>
                    <strong>{edu.institution}</strong>
                    <br />
                    <span className="admin-subtext">{edu.degree}</span>
                  </td>
                  <td>{edu.description}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-btn admin-btn--small admin-btn--danger"
                      onClick={() => deleteEducation(edu.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
