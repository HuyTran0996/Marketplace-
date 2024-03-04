import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { PageContext } from "../../context/PageContext";
import { apiService } from "../../app/apiService";
import "./login.scss";

export default function SignupPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(PageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");

  const checkCookie = (token) => {
    const cookie = Cookies.get("forFe");
    if (!cookie) {
      // const value = Date.now();
      Cookies.set("forFe", token, { expires: 2 });
      return;
    }
    return;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let requestBody = {
      name,
      email,
      password,
      passwordConfirm,
      phone,
    };
    try {
      const result = await apiService.post(
        "/users/signup",
        {
          ...requestBody,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const token = result.data.token;
      checkCookie(token);
      setIsLoading(false);
      navigate("/");
      alert("Successful account registration, click ok to continue");
      return result;
    } catch (error) {
      setIsLoading(false);
      console.log(`Error fetchData: ${error.name}: ${error.message}`);
      let errorName = error.message;
      setMessage(errorName);
    }
  };

  const moveToLoginPage = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="login">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>SIGNUP PAGE</div>
          <div className="title">User Name</div>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={handleNameChange}
          />

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

          <div className="title">Password Confirm</div>
          <input
            type="password"
            placeholder="passwordConfirm"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />

          <div className="title">Phone Number</div>
          <input
            type="number"
            placeholder="number"
            value={phone}
            onChange={handlePhoneChange}
          />
          {message && <span>{message}</span>}
          <button type="submit">Submit</button>
          <button onClick={moveToLoginPage}>Login</button>
        </form>
      )}
    </div>
  );
}
