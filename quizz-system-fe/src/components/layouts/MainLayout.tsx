import { memo } from "react";
import { Sidebar } from "@main/components/Sidebar";
import { Headerbar } from "@main/components/Headerbar";
import { Outlet } from "react-router-dom";
import { Loading } from "@main/components/Loading";
import { MessagePrompt } from "@main/components/MessagePrompt";

const MainLayoutComponent = () => {
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
