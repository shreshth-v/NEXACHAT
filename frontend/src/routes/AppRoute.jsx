import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import ProfilePage from "../pages/ProfilePage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../features/auth/authSlice";
import ProtectedRoute from "./ProtectedRoute";
import UnProtectedRoute from "./UnProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoute = () => {
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="h-screen w-full flex flex-col bg-indigo-950">
        <div className="bg-base-300 h-full rounded-xl p-4 flex items-center justify-center">
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {/* This div will cover full screen */}
      <div className="h-screen w-full flex flex-col bg-indigo-950">
        {/* This is the navbar common to all pages */}
        <Navbar />

        {/* This div contain all the pages */}
        <div className="w-full flex-1 md:px-10 lg:px-20 sm:py-10 md:py-14 overflow-hidden">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <UnProtectedRoute>
                  <SignupPage />
                </UnProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <UnProtectedRoute>
                  <LoginPage />
                </UnProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRoute;
