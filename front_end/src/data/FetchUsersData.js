import { apiService } from "../app/apiService";

const FetchAllUsers = async () => {
  try {
    const dataAllUsers = await apiService.get(`/users`);
    return dataAllUsers;
  } catch (err) {
    console.log(`Error FetchAllUsers:${err.name}: ${err.message}`);
  }
};

const FetchMyInfo = async () => {
  try {
    const dataMyInfo = await apiService.get(`/users/myInfo`);
    return dataMyInfo;
  } catch (err) {
    console.log(`Error FetchAllUsers:${err.name}: ${err.message}`);
  }
};

const FetchSingleUser = async (id) => {
  try {
    const dataSingleUser = await apiService.get(`/users/${id}`);
    return dataSingleUser;
  } catch (err) {
    console.log(`Error FetchAllUsers:${err.name}: ${err.message}`);
  }
};
const FetchUpdateMe = async (formData) => {
  try {
    const dataUpdateMe = await apiService.patch("/users/updateMe", formData, {
      withCredentials: true,
    });
    return dataUpdateMe;
  } catch (err) {
    console.log(`Error FetchAllUsers:${err.name}: ${err.message}`);
  }
};
const FetchUpdateUser = async ({ userId, formData }) => {
  try {
    const dataUpdateUser = await apiService.patch(
      `/users/updateUser/${userId}`,
      formData,
      {
        withCredentials: true,
      }
    );
    return dataUpdateUser;
  } catch (err) {
    console.log(`Error FetchAllUsers:${err.name}: ${err.message}`);
  }
};

const AdminDeleteUser = async (id) => {
  try {
    const adminDeleteUser = await apiService.delete(`/users/${id}`);
    return adminDeleteUser;
  } catch (err) {
    console.log(`Error AdminDeleteUser:${err.name}: ${err.message}`);
  }
};

export {
  FetchAllUsers,
  FetchSingleUser,
  FetchMyInfo,
  FetchUpdateMe,
  FetchUpdateUser,
  AdminDeleteUser,
};
