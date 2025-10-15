import { useState } from "react";
import { Login } from "./components/ui/Login";
import { WebAdmin } from "./components/ui/WebAdmin";
import { EmpleadoDashboard } from "./components/ui/EmpleadoDashboard";
import { ClienteDashboard } from "./components/ui/ClienteDashboard";
import { Toaster } from "./components/ui/sonner";

type UserType = "admin" | "empleado" | "cliente" | null;

export default function App() {
  const [userType, setUserType] = useState<UserType>(null);
  const [userData, setUserData] = useState<any>(null);

  const handleLogin = (type: "admin" | "empleado" | "cliente", data: any) => {
    setUserType(type);
    setUserData(data);
  };

  const handleLogout = () => {
    setUserType(null);
    setUserData(null);
  };

  // Show login if no user is logged in
  if (!userType || !userData) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // Show appropriate dashboard based on user type
  if (userType === "admin") {
    return (
      <>
        <WebAdmin onLogout={handleLogout} />
        <Toaster />
      </>
    );
  }

  if (userType === "empleado") {
    return (
      <>
        <EmpleadoDashboard userData={userData} onLogout={handleLogout} />
        <Toaster />
      </>
    );
  }

  if (userType === "cliente") {
    return (
      <>
        <ClienteDashboard userData={userData} onLogout={handleLogout} />
        <Toaster />
      </>
    );
  }

  return null;
}
