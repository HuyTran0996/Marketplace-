import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { FetchUpdateMe, FetchUpdateUser } from "../../data/FetchUsersData";
import { PageContext } from "../../context/PageContext";
import { usePage } from "../../components/usePage";
import { showToast } from "../../components/ToastMessage";

import "./new.scss";
import Sidebar from "../../components/sidebar/SideBar";
import SideBarUser from "../../components/sidebar/SideBarUser";
// import Navbar from "../../components/navbar/NavBar";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const Loading = ({ title }) => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="avatar"
            />
          </div>

          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>

              <div className="formInput" key="1">
                <label>User Name</label>
                <input type="number" placeholder="loading..." />
              </div>
              <div className="formInput" key="2">
                <label>Email</label>
                <input type="number" placeholder="loading..." />
              </div>
              <div className="formInput" key="3">
                <label>Phone</label>
                <input type="number" placeholder="loading..." />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const Error = () => {
  const { isUserApp } = usePage();
  return (
    <div className="new">
      {isUserApp ? <SideBarUser /> : <Sidebar />}
      <div className="newContainer">
        <div className="top">
          <h1>ERROR......</h1>
        </div>
      </div>
    </div>
  );
};

const UserDetails = ({ dataUser, getSingleUser, getMyInfo, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { isUserEditPage, isMyInfoEditPage, isUserApp } = usePage();
  const [name, setName] = useState(`${dataUser.data.user.name}`);
  const [phone, setPhone] = useState(`${dataUser.data.user.phone}`);
  const [fileSubmit, setFileSubmit] = useState(`${dataUser.data.user.photo}`);
  const [file, setFile] = useState(`${dataUser.data.user.photo}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFileSubmit(e.target.files[0]);
  };

  const moveToChangePasswordPage = (e) => {
    e.preventDefault();
    const currentUrl = location.pathname;
    const isMyInfo = currentUrl.includes("myInfo");
    if (isMyInfo) {
      navigate(`/changePassword`);
    } else navigate(`/adminPage/users/adminChangeUserPassword/${userId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      if (fileSubmit) {
        formData.append("image", fileSubmit);
      }

      if (isMyInfoEditPage || isUserApp) {
        await FetchUpdateMe(formData);
        await getMyInfo();
      }
      if (isUserEditPage && !isUserApp) {
        await FetchUpdateUser({ userId, formData });
        await getSingleUser(userId);
      }

      // Reset the file input value
      document.getElementById("file").value = "";

      setIsSubmitting(false);
      setError(false);
      showToast("Update successful", "success");
      return;
    } catch (error) {
      console.log(`Error fetchData: ${error.name}: ${error.message}`);
      let errorMessage = `${error.codeName}`;
      setIsSubmitting(false);
      setError(errorMessage);
    }
  };

  return (
    <div className="new">
      {isUserApp ? <SideBarUser /> : <Sidebar />}

      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? file
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="avatar"
            />
          </div>

          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput" key="1">
                <label>User Name</label>
                <input
                  type="text"
                  placeholder="user name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>

              <div className="formInput" key="2">
                <label>Email (email can not be changed)</label>
                <input type="email" value={dataUser.data.user.email} />
              </div>

              <div className="formInput" key="3">
                <label>Phone</label>
                <input
                  type="number"
                  placeholder="phone number"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>

              {error ? <div className="error">{error}</div> : ""}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Send"}
              </button>
              <button
                onClick={moveToChangePasswordPage}
                disabled={isSubmitting}
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewPageUser = ({ title }) => {
  const location = useLocation();
  const { isUserEditPage, isMyInfoEditPage } = usePage();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { state, getSingleUser, getMyInfo } = useContext(PageContext);
  const { dataSingle, dataUser } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (isMyInfoEditPage) {
          await getMyInfo();
          setIsLoading(false);
        } else if (isUserEditPage) {
          await getSingleUser(userId);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, [isMyInfoEditPage, isUserEditPage]);

  return isLoading ? (
    <Loading title={title} />
  ) : error ? (
    <Error />
  ) : (
    <UserDetails
      dataUser={dataUser}
      getSingleUser={getSingleUser}
      getMyInfo={getMyInfo}
      title={title}
    />
  );
};
export default NewPageUser;
