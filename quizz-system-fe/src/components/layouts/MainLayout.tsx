import { memo, useEffect, useMemo } from "react";
import { Sidebar } from "@main/components/Sidebar";
import { Headerbar } from "@main/components/Headerbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "@main/components/Loading";
import { MessagePrompt } from "@main/components/MessagePrompt";
import { useAppSelector } from "@main/features/hooks";
import { selectIsAuthenticated } from "@main/features/slices/authentication.slice";

const MainLayoutComponent = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/authentication/sign-in");
    }
  }, [isAuthenticated, navigate]);

  const displaySidebar = useMemo(() => {
    return !pathname.match(/exam\/\d+/i)
  }, [pathname])

  return (
    <>
      <Loading />
      <MessagePrompt />
      <div id="wrapper">
        {displaySidebar && <Sidebar />}
        <div style={{ width: displaySidebar ? "85vw" : '100vw' }} className="content-wrapper">
          <div className="content">
            <Headerbar />
            <div className="container-fluid">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const MainLayout = memo(MainLayoutComponent);
