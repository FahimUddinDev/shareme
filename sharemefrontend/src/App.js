import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { fetchUser } from "./utils/fetchUser";

import { connect } from "react-redux";
function App(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();
    if (!user) {
      navigate("./login");
    } else {
      props.setUser(user);
    }
  }, []);
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch({ type: "checkUser", payload: user });
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
