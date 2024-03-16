import { useState, useContext, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { Paginate } from "../Pagination";

import {
  FetchAllOrdersProductOfStore,
  FetchUpdateOrderProduct,
} from "../../data/FetchOrdersProductData";
import { PageContext } from "../../context/PageContext";
import "./dataTableOrderDetailOfStoreUserApp.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableOrderDetailOfStoreUserApp = () => {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const {
    state,
    getDataAllStoreByOwnerEmail,
    getMyInfo,
    getDataAllOrdersProductOfAStore,
  } = useContext(PageContext);
  const { dataSingle, dataUser, dataAllOrdersProductOfStore } = state;

  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setIsLoading(true);

        let result;
        if (!dataUser) {
          const user = await getMyInfo();
          result = await getDataAllStoreByOwnerEmail(user.data.user.email);
        } else {
          result = await getDataAllStoreByOwnerEmail(dataUser.data.user.email);
        }

        let storeID = result.data.stores._id;

        await getDataAllOrdersProductOfAStore(storeID, page, limit);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, [location]);

  const calculateTotalPrice = () => {
    // Ensure dataCart is always an array to safely use reduce
    const cart = Array.isArray(dataAllOrdersProductOfStore?.data.orderProducts)
      ? dataAllOrdersProductOfStore.data.orderProducts
      : [];
    // Filter out products with status 'canceledByStore'
    const filteredCart = cart.filter(
      (item) => item.orderProductStatus !== "canceledByStore"
    );
    // Calculate the total price excluding canceled products
    return filteredCart.reduce(
      (total, item) => total + item.quantity * item.productPrice,
      0
    );
  };

  const totalPrice = calculateTotalPrice();

  const handleDelivered = async (orderProductId, productID) => {
    try {
      setError(false);
      setIsLoading(true);

      const data = {
        orderProductStatus: "deliveredToApp",
        productID: productID,
      };
      await FetchUpdateOrderProduct({ orderProductId, data });

      await getDataAllOrdersProductOfAStore(
        dataSingle.data.stores._id,
        page,
        limit
      );

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      setError(true);
    }
  };
  const handleCancel = async (orderProductId, productID) => {
    try {
      setError(false);
      setIsLoading(true);

      const data = {
        orderProductStatus: "canceledByStore",
        productID: productID,
      };
      await FetchUpdateOrderProduct({ orderProductId, data });

      await getDataAllOrdersProductOfAStore(
        dataSingle.data.stores._id,
        page,
        limit
      );

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      setError(true);
    }
  };

  if (isLoading) {
    userColumns = [{ field: "id", headerName: " Loading...", width: 240 }];
  } else if (error) {
    userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
  } else if (dataAllOrdersProductOfStore.data.orderProducts === 0) {
    userColumns = [
      { field: "id", headerName: " Your Store Has No Orders...", width: 240 },
    ];
  } else if (dataAllOrdersProductOfStore) {
    dataOriginal = dataAllOrdersProductOfStore.data.orderProducts;
    userColumns = [
      // { field: "id", headerName: "ID", width: 70 },
      { field: "orderID", headerName: "Order ID", width: 70 },
      { field: "productID", headerName: "pID", width: 70 },
      {
        field: "storeName",
        headerName: "Store",
        width: 100,

        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.storeName}</div>;
        },
      },
      {
        field: "productName",
        headerName: "Product",
        width: 190,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.productName}</div>;
        },
      },
      {
        field: "productPrice",
        headerName: "Price",
        width: 80,
      },
      {
        field: "unit",
        headerName: "Unit",
        width: 60,
      },

      {
        field: "quantity",
        headerName: "Quantity",
        width: 75,
        renderCell: (params) => (
          <div className="quantity">
            <div>{params.row.quantity.toLocaleString()}</div>
          </div>
        ),
      },

      {
        field: "Total",
        headerName: "Total",
        width: 90,
        renderCell: (params) => {
          return (
            <div>
              {(params.row.quantity * params.row.productPrice).toLocaleString()}
            </div>
          );
        },
      },
      {
        field: "orderProductStatus",
        headerName: "Order Status",
        width: 190,

        renderCell: (params) => {
          // Correctly reference the isDeleted field and convert the boolean to a string
          const status =
            params.row.orderProductStatus === "deliveredToApp"
              ? "active"
              : params.row.orderProductStatus === "canceledByStore"
              ? "passive"
              : "pending";
          return (
            <div className={`cellWithStatus ${status.toLowerCase()}`}>
              {params.row.orderProductStatus}
            </div>
          );
        },
      },
    ];

    actionColumn = [
      {
        field: "action",
        headerName: "ACTION",
        width: 210,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <div
                className="editButton"
                onClick={() =>
                  handleDelivered(params.row.id, params.row.productID)
                }
              >
                Delivered To App
              </div>
              <div
                className="deleteButton"
                onClick={() =>
                  handleCancel(params.row.id, params.row.productID)
                }
              >
                Cancel
              </div>
            </div>
          );
        },
      },
    ];
  }

  const data = dataOriginal.map((user) => {
    return {
      ...user,
      id: user._id,
    };
  });

  return (
    <div className="datatable">
      <div className="dataGrid">
        <DataGrid
          rows={data}
          columns={userColumns.concat(actionColumn)}
          className="datagrid"
          autoHeight
          hideFooterPagination
        />
      </div>
      <div className="totalPrice">
        <div>Total Price: {totalPrice.toLocaleString()}</div>
      </div>
      {Paginate(
        dataAllOrdersProductOfStore,
        "/userPage/stores/yourStoreOrdersProduct",
        limit
      )}
    </div>
  );
};

export default DataTableOrderDetailOfStoreUserApp;
