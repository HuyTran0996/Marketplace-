import { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

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

const UserDetails = ({ dataSingle, getSingleUser, getMyInfo, title }) => {
  const { userId } = useParams();
  const [name, setName] = useState(`${dataSingle.data.user.name}`);
  const [phone, setPhone] = useState(`${dataSingle.data.user.phone}`);
  const [fileSubmit, setFileSubmit] = useState(`${dataSingle.data.user.photo}`);
  const [file, setFile] = useState(`${dataSingle.data.user.photo}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

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

      if (currentUrl.includes("myInfo")) {
        await apiService.patch("/users/updateMe", formData, {
          withCredentials: true,
        });
        await getMyInfo();
      } else {
        await apiService.patch(`/users/updateUser/${userId}`, formData, {
          withCredentials: true,
        });
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

const StoreDetails = ({ dataSingle, getSingleStore, title }) => {
  const { storeId } = useParams();
  const [name, setName] = useState(`${dataSingle.data.store.storeName}`);
  const [address, setAddress] = useState(`${dataSingle.data.store.address}`);
  const [fileSubmit, setFileSubmit] = useState(
    `${dataSingle.data.store.photo}`
  );
  const [file, setFile] = useState(`${dataSingle.data.store.photo}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setAddress(e.target.value);
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
      formData.append("address", address);
      if (fileSubmit) {
        formData.append("image", fileSubmit);
      }

      await apiService.patch(`/stores/${storeId}`, formData, {
        withCredentials: true,
      });

      await getSingleStore(storeId);

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
                <label>Store Name</label>
                <input
                  type="text"
                  placeholder="user name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>

              <div className="formInput" key="2">
                <label>Owner Email (email can not be changed)</label>
                <input type="email" value={dataSingle.data.store.ownerEmail} />
              </div>

              <div className="formInput" key="3">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Store Address"
                  value={address}
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

const OrderDetails = ({ dataSingle, getSingleStore, title }) => {
  const { storeId } = useParams();
  const [name, setName] = useState(`${dataSingle.data.store.storeName}`);
  const [address, setAddress] = useState(`${dataSingle.data.store.address}`);
  const [fileSubmit, setFileSubmit] = useState(
    `${dataSingle.data.store.photo}`
  );
  const [file, setFile] = useState(`${dataSingle.data.store.photo}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setAddress(e.target.value);
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
      formData.append("address", address);
      if (fileSubmit) {
        formData.append("image", fileSubmit);
      }

      await apiService.patch(`/stores/${storeId}`, formData, {
        withCredentials: true,
      });

      await getSingleStore(storeId);

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
                <label>Store Name</label>
                <input
                  type="text"
                  placeholder="user name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>

              <div className="formInput" key="2">
                <label>Owner Email (email can not be changed)</label>
                <input type="email" value={dataSingle.data.store.ownerEmail} />
              </div>

              <div className="formInput" key="3">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Store Address"
                  value={address}
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
  const { userId, storeId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { state, getSingleUser, getMyInfo, getSingleStore } =
    useContext(PageContext);
  const { dataSingle } = state;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (currentUrl.includes("myInfo") && currentUrl.includes("users")) {
      const fetchMyInfo = async () => {
        await getMyInfo();
        setIsLoading(false);
      };
      fetchMyInfo();
    } else if (currentUrl.includes("users")) {
      const fetchData = async () => {
        await getSingleUser(userId);
        setIsLoading(false);
      };
      fetchData();
    } else if (currentUrl.includes("stores")) {
      const fetchData = async () => {
        await getSingleStore(storeId);
        setIsLoading(false);
      };
      fetchData();
    } else if (currentUrl.includes("orders")) {
      const fetchData = async () => {
        await getSingleStore(storeId);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [location]);

  if (currentUrl.includes("users")) {
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
  }
  if (currentUrl.includes("stores")) {
    return isLoading ? (
      <Loading title={title} />
    ) : (
      <StoreDetails
        dataSingle={dataSingle}
        getSingleStore={getSingleStore}
        title={title}
      />
    );
  }
  if (currentUrl.includes("orders")) {
    return isLoading ? (
      <Loading title={title} />
    ) : (
      <OrderDetails
        dataSingle={dataSingle}
        getSingleStore={getSingleStore}
        title={title}
      />
    );
  }
};
export default NewPage;
