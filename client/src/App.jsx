import { Navbar } from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  HomePage,
  SignUpPage,
  SettingsPage,
  ProfilePage,
  LoginPage,
} from "./pages";
import authStore from "./store/authStore";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  // how to use things in store across pages
  const { authUser, checkAuth, isCheckingAuth } = authStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <Navbar />

      <Routes>
        {/* redirects based on authentication */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      {/* enable toast notifications */}
      <Toaster />
    </>
  );
}

export default App;
