import { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import AuthCard from "./components/AuthCard";
import Dashboard from "./components/Dashboard";
import CommunityPage from "./components/CommunityPage";
import AboutPage from "./components/AboutPage";
import { computeLegacy } from "./utils/computeLegacy";

function App() {
  const [page, setPage] = useState("landing");
  const [authMode, setAuthMode] = useState("register");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [animMother, setAnimMother] = useState(0);
  const [animFather, setAnimFather] = useState(0);
  const timerRef = useRef(null);

  const navigate = (target, mode) => {
    if (mode) setAuthMode(mode);
    setPage(target);
  };

  const animateCounts = (targetM, targetF) => {
    const start = Date.now();
    const dur = 900;

    if (timerRef.current) window.clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimMother(Math.round(targetM * eased));
      setAnimFather(Math.round(targetF * eased));
      if (p >= 1) {
        window.clearInterval(timerRef.current);
        setAnimMother(targetM);
        setAnimFather(targetF);
      }
    }, 30);
  };

  const handleAuthSubmit = ({ isRegister, name, email, dob }) => {
    setLoading(true);
    const finalDob = isRegister ? dob : "1994-05-12";
    const finalName = isRegister ? name : email.split("@")[0] || "Member";

    window.setTimeout(() => {
      const result = computeLegacy(finalDob);
      setCurrentUser({ name: finalName || "Member", dob: finalDob, email, ...result });
      setLoading(false);
      setPage("dashboard");
      animateCounts(result.overallMother, result.overallFather);
    }, 700);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage("landing");
    setAuthMode("register");
    setAnimMother(0);
    setAnimFather(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar page={page} currentUser={currentUser} onNavigate={navigate} onLogout={handleLogout} />

      {page === "landing" && <LandingPage onNavigate={navigate} />}

      {page === "auth" && (
        <AuthCard
          authMode={authMode}
          onSwitchMode={(mode) => setAuthMode(mode)}
          onSubmit={handleAuthSubmit}
          loading={loading}
        />
      )}

      {page === "dashboard" && currentUser && (
        <Dashboard currentUser={currentUser} animMother={animMother} animFather={animFather} />
      )}

      {page === "community" && <CommunityPage onNavigate={navigate} />}

      {page === "about" && <AboutPage />}

      <Footer />
    </div>
  );
}

export default App;
