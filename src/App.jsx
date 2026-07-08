import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingPage from "./components/LandingPage";
import AuthCard from "./components/AuthCard";
import CommunityPage from "./components/CommunityPage";
import AboutPage from "./components/AboutPage";
import Dashboard from "./components/Dashboard";
import { clearAuthState, fetchCurrentUser, refreshAccessToken } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    const handleSessionExpired = () => {
      dispatch(clearAuthState());
    };

    window.addEventListener("auth:session-expired", handleSessionExpired);

    const bootstrap = async () => {
      try {
        // Try the access token first — it may come from localStorage (Bearer
        // header) or from an httpOnly cookie set by a previous login, which
        // localStorage can't see but the browser sends automatically.
        await dispatch(fetchCurrentUser()).unwrap();
      } catch {
        try {
          // Access token missing/expired — fall back to the refresh token,
          // which is also readable from the httpOnly cookie server-side even
          // when localStorage has nothing.
          const refreshToken = localStorage.getItem("refreshToken");
          await dispatch(refreshAccessToken(refreshToken)).unwrap();
          await dispatch(fetchCurrentUser()).unwrap();
        } catch {
          // No valid session anywhere — the auth slice already cleared any
          // stale tokens, so the app continues as logged out.
        }
      }

      setBootstrapping(false);
    };
    bootstrap();

    return () => {
      window.removeEventListener("auth:session-expired", handleSessionExpired);
    };
  }, [dispatch]);

  if (bootstrapping) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthCard />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/me" element={<Dashboard />} />
          <Route path="/dashboard" element={<CommunityPage />} />
          <Route path="/community" element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
