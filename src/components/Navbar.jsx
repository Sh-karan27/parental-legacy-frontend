import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useIsDesktop from "../hooks/useIsDesktop";
import PublicDesktopNav from "./nav/PublicDesktopNav";
import PublicMobileNav from "./nav/PublicMobileNav";
import { logoutUser } from "../store/slices/userSlice";
import { clearLegacy } from "../store/slices/legacySlice";

export default function Navbar() {
  const isDesktop = useIsDesktop();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearLegacy());
    navigate("/");
  };

  return isDesktop ? (
    <PublicDesktopNav onLogout={handleLogout} />
  ) : (
    <PublicMobileNav onLogout={handleLogout} />
  );
}
