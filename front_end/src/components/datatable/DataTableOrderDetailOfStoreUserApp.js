import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import {
  FetchAllOrdersProduct,
  FetchAllOrdersProductOfStore,
  FetchUpdateOrderProduct,
} from "../../data/FetchOrdersProductData";
import { PageContext } from "../../context/PageContext";

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableOrderDetailOfStoreUserApp = () => {
  // const { orderID } = useParams();
  const location = useLocation();
  // const [storeId, setStoreId] = useState("");
  const [foundNoStore, setFoundNoStore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  const { state, getSingleStore, getDataAllStoreByOwnerEmail } =
    useContext(PageContext);
  const { dataSingle, dataUser } = state;

  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setIsLoading(true);
        // await getSingleStore(storeId);
        const result = await getDataAllStoreByOwnerEmail(
          dataUser.data.user.email
        );

        if (result?.data?.totalStores === 0) {
          setFoundNoStore(true);
        }
        let storeName = result.data.stores.storeName;

        let result1 = await FetchAllOrdersProductOfStore(storeName);

        setListProducts(result1.data.orderProducts);

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
    const cart = Array.isArray(listProducts) ? listProducts : [];
    return cart.reduce(
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
      await getDataAllStoreByOwnerEmail(dataUser.data.user.email);
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
      await getDataAllStoreByOwnerEmail(dataUser.data.user.email);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      setError(true);
    }
  };

  if (isLoading) {
    userColumns = [{ field: "id", headerName: " Loading...", width: 240 }];
  } else if (error || !listProducts) {
    userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
  } else if (listProducts.length === 0) {
    userColumns = [
      { field: "id", headerName: " Your Store Has No Orders...", width: 240 },
    ];
  } else {
    dataOriginal = listProducts;
    userColumns = [
      { field: "id", headerName: "ID", width: 70 },
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
            <span>{params.row.quantity.toLocaleString()}</span>
          </div>
        ),
      },

      {
        field: "Total",
        headerName: "Total",
        width: 90,
        renderCell: (params) => {
          return (
            <span>
              {(params.row.quantity * params.row.productPrice).toLocaleString()}
            </span>
          );
        },
      },
      {
        field: "orderProductStatus",
        headerName: "Order Status",
        width: 190,
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
      <DataGrid
        rows={data} //userRows
        columns={userColumns.concat(actionColumn)} //userColumns
        className="datagrid"
        // checkboxSelection
        // pageSize={9}
        // rowsPerPageOptions={[9]}
      />

      <div className="totalPrice">
        <span>Total Price: </span>
        <span>{totalPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default DataTableOrderDetailOfStoreUserApp;
