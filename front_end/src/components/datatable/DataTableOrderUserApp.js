import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { usePage } from "../usePage";
import { PageContext } from "../../context/PageContext";

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableOrderUserApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { state, getDataAllOrdersOfAUser } = useContext(PageContext);
  const { dataAllOrders, dataSingle } = state;
  const { isOrderPageUserApp } = usePage();
  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getDataAllOrdersOfAUser(dataSingle.data.user._id);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isOrderPageUserApp]);

  if (isLoading) {
    userColumns = [{ field: "id", headerName: " Loading...", width: 240 }];
  }

  if (isOrderPageUserApp && !isLoading) {
    if (error) {
      userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
    } else {
      dataOriginal = dataAllOrders.data.orders.filter(
        (order) => order.orderStatus !== "openToAdd"
      );
      userColumns = [
        { field: "id", headerName: "ORDER ID", width: 240 },

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
                  to={`/userPage/myOrders/${params.row.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="editButton">See Detail</div>
                </Link>
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

export default DataTableOrderUserApp;
