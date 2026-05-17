import RoleCard from "../components/RoleCard";
import SmileyAvatar from "../components/SmileyAvatar";
import "./RoleSelect.css";
import { useEffect, useRef, useState } from "react";
import homeAudio from "../assets/music/Home.mp3";

export default function RoleSelect() {

  return (
    <div className="role-select">

      <div className="netflix-credit">
        <img src="https://www.freepnglogos.com/uploads/netflix-png-11.png" alt="Netflix" height={150} width={240}/>
      </div>

      <h1>Who's watching?</h1>

      <div className="roles">
        <div className="cursor-target">
          <RoleCard
            title="Recruiter"
            description="Projects. Skills. Clarity."
            to="/recruiter"
            variant="recruiter"
          >
            <SmileyAvatar gradientStart="#053f1a" gradientEnd="#8feaaf" />
          </RoleCard>
        </div>

        <div className="cursor-target">
          <RoleCard
            title="Explorer"
            description="Curiosity. Experiments. Ideas."
            to="/explorer"
            variant="explorer"
          >
            <SmileyAvatar gradientStart="#1d4ed8" gradientEnd="#60a5fa" />
          </RoleCard>
        </div>

        <div className="cursor-target">
          <RoleCard
            title="Writer"
            description="Thoughts. Words. Stories."
            to="/writer"
            variant="writer"
          >
            <SmileyAvatar gradientStart="#d7ca14" gradientEnd="#f3f8a2" />
          </RoleCard>
        </div>

        <div className="add-profile">
          <div className="add-profile__circle">
            <span className="add-profile__icon">+</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
