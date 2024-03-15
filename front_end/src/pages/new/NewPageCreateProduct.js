import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FetchUpdateProduct,
  FetchCreateProduct,
} from "../../data/FetchProductsData";
import { PageContext } from "../../context/PageContext";
import { usePage } from "../../components/usePage";
import avatar from "../../images/avatar.png";

import "./new.scss";
import Sidebar from "../../components/sidebar/SideBar";
import SidebarUser from "../../components/sidebar/SideBarUser";
// import Navbar from "../../components/navbar/NavBar";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const ProductDetails = ({
  dataSingle,
  getSingleProduct,
  title,
  isUserPage,
}) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [genre, setGenre] = useState("");

  const [fileSubmit, setFileSubmit] = useState("");
  const [file, setFile] = useState("");
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
    if (!productName || !description || !price || !unit) {
      toast.error("Please fill in all the fields");
      return;
    }
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      const data = {
        productName: productName,
        description: description,
        price: price,
        unit: unit,
        genre: genre,
      };
      let result = await FetchCreateProduct({ data });
      let productId = result.data.product._id;
      if (fileSubmit) {
        formData.append("image", fileSubmit);
        await FetchUpdateProduct({ productId, formData });
      }

      toast.success("Create Product Successfully");

      setTimeout(() => {
        navigate("/userPage/stores/yourStoreProducts");
      }, 2000); // Delay of 2 second

      // await getSingleProduct(productId);

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
      {isUserPage ? <SidebarUser /> : <Sidebar />}
      <div className="newContainer">
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
                <label>Genre</label>
                <select value={genre} onChange={handleGenreChange}>
                  <option value="Others">Others</option>
                  <option value="Foods">Foods</option>
                  <option value="Devices">Devices</option>
                  <option value="Stationery">Stationery</option>
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

const NewPageCreateProduct = ({ title }) => {
  const { isProductEditPage, isUserPage } = usePage();

  const { state, getSingleProduct } = useContext(PageContext);
  const { dataSingle } = state;

  return (
    <>
      <ToastContainer />
      <ProductDetails
        dataSingle={dataSingle}
        getSingleProduct={getSingleProduct}
        title={title}
        isUserPage={isUserPage}
      />
    </>
  );
};
export default NewPageCreateProduct;
