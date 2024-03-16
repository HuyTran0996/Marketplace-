import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Cookies from "js-cookie";

import { PageContext } from "../../context/PageContext";
import { apiService } from "../../app/apiService";
import "./login.scss";
import { showToast } from "../../components/ToastMessage";

export default function ChangePasswordPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(PageContext);
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !passwordConfirm) {
      showToast("All fields are required.", "warn");
      return;
    }
    console.log("userid", userId);
    setIsLoading(true);
    let requestBody = {
      password,
      passwordConfirm,
    };
    try {
      const result = await apiService.patch(
        `/users/adminChangeUserPassword/${userId}`,
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

      showToast("Changed password successfully", "success");
      console.log("kết quả là", result);
      return;
    } catch (error) {
      // alert("Changed password fail, Error system");
      setIsLoading(false);
      console.log(`Error fetchData: ${error.name}: ${error.message}`);
      let errorName = error.message;

      showToast(errorName, "error");
    }
  };

  return (
    <>
      <div className="login-form">
        <h1>ADMIN CHANGE PASSWORD</h1>
        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type="password"
            placeholder="your new password..."
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

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
