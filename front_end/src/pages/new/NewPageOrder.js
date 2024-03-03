import { useContext, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { FetchUpdateOrder } from "../../data/FetchOrdersData";
import { PageContext } from "../../context/PageContext";
import { usePage } from "../../components/usePage";

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

const OrderDetails = ({ dataSingle, getSingleOrder, title }) => {
  const { orderId } = useParams();

  const [deliverTo, setAddress] = useState(
    `${dataSingle.data.order.deliverTo}`
  );
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
      const data = {
        orderStatus: orderStatus,
        deliverTo: deliverTo,
      };

      await FetchUpdateOrder({ orderId, data });

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
                  value={deliverTo}
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

const NewPageOrder = ({ title }) => {
  const { isOrderEditPage } = usePage();
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { state, getSingleOrder } = useContext(PageContext);
  const { dataSingle } = state;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await getSingleOrder(orderId);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isOrderEditPage]);

  return isLoading ? (
    <Loading title={title} />
  ) : (
    <OrderDetails
      dataSingle={dataSingle}
      getSingleOrder={getSingleOrder}
      title={title}
    />
  );
};

export default NewPageOrder;
