import React, { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";

const NotFoundPage = lazy(() => import("../pages/NotFound"));
const LoginPage = lazy(() => import("../pages/Login"));
const UserListPage = lazy(() => import("../pages/UserList"));

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-list" element={<UserListPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default Routing;
