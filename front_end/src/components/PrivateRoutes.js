import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import { PageContext } from "../context/PageContext";

const PrivateRoutes = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(PageContext);
  const { roleForLogin } = state;
  useEffect(() => {
    if (roleForLogin !== "admin") {
      navigate(`/login`);
    }
  }, [roleForLogin, navigate]);

  return roleForLogin ? <Outlet /> : null;
};

export default PrivateRoutes;
