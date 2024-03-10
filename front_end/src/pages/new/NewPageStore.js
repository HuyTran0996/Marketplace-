import { useContext, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { FetchUpdateStore } from "../../data/FetchStoresData";

import { PageContext } from "../../context/PageContext";
import { usePage } from "../../components/usePage";
import avatar from "../../images/avatar.png";

import "./new.scss";
import Sidebar from "../../components/sidebar/SideBar";
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
            <img src={avatar} alt="avatar" />
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
            <img src={file ? file : avatar} alt="avatar" />
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
                  placeholder="store name"
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

const NewPageStore = ({ title }) => {
  const { isStoreEditPage } = usePage();
  const { storeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { state, getSingleStore } = useContext(PageContext);
  const { dataSingle } = state;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await getSingleStore(storeId);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isStoreEditPage]);

  return isLoading ? (
    <Loading title={title} />
  ) : (
    <StoreDetails
      dataSingle={dataSingle}
      getSingleStore={getSingleStore}
      title={title}
    />
  );
};
export default NewPageStore;
