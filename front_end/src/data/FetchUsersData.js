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
    const dataAllUsers = await apiService.get(`/users/${id}`);
    return dataAllUsers;
  } catch (err) {
    console.log(`Error FetchAllUsers:${err.name}: ${err.message}`);
  }
};
const AdminDeleteUser = async (id) => {
  try {
    const dataAllUsers = await apiService.delete(`/users/${id}`);
    return dataAllUsers;
  } catch (err) {
    console.log(`Error AdminDeleteUser:${err.name}: ${err.message}`);
  }
};

export { FetchAllUsers, AdminDeleteUser, FetchSingleUser };
