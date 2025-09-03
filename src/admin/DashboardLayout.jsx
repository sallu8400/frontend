import { AdminSidebar } from "./AdminSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export function DashboardLayout() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [checking, setChecking] = useState(true);

  useEffect(() => {

    console.log(user.role ,"user Role")
    if (user) {
      if (user.role !== "admin") {
        console.log("Hello, redirect")
        navigate("/admin/home"); // redirect to home if not admin
      }
      setChecking(false); // check completed
    }
  }, [user, navigate]);

  if (!user || checking) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-xl font-semibold animate-pulse text-gray-500">
          Checking admin access...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
