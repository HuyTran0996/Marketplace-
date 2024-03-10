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
  const [error, setError] = useState(false);
  const { state, getDataAllUsers } = useContext(PageContext);
  const { dataAllUsers } = state;
  const { isUserPage } = usePage();
  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getDataAllUsers();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isUserPage]);

  if (isLoading) {
    userColumns = [{ field: "id", headerName: " Loading...", width: 240 }];
  }

  if (isUserPage && !isLoading) {
    if (error) {
      userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
    } else {
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
                  to={`/adminPage/users/edit/${params.row.id}`}
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
