import { useContext, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { FetchUpdateMe, FetchUpdateUser } from "../../data/FetchUsersData";
import { PageContext } from "../../context/PageContext";
import { usePage } from "../../components/usePage";

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

const UserDetails = ({ dataSingle, getSingleUser, getMyInfo, title }) => {
  const { userId } = useParams();
  const { isUserEditPage, isMyInfoEditPage, isUserApp } = usePage();
  const [name, setName] = useState(`${dataSingle.data.user.name}`);
  const [phone, setPhone] = useState(`${dataSingle.data.user.phone}`);
  const [fileSubmit, setFileSubmit] = useState(`${dataSingle.data.user.photo}`);
  const [file, setFile] = useState(`${dataSingle.data.user.photo}`);
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
                <input type="email" value={dataSingle.data.user.email} />
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
  const { state, getSingleUser, getMyInfo } = useContext(PageContext);
  const { dataSingle } = state;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
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
      }
    };
    fetchData();
  }, [isUserEditPage]);

  return isLoading ? (
    <Loading title={title} />
  ) : (
    <UserDetails
      dataSingle={dataSingle}
      getSingleUser={getSingleUser}
      getMyInfo={getMyInfo}
      title={title}
    />
  );
};
export default NewPageUser;
