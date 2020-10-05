import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

function PrivateScope({ accessToken, children }) {
  if (accessToken === null) return <Redirect to="/authenticate" />;
  return children;
}

const mapStateToProps = (state) => ({ accessToken: state.app.accessToken });
export default connect(mapStateToProps)(PrivateScope);
