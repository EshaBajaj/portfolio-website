import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import RoleSelect from "./pages/RoleSelect";
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
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
