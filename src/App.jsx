import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import AuthCard from "./components/AuthCard";
import Dashboard from "./components/Dashboard";
import CommunityPage from "./components/CommunityPage";
import AboutPage from "./components/AboutPage";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "./services/auth.service";
import { getMyLegacy } from "./services/legacy.service";

function App() {
  const [page, setPage] = useState("landing");
  const [authMode, setAuthMode] = useState("register");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [legacy, setLegacy] = useState(null);
  const [animMother, setAnimMother] = useState(0);
  const [animFather, setAnimFather] = useState(0);
  const [checkingSession, setCheckingSession] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setCheckingSession(false);
        return;
      }
      try {
        await getCurrentUser();
        const legacyRes = await getMyLegacy();
        const data = legacyRes.data.data;
        setLegacy(data);
        setPage("dashboard");
        animateCounts(data.summary.motherTotal, data.summary.fatherTotal);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } finally {
        setCheckingSession(false);
      }
    };
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      setLegacy(null);
      setAnimMother(0);
      setAnimFather(0);
      setAuthMode("login");
      setAuthError("Your session expired. Please log in again.");
      setPage("auth");
    };
    window.addEventListener("auth:sessionExpired", handleSessionExpired);
    return () => window.removeEventListener("auth:sessionExpired", handleSessionExpired);
  }, []);

  const navigate = (target, mode) => {
    if (mode) setAuthMode(mode);
    setAuthError(null);
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
        setAnimMother(Math.round(targetM));
        setAnimFather(Math.round(targetF));
      }
    }, 30);
  };

  const handleAuthSubmit = async (payload) => {
    setLoading(true);
    setAuthError(null);

    try {
      if (payload.isRegister) {
        await registerUser({
          username: payload.username,
          email: payload.email,
          password: payload.password,
          dob: payload.dob,
          gender: payload.gender,
          familyType: payload.familyType,
          parentOneName: payload.parentOneName,
          parentTwoName: payload.parentTwoName,
        });
      }

      const loginRes = await loginUser({
        email: payload.email,
        password: payload.password,
      });
      const { accessToken, refreshToken } = loginRes.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const legacyRes = await getMyLegacy();
      const data = legacyRes.data.data;
      setLegacy(data);
      setPage("dashboard");
      animateCounts(data.summary.motherTotal, data.summary.fatherTotal);
    } catch (err) {
      setAuthError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // ignore — clearing local state regardless
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLegacy(null);
    setPage("landing");
    setAuthMode("register");
    setAnimMother(0);
    setAnimFather(0);
  };

  if (checkingSession) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar page={page} currentUser={legacy?.user} onNavigate={navigate} onLogout={handleLogout} />

      <div className="flex-1">
        {page === "landing" && <LandingPage onNavigate={navigate} />}

        {page === "auth" && (
          <AuthCard
            authMode={authMode}
            onSwitchMode={(mode) => { setAuthMode(mode); setAuthError(null); }}
            onSubmit={handleAuthSubmit}
            loading={loading}
            apiError={authError}
          />
        )}

        {page === "dashboard" && legacy && (
          <Dashboard legacy={legacy} animMother={animMother} animFather={animFather} />
        )}

        {page === "community" && <CommunityPage onNavigate={navigate} />}

        {page === "about" && <AboutPage />}
      </div>

      <Footer />
    </div>
  );
}

export default App;
