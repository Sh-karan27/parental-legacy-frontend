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
import { refreshAccessToken } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await dispatch(refreshAccessToken(refreshToken));
      }
      setBootstrapping(false);
    };
    bootstrap();
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
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
