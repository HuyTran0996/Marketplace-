import { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FetchSingleUser } from "../../data/FetchUsersData";
import { PageContext } from "../../context/PageContext";
import { apiService } from "../../app/apiService";

import "./new.scss";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/NavBar";

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

const UserDetails = ({ dataSingle, getSingleUser, title }) => {
  const { userId } = useParams();
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

      await apiService.patch("/users/updateMe", formData, {
        withCredentials: true,
      });

      dataSingle = await getSingleUser(userId);
      setName(dataSingle.data.user.name);
      setPhone(dataSingle.data.user.phone);
      setFile(dataSingle.data.user.photo);

      setIsSubmitting(false);
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

const NewPage = ({ title }) => {
  const { userId } = useParams();
  const { state, dispatch, getData, getSingleUser } = useContext(PageContext);
  const { dataAllUsers, dataAllOrders, dataAllStores, dataSingle } = state;

  if (!dataSingle) {
    getSingleUser(userId);
    return <Loading title={title} />;
  } else {
    return (
      <UserDetails
        dataSingle={dataSingle}
        getSingleUser={getSingleUser}
        title={title}
      />
    );
  }
};

export default NewPage;
