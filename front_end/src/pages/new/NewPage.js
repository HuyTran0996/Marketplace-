import { useContext, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { FetchUpdateMe, FetchUpdateUser } from "../../data/FetchUsersData";
import { FetchUpdateStore } from "../../data/FetchStoresData";
import { FetchUpdateOrder } from "../../data/FetchOrdersData";
import { PageContext } from "../../context/PageContext";

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
        await FetchUpdateMe(formData);
        await getMyInfo();
      } else {
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
      formData.append("storeName", name);
      formData.append("address", address);
      if (fileSubmit) {
        formData.append("image", fileSubmit);
      }

      await FetchUpdateStore({ storeId, formData });

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

const OrderDetails = ({ dataSingle, getSingleOrder, title }) => {
  const { orderId } = useParams();

  const [address, setAddress] = useState(`${dataSingle.data.order.deliverTo}`);
  const [orderStatus, setOrderStatus] = useState(
    `${dataSingle.data.order.orderStatus}`
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleOrderStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("orderStatus", orderStatus);
      formData.append("deliverTo", address);

      await FetchUpdateOrder({ orderId, formData });

      await getSingleOrder(orderId);

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
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput" key="1">
                <label>Buyer (can not change buyer)</label>
                <input
                  type="text"
                  placeholder="user name"
                  value={dataSingle.data.order.customerName}
                />
              </div>

              <div className="formInput" key="2">
                <label>Order Status</label>
                <select value={orderStatus} onChange={handleOrderStatusChange}>
                  <option value="">{orderStatus}</option>
                  <option value="openToAdd">Open To Add</option>
                  <option value="sentOrderToStore">Sent Order To Store</option>
                  <option value="delivering">Delivering</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <div className="formInput" key="3">
                <label>Deliver To</label>
                <input
                  type="text"
                  placeholder="Deliver To"
                  value={address}
                  onChange={handleAddressChange}
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
  const { userId, storeId, orderId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { state, getSingleUser, getMyInfo, getSingleStore, getSingleOrder } =
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
        await getSingleOrder(orderId);
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
        getSingleOrder={getSingleOrder}
        title={title}
      />
    );
  }
};
export default NewPage;
