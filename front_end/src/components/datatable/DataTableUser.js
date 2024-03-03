import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { usePage } from "../usePage";

import avatar from "../../images/avatar.png";
import { PageContext } from "../../context/PageContext";
import { AdminDeleteUser } from "../../data/FetchUsersData";

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state, getDataAllUsers } = useContext(PageContext);
  const { dataAllUsers } = state;
  const { isUserPage } = usePage();
  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (isUserPage) {
          await getDataAllUsers();
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isUserPage]);

  if (isLoading) {
    userColumns = [
      { field: "id", headerName: " Loading...", width: 240 },

      {
        field: "user",
        headerName: " Loading...",
        width: 120,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={avatar} alt="avatar" />
              Loading...
            </div>
          );
        },
      },

      {
        field: "email",
        headerName: " Loading...",
        width: 150,
      },

      {
        field: "phone",
        headerName: " Loading...",
        width: 100,
      },

      {
        field: "role",
        headerName: " Loading...",
        width: 100,
      },

      {
        field: "isDeleted",
        headerName: " Loading...",
        width: 90,
        renderCell: (params) => {
          const status = params.row.isDeleted ? "Deleted" : "Active";
          return (
            <div className={`cellWithStatus ${status.toLowerCase()}`}>
              Loading...
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
        renderCell: () => {
          return (
            <div className="cellAction">
              <Link style={{ textDecoration: "none" }}>
                <div className="editButton"> Loading...</div>
              </Link>
              <div className="deleteButton">Loading...</div>
            </div>
          );
        },
      },
    ];
  }

  if (isUserPage) {
    dataOriginal = dataAllUsers.data.users;
    userColumns = [
      { field: "id", headerName: "ID", width: 240 },

      {
        field: "user",
        headerName: "User",
        width: 120,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img
                className="cellImg"
                src={params.row.photo ? params.row.photo : avatar}
                alt="avatar"
              />
              {params.row.name}
            </div>
          );
        },
      },

      {
        field: "email",
        headerName: "Email",
        width: 150,
      },

      {
        field: "phone",
        headerName: "Phone",
        width: 100,
      },

      {
        field: "role",
        headerName: "Role",
        width: 100,
      },

      {
        field: "isDeleted",
        headerName: "STATUS",
        width: 90,
        renderCell: (params) => {
          // Correctly reference the isDeleted field and convert the boolean to a string
          const status = params.row.isDeleted ? "Deleted" : "Active";
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
              <Link
                to={`/users/edit/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="editButton">View & Edit</div>
              </Link>

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

  const data = dataOriginal.map((user) => {
    return {
      ...user,
      id: user._id,
    };
  });

  const handleDelete = async (id) => {
    if (isUserPage) {
      await AdminDeleteUser(id);
      await getDataAllUsers();
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

export default DataTableUser;
