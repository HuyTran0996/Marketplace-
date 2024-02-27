import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies("jwt"); // Access cookies

  let auth = cookies.jwt; // Use the token from cookies
  console.log("AUTH", auth);

  useEffect(() => {
    if (!auth) {
      navigate(`/login`);
    }
  }, [auth, navigate]);

  return auth ? <Outlet /> : null;
};

export default PrivateRoutes;
