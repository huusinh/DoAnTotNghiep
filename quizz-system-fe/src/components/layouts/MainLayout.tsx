import { memo, useEffect } from "react";
import { Sidebar } from "@main/components/Sidebar";
import { Headerbar } from "@main/components/Headerbar";
import { Outlet, useNavigate } from "react-router-dom";
import { Loading } from "@main/components/Loading";
import { MessagePrompt } from "@main/components/MessagePrompt";
import { useAppSelector } from "@main/features/hooks";
import { selectIsAuthenticated } from "@main/features/slices/authentication.slice";

const MainLayoutComponent = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/authentication/sign-in')
    }
  }, [isAuthenticated, navigate])
  
  return (
    <>
      <Loading />
      <MessagePrompt />
      <div id="wrapper">
        <Sidebar />
        <div style={{ width : '85vw' }} className="content-wrapper">
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
