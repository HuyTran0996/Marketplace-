import { useContext, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { FetchUpdateProduct } from "../../data/FetchProductsData";
import { PageContext } from "../../context/PageContext";
import { usePage } from "../../components/usePage";
import avatar from "../../images/avatar.png";

import "./new.scss";
import SidebarUser from "../../components/sidebar/SideBarUser";
import NavbarUserCartApp from "../../components/navbar/NavbarUserCartApp";

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

const ProductDetails = ({ dataSingle, getSingleProduct, title }) => {
  const { productId } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // const formData = new FormData();
      // formData.append("productName", productName);
      // formData.append("description", description);
      // formData.append("price", price);
      // formData.append("unit", unit);
      // formData.append("genre", genre);
      // if (fileSubmit) {
      //   formData.append("image", fileSubmit);
      // }

      // const formData = {
      //   productName,
      //   description,
      //   price,
      //   unit,
      //   genre,
      // };

      // await FetchUpdateProduct({ productId, formData });

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
      <SidebarUser />
      <div className="newContainer">
        <NavbarUserCartApp />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                dataSingle.data.product.photo
                  ? dataSingle.data.product.photo
                  : avatar
              }
              alt="avatar"
            />
          </div>

          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput" key="1">
                <span>Store Name: {dataSingle.data.product.storeName}</span>
              </div>

              <div className="formInput" key="2">
                <span>Product Name: {dataSingle.data.product.productName}</span>
              </div>

              <div className="formInput" key="3">
                <span>Description: {dataSingle.data.product.description}</span>
              </div>

              <div className="formInput" key="4">
                <span>
                  Price: {dataSingle.data.product.price}/
                  {dataSingle.data.product.unit}
                </span>
              </div>

              <button type="submit">Add To Cart</button>
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

const NewPageDetailProduct = ({ title }) => {
  const { isProductEditPage } = usePage();
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
    <Loading title={title} />
  ) : (
    <ProductDetails
      dataSingle={dataSingle}
      getSingleProduct={getSingleProduct}
      title={title}
    />
  );
};
export default NewPageDetailProduct;
