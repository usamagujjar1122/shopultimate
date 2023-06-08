import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../layouts/loading";
// import Spinner from '../layout/Spinner';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, isLoading, user },
}) => {
  // console.log(isAuthenticated)

  if (isLoading) return <Loading isloading={true} />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/login" replace={true} />;
};

// PrivateRoute.propTypes = {
//   auth: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
