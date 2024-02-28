import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import { PageContext } from "../context/PageContext";

const PrivateRoutes = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(PageContext);
  const { isLogin } = state;

  useEffect(() => {
    if (!isLogin) {
      navigate(`/login`);
    }
  }, [isLogin, navigate]);

  return isLogin ? <Outlet /> : null;
};

export default PrivateRoutes;
