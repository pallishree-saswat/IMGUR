import React from "react";
import { Redirect } from "react-router-dom";
const withProtected = (ProtectedComponent) => {
  return (...args) => {
    console.log(args);
    return !localStorage.getItem("user") ? (
      <Redirect to="/login" />
    ) : (
      <ProtectedComponent args />
    );
  };
};

export default withProtected;
