import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import RoleSelect from "./pages/RoleSelect/RoleSelect";
import RecruiterHome from "./pages/Recruiter/Home";
import ExplorerHome from "./pages/Explorer/Home";
import WriterHome from "./pages/Writer/Home";
import BlogPost from "./pages/Writer/BlogPost";

import TargetCursor from "./components/Cursor/TargetCursor";

function AppContent() {
  const location = useLocation();
  const path = location.pathname;
  const useDefaultCursor =
    path === "/recruiter" || path === "/explorer" || path === "/writer" ||
    path.startsWith("/writer/");

  return (
    <>
      {!useDefaultCursor && (
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
        />
      )}

      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/recruiter" element={<RecruiterHome />} />
        <Route path="/explorer" element={<ExplorerHome />} />
        <Route path="/writer" element={<WriterHome />} />
        <Route path="/writer/:postId" element={<BlogPost />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function routerBasename() {
  const base = import.meta.env.BASE_URL;
  if (!base || base === "/") return undefined;
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

function App() {
  return (
    <BrowserRouter basename={routerBasename()}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
