import { useState, useContext, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { Paginate } from "../Pagination";

import { usePage } from "../usePage";
import { PageContext } from "../../context/PageContext";
import "./dataTableOrderUserApp.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableOrderUserApp = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { state, getDataAllOrdersOfAUser, getMyInfo } = useContext(PageContext);
  const { dataAllOrders, dataSingle, dataUser } = state;
  const { isOrderPageUserApp } = usePage();
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

        if (!dataUser) {
          const user = await getMyInfo();
          await getDataAllOrdersOfAUser(user.data.user._id, page, limit);
        } else {
          await getDataAllOrdersOfAUser(dataUser.data.user._id, page, limit);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location, isOrderPageUserApp]);

  if (isLoading) {
    userColumns = [{ field: "id", headerName: " Loading...", width: 240 }];
  }

  if (isOrderPageUserApp && !isLoading) {
    if (error) {
      userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
    } else {
      //lọc thêm cho chắc, chứ ở FetchAllOrdersOfAUser đã có lọc rồi
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
      <div className="dataGrid">
        <DataGrid
          rows={data}
          columns={userColumns.concat(actionColumn)}
          className="datagrid"
          autoHeight
          hideFooterPagination
        />
      </div>
      {Paginate(dataAllOrders, "/userPage/myOrders", limit)}
    </div>
  );
};

export default DataTableOrderUserApp;
