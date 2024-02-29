import { apiService } from "../app/apiService";

const FetchAllUsers = async () => {
  try {
    const dataAllUsers = await apiService.get(`/users`);
    return dataAllUsers;
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
const AdminDeleteUser = async (id) => {
  try {
    const adminDeleteUser = await apiService.delete(`/users/${id}`);
    return adminDeleteUser;
  } catch (err) {
    console.log(`Error AdminDeleteUser:${err.name}: ${err.message}`);
  }
};

export { FetchAllUsers, AdminDeleteUser, FetchSingleUser };
