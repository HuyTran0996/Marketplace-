import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { usePage } from "../usePage";

import avatar from "../../images/avatar.png";
import { PageContext } from "../../context/PageContext";

import { DeleteOrder, FetchCancelOrder } from "../../data/FetchOrdersData";

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableOrder = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { state, getDataAllOrders } = useContext(PageContext);
  const { dataAllOrders } = state;
  const { isOrderPage } = usePage();
  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getDataAllOrders();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isOrderPage]);

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
          width: 110,
          renderCell: (params) => {
            // Correctly reference the isDeleted field and convert the boolean to a string
            const status =
              params.row.orderStatus === "openToAdd" ? "Active" : "Passive";
            return (
              <div className={`cellWithStatus ${status.toLowerCase()}`}>
                {params.row.orderStatus}
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
                  to={`/orders/edit/${params.row.id}`}
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
    await getDataAllOrders();
  };

  const handleDelete = async (id) => {
    if (isOrderPage) {
      await DeleteOrder(id);
      await getDataAllOrders();
    }
  };

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
    </div>
  );
};

export default DataTableOrder;
