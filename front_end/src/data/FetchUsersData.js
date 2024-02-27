import { apiService } from "../app/apiService";

const FetchAllUsers = async () => {
  try {
    const data = await apiService.get(`/users`);

    return data;
  } catch (err) {
    console.log(`Error FetchAllUsers:${err.name}: ${err.message}`);
  }
};

export { FetchAllUsers };
