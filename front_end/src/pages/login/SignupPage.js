import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

    let requestBody = {
      name,
      email,
      password,
      passwordConfirm,
      phone,
    };
    try {
      setMessage("");
      if (!name || !email || !password || !passwordConfirm || !phone) {
        toast.error("All fields are required.");
        return;
      }
      setIsLoading(true);
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

      const role = result.data.user.role;
      const jwt = result.data.token;
      Cookies.remove("jwtFe");
      Cookies.set("jwtFe", jwt, { expires: 2 });
      setIsLoading(false);

      toast.success("Successful account registration");

      setTimeout(() => {
        navigate(role === "admin" ? "/adminPage" : "/userPage");
      }, 3000); // Delay of 2 second

      return result;
    } catch (error) {
      setIsLoading(false);
      console.log(`Error fetchData: ${error.name}: ${error.message}`);
      let errorName = error.message;
      setMessage(errorName);
      toast.error(message);
    }
  };

  const moveToLoginPage = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <ToastContainer />
      <div className="login-form">
        <h1>SIGN UP</h1>
        <form onSubmit={handleSubmit}>
          <label>User Name</label>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={handleNameChange}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <label>Password Confirm</label>
          <input
            type="password"
            placeholder="passwordConfirm"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />

          <label>Phone Number</label>
          <input
            type="number"
            placeholder="Phone number"
            value={phone}
            onChange={handlePhoneChange}
            className="no-spinners"
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
        <p onClick={moveToLoginPage}>Back To Login Page</p>
      </div>
    </>
  );
}
