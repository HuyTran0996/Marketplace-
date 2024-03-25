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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      if (!email || !password) {
        throw new Error("All fields are required.");
      }
      setIsLoading(true);
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
      const role = result.data.user.role;
      const jwt = result.data.token;
      // Cookies.remove("jwtFe");
      Cookies.remove("jwt");
      // Cookies.set("jwtFe", jwt, { expires: 2 });
      console.log("ádasdasd", role);
      setIsLoading(false);

      navigate(role === "admin" ? "/adminPage" : "/userPage");

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
    try {
      setIsLoading(true);
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
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />

        {message && <div className="message">{message}</div>}
        <div onClick={handleForgotPassword}>Forget Password?</div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <p onClick={moveToSignUpPage}>Not a Member? Sign Up</p>
    </div>
  );
}
