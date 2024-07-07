import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Loading } from "@main/components/Loading";
import { MessagePrompt } from "@main/components/MessagePrompt";

const AuthenticationLayoutComponent = () => {
  return (
    <>
      <Loading />
      <MessagePrompt />
      <div className="bg-gradient-primary" style={{
        height: '100vh'
      }}>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export const AuthenticationLayout = memo(AuthenticationLayoutComponent);
