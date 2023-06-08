import { CircularProgress, Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
export default function CustomRoute({ children, roles }) {
  console.log(children);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  if (auth.isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }
  if (auth.isAuthenticated && roles.includes(auth.user?.role)) {
    return { ...children };
  }
  return <Navigate to="/" replace={true} />;
}
