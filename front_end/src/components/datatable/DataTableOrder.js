import { useState, useContext, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { Paginate } from "../Pagination";
import { usePage } from "../usePage";

import avatar from "../../images/avatar.png";
import { PageContext } from "../../context/PageContext";

import { DeleteOrder, FetchCancelOrder } from "../../data/FetchOrdersData";

import "./dataTableOrder.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableOrder = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { state, getDataAllOrders } = useContext(PageContext);
  const { dataAllOrders } = state;
  const { isOrderPage } = usePage();
  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getDataAllOrders("", page, limit);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location, isOrderPage]);

  const STATUS = {
    SENT_ORDER_TO_STORE: "sentOrderToStore",
    DELIVERED: "delivered",
    DELIVERING: "delivering",
    OPEN_TO_ADD: "openToAdd",
    CANCELED: "canceled",
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case STATUS.SENT_ORDER_TO_STORE:
        return "Sent Order To Store";
      case STATUS.DELIVERED:
        return "Delivered";
      case STATUS.DELIVERING:
        return "Delivering";
      case STATUS.CANCELED:
        return "Canceled By Admin";
      case STATUS.OPEN_TO_ADD:
        return "Open To Add";
      default:
        return "Error";
    }
  };

  if (isLoading) {
    userColumns = [{ field: "id", headerName: " Loading...", width: 240 }];
  }

  if (isOrderPage && !isLoading) {
    if (error) {
      userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
    } else {
      dataOriginal = dataAllOrders.data.orders;
      userColumns = [
        { field: "id", headerName: "ID", width: 240 },

        {
          field: "customerName",
          headerName: "Buyer",
          width: 100,

          renderCell: (params) => {
            return <div className="cellWithImg">{params.row.customerName}</div>;
          },
        },
        {
          field: "deliverTo",
          headerName: "Deliver To",
          width: 350,
        },
        {
          field: "orderStatus",
          headerName: "STATUS",
          width: 150,

          renderCell: (params) => {
            const { orderStatus } = params.row;
            const statusClass =
              orderStatus === STATUS.DELIVERED
                ? "active"
                : orderStatus === STATUS.CANCELED
                ? "passive"
                : "pending";
            const statusLabel = getStatusLabel(orderStatus);
            return (
              <div className={`cellWithStatus ${statusClass}`}>
                {statusLabel}
              </div>
            );
          },
        },
      ];
      actionColumn = [
        {
          field: "action",
          headerName: "ACTION",
          width: 350,
          renderCell: (params) => {
            return (
              <div className="cellAction">
                <Link
                  to={`/adminPage/orders/edit/${params.row.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="editButton">View & Edit</div>
                </Link>

                <div
                  className="cancelButton"
                  onClick={() => handleCancelOrder(params.row.id)}
                >
                  Cancel Order
                </div>
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row.id)}
                >
                  Delete
                </div>
              </div>
            );
          },
        },
      ];
    }
  }

  const data = dataOriginal.map((user) => {
    return {
      ...user,
      id: user._id,
    };
  });

  const handleCancelOrder = async (id) => {
    await FetchCancelOrder(id);
    await getDataAllOrders("", page, limit);
  };

  const handleDelete = async (id) => {
    if (isOrderPage) {
      await DeleteOrder(id);
      await getDataAllOrders("", page, limit);
    }
  };

  return (
    <div className="datatable">
      <div className="dataGrid">
        <DataGrid
          rows={data}
          columns={userColumns.concat(actionColumn)}
          className="datagrid"
          autoHeight
          hideFooterPagination
          disableRowSelectionOnClick
        />
      </div>

      {Paginate(dataAllOrders, "/adminPage/orders", limit)}
    </div>
  );
};

export default DataTableOrder;
