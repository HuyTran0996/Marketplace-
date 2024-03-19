import { apiService } from "../app/apiService";

const FetchAllUsers = async (email, page, limit) => {
  if (email) {
    const dataAllUsers = await apiService.get(`/users?email=${email}`);
    return dataAllUsers;
  } else {
    const dataAllUsers = await apiService.get(
      `/users?page=${page || 1}&limit=${limit || 8}`
    );
    return dataAllUsers;
  }
};

const FetchMyInfo = async () => {
  const dataMyInfo = await apiService.get(`/users/myInfo`);
  return dataMyInfo;
};

const FetchSingleUser = async (id) => {
  const dataSingleUser = await apiService.get(`/users/${id}`);
  return dataSingleUser;
};
const FetchUpdateMe = async (formData) => {
  const dataUpdateMe = await apiService.patch("/users/updateMe", formData, {
    withCredentials: true,
  });
  return dataUpdateMe;
};
const FetchUpdateUser = async ({ userId, formData }) => {
  const dataUpdateUser = await apiService.patch(
    `/users/updateUser/${userId}`,
    formData,
    {
      withCredentials: true,
    }
  );
  return dataUpdateUser;
};

const AdminDeleteUser = async (id) => {
  const adminDeleteUser = await apiService.delete(`/users/${id}`);
  return adminDeleteUser;
};
const AdminActiveUser = async (id) => {
  const AdminActiveUser = await apiService.get(
    `/users/adminActivateUser/${id}`
  );
  return AdminActiveUser;
};

export {
  FetchAllUsers,
  FetchSingleUser,
  FetchMyInfo,
  FetchUpdateMe,
  FetchUpdateUser,
  AdminDeleteUser,
  AdminActiveUser,
};
