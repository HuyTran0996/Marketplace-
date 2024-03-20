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
import { DeleteStore, AdminActivateStore } from "../../data/FetchStoresData";

import "./dataTableStore.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableStore = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { state, getDataAllStores } = useContext(PageContext);
  const { dataAllStores } = state;
  const { isStorePage } = usePage();
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

        await getDataAllStores("", page, limit);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location, isStorePage]);

  if (isLoading) {
    userColumns = [{ field: "id", headerName: " Loading...", width: 240 }];
  }

  if (isStorePage && !isLoading) {
    if (error) {
      userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
    } else {
      dataOriginal = dataAllStores.data.stores;
      userColumns = [
        { field: "id", headerName: "ID", width: 240 },

        {
          field: "storeName",
          headerName: "Store Name",
          width: 150,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <img
                  className="cellImg"
                  src={params.row.photo ? params.row.photo : avatar}
                  alt="avatar"
                />
                {params.row.storeName}
              </div>
            );
          },
        },

        {
          field: "ownerEmail",
          headerName: "Owner Email",
          width: 150,
        },

        {
          field: "address",
          headerName: "Address",
          width: 200,
        },

        {
          field: "isDeleted",
          headerName: "STATUS",
          width: 110,
          renderCell: (params) => {
            // Correctly reference the isDeleted field and convert the boolean to a string
            const status = params.row.isDeleted ? "Passive" : "Active";
            return (
              <div className={`cellWithStatus ${status.toLowerCase()}`}>
                {status}
              </div>
            );
          },
        },
      ];
      actionColumn = [
        {
          field: "action",
          headerName: "ACTION",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="cellAction">
                {!params.row.isDeleted ? (
                  <Link
                    to={`/adminPage/stores/edit/${params.row.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="editButton">View & Edit</div>
                  </Link>
                ) : (
                  <div
                    className="editButton"
                    onClick={() => handleActivateStore(params.row.id)}
                  >
                    activate
                  </div>
                )}

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

  const handleDelete = async (id) => {
    if (isStorePage) {
      await DeleteStore(id);
      await getDataAllStores("", page, limit);
    }
  };
  const handleActivateStore = async (id) => {
    if (isStorePage) {
      await AdminActivateStore(id);
      await getDataAllStores("", page, limit);
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
      {Paginate(dataAllStores, "/adminPage/stores", limit)}
    </div>
  );
};

export default DataTableStore;
