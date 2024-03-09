import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { PageContext } from "../../context/PageContext";
import { apiService } from "../../app/apiService";
import "./login.scss";

export default function LoginPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(PageContext);

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const checkCookie = (token, jwt) => {
    const cookie = Cookies.get("forFe");
    if (!cookie) {
      // const value = Date.now();
      Cookies.set("forFe", token, { expires: 2 });
      Cookies.set("jwtFe", jwt, { expires: 2 });
      return;
    }
    return;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await apiService.post(
        "/users/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const token = result.data.user.role;
      const jwt = `Bearer ${result.data.token}`;
      checkCookie(token);
      setIsLoading(false, jwt);
      dispatch({
        type: "SET_USER_LOGIN",
        payload: token,
      });

      navigate(token === "admin" ? "/" : "/userPage");

      return;
    } catch (error) {
      setIsLoading(false);
      console.log(`Error fetchData: ${error.name}: ${error.message}`);
      let errorName = error.message;
      setMessage(errorName);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await apiService.post("/users/forgotPassword", {
        email: email,
      });
      setIsLoading(false);
      let newPassword = result.data.newPassword;
      setMessage(
        `Your new password is: "${newPassword}", for your security please login to the app and change the password`
      );

      return newPassword;
    } catch (error) {
      setIsLoading(false);
      console.log(`Error fetchData: ${error.name}: ${error.message}`);
      let errorName = error.response.data.message;
      setMessage(errorName);
    }
  };

  const moveToSignUpPage = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="login">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleLogin}>
          <div>LOGIN PAGE</div>
          <div className="title">Email</div>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="title">Password</div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {message && <span>{message}</span>}
          <button type="submit">Login</button>
          <button onClick={handleForgotPassword}>Forgot Password</button>
          <button onClick={moveToSignUpPage}>Sign Up</button>
        </form>
      )}
    </div>
  );
}
