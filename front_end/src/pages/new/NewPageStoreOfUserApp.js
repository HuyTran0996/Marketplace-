import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { FetchUpdateStore, FetchCreateStore } from "../../data/FetchStoresData";

import { PageContext } from "../../context/PageContext";
import { usePage } from "../../components/usePage";
import avatar from "../../images/avatar.png";

import "./new.scss";
import SidebarUser from "../../components/sidebar/SideBarUser";
// import Navbar from "../../components/navbar/NavBar";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const Loading = ({ title }) => {
  return (
    <div className="new">
      <SidebarUser />
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

const CreateStore = ({
  userEmail,
  setFoundNoStore,
  getDataAllStoreByOwnerEmail,
}) => {
  const { storeId } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [fileSubmit, setFileSubmit] = useState("");
  const [file, setFile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFileSubmit(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      let formData = new FormData();
      // formData.append("storeName", name);
      // formData.append("address", address);

      const data = {
        storeName: name,
        address: address,
      };
      const result = await FetchCreateStore({ data });
      let storeId = result.data.store._id;
      if (fileSubmit) {
        formData.append("image", fileSubmit);
        await FetchUpdateStore({ storeId, formData });
      }

      await getDataAllStoreByOwnerEmail(userEmail);
      setIsSubmitting(false);
      setFoundNoStore(false);
      // Reset the file input value
      document.getElementById("file").value = "";
      setError(false);

      return;
    } catch (error) {
      let errorMessage = `${error}`;
      setIsSubmitting(false);
      setError(errorMessage);
    }
  };

  return (
    <div className="new">
      <SidebarUser />
      <div className="newContainer">
        <div className="top">
          <h1>Create Your Store</h1>
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
                <span>{userEmail}</span>
              </div>

              <div className="formInput" key="3">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Store Address"
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

const StoreDetails = ({ dataSingle, getSingleStore, title, storeId }) => {
  const [name, setName] = useState(`${dataSingle.data.stores.storeName}`);
  const [address, setAddress] = useState(`${dataSingle.data.stores.address}`);
  const [fileSubmit, setFileSubmit] = useState(
    `${dataSingle.data.stores.photo}`
  );
  const [file, setFile] = useState(`${dataSingle.data.stores.photo}`);
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
      <SidebarUser />
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

                <span>{dataSingle.data.stores.ownerEmail}</span>
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

const NewPageStoreOfUserApp = ({ title }) => {
  const { isStoreEditPage } = usePage();

  const [storeId, setStoreId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [foundNoStore, setFoundNoStore] = useState(false);
  const { state, getSingleStore, getDataAllStoreByOwnerEmail } =
    useContext(PageContext);
  const { dataSingle, userEmail } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // await getSingleStore(storeId);
        const result = await getDataAllStoreByOwnerEmail(userEmail);

        if (result?.data?.totalStores === 0) {
          setFoundNoStore(true);
        }
        setStoreId(result.data.stores._id);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loading title={title} />
  ) : foundNoStore ? (
    <CreateStore
      userEmail={userEmail}
      setFoundNoStore={setFoundNoStore}
      getDataAllStoreByOwnerEmail={getDataAllStoreByOwnerEmail}
    />
  ) : (
    <StoreDetails
      dataSingle={dataSingle}
      getSingleStore={getSingleStore}
      title={title}
      storeId={storeId}
    />
  );
};
export default NewPageStoreOfUserApp;
