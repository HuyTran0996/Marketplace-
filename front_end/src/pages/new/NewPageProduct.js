import { useContext, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { FetchUpdateProduct } from "../../data/FetchProductsData";
import { PageContext } from "../../context/PageContext";
import { usePage } from "../../components/usePage";
import avatar from "../../images/avatar.png";
import { showToast } from "../../components/ToastMessage";

import "./new.scss";
import Sidebar from "../../components/sidebar/SideBar";
import SidebarUser from "../../components/sidebar/SideBarUser";
// import Navbar from "../../components/navbar/NavBar";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const Loading = ({ title, isUserPage }) => {
  return (
    <div className="new">
      {isUserPage ? <SidebarUser /> : <Sidebar />}
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

const ProductDetails = ({
  dataSingle,
  getSingleProduct,
  title,
  isUserPage,
}) => {
  const { productId } = useParams();

  const [productName, setProductName] = useState(
    `${dataSingle.data.product.productName}`
  );
  const [description, setDescription] = useState(
    `${dataSingle.data.product.description}`
  );
  const [price, setPrice] = useState(`${dataSingle.data.product.price}`);
  const [unit, setUnit] = useState(`${dataSingle.data.product.unit}`);
  const [genre, setGenre] = useState(`${dataSingle.data.product.genre}`);

  const [fileSubmit, setFileSubmit] = useState(
    `${dataSingle.data.product.photo}`
  );
  const [file, setFile] = useState(`${dataSingle.data.product.photo}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleUnitChange = (e) => {
    setUnit(e.target.value);
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
      formData.append("productName", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("unit", unit);
      formData.append("genre", genre);
      if (fileSubmit) {
        formData.append("image", fileSubmit);
      }

      await FetchUpdateProduct({ productId, formData });

      await getSingleProduct(productId);

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
      {isUserPage ? <SidebarUser /> : <Sidebar />}
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
                <label>Store Name (Store can not be changed)</label>
                <input type="text" value={dataSingle.data.product.storeName} />
              </div>

              <div className="formInput" key="2">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="store name"
                  value={productName}
                  onChange={handleProductNameChange}
                />
              </div>

              <div className="formInput" key="3">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>

              <div className="formInput" key="4">
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>

              <div className="formInput" key="5">
                <label>Unit</label>
                <input
                  type="text"
                  placeholder="Unit"
                  value={unit}
                  onChange={handleUnitChange}
                />
              </div>

              <div className="formInput" key="6">
                <label>Genres</label>
                <select value={genre} onChange={handleGenreChange}>
                  <option value="">{genre}</option>
                  <option value="Foods">Foods</option>
                  <option value="Devices">Devices</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Others">Others</option>
                </select>
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

const NewPageProduct = ({ title }) => {
  const { isProductEditPage, isUserPage } = usePage();
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { state, getSingleProduct } = useContext(PageContext);
  const { dataSingle } = state;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await getSingleProduct(productId);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isProductEditPage]);

  return isLoading ? (
    <Loading title={title} isUserPage={isUserPage} />
  ) : (
    <ProductDetails
      dataSingle={dataSingle}
      getSingleProduct={getSingleProduct}
      title={title}
      isUserPage={isUserPage}
    />
  );
};
export default NewPageProduct;
