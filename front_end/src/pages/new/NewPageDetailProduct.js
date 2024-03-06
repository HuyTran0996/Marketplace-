import { useContext, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { FetchUpdateProduct } from "../../data/FetchProductsData";
import { FetchCreateReviewOfProduct } from "../../data/FetchReviewData";
import { PageContext } from "../../context/PageContext";
import { usePage } from "../../components/usePage";
import avatar from "../../images/avatar.png";

import "./new.scss";
import SidebarUser from "../../components/sidebar/SideBarUser";
import NavbarUserCartApp from "../../components/navbar/NavbarUserCartApp";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import SendIcon from "@mui/icons-material/Send";
import { IoMdSend } from "react-icons/io";

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

const ProductDetails = ({
  dataSingle,
  reviewsOfThisProduct,
  getSingleProduct,
  title,
}) => {
  const { state, dispatch, getReviewsOfThis } = useContext(PageContext);
  // const { reviewsOfThisProduct } = state;
  const { productId } = useParams();

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();

    const productInStorage = JSON.parse(localStorage.getItem("favorite"));
    const favoriteList = productInStorage ? productInStorage : [];
    let newFavorite = [...favoriteList];
    const isProductAlreadyInCart = newFavorite.find(
      (existingProduct) => existingProduct._id === productId
    );
    if (!isProductAlreadyInCart) {
      newFavorite.push(dataSingle.data.product);
    }

    dispatch({
      type: "SET_DATA_CART",
      payload: newFavorite,
    });
    localStorage.setItem("favorite", JSON.stringify(newFavorite));
  };

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      // If the comment is empty, do not proceed with the rest of the function
      return;
    }
    try {
      setComment("");
      setIsSubmitting(true);
      await FetchCreateReviewOfProduct(productId, comment);
      await getReviewsOfThis(productId);
      setIsSubmitting(false);
    } catch (error) {
      setError(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new">
      <SidebarUser />
      <div className="newContainer">
        <NavbarUserCartApp />

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
            <form onSubmit={handleAddToCart}>
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
            </form>

            {/* ////Comment section//// */}

            <div className="commentsSection">
              <h2>Comments</h2>
              <form onSubmit={handleSendComment}>
                <div className="formInput" key="1">
                  <input
                    type="text"
                    placeholder="write a comment..."
                    value={comment}
                    onChange={handleCommentChange}
                  />
                  <IoMdSend
                    className="submitIcon"
                    onClick={handleSendComment}
                    disabled={isSubmitting}
                  />
                </div>
                {error ? <div className="error">{error}</div> : ""}
              </form>
              {reviewsOfThisProduct
                ? reviewsOfThisProduct.data.reviews.map((review) => {
                    return (
                      <div className="comment" key={review._id}>
                        <div className="commentContent">
                          <h3>{review.reviewerName}</h3>
                          <p>{review.userReview}</p>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
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
  const { state, getSingleProduct, getReviewsOfThis } = useContext(PageContext);
  const { dataSingle, reviewsOfThisProduct } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getSingleProduct(productId);
        await getReviewsOfThis(productId);
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
      reviewsOfThisProduct={reviewsOfThisProduct}
      title={title}
    />
  );
};
export default NewPageDetailProduct;
