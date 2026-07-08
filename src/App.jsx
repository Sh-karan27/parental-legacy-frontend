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
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        if (refreshToken) {
          await dispatch(refreshAccessToken(refreshToken)).unwrap();
        }

        if (accessToken || refreshToken) {
          await dispatch(fetchCurrentUser()).unwrap();
        }
      } catch {
        // The auth slice clears invalid tokens; the app can continue as logged out.
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
