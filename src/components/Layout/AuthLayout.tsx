import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export const AuthLayout = () => {
  return (
    <>
      <div className="min-w-full flex flex-col items-center justify-center h-screen ">
        <div className="min-w-full max-w-md ">
          <Outlet />
          <Toaster position="top-right" />
        </div>
      </div>
    </>
  );
};