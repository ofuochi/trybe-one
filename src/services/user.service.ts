import api from "../config/api.config";
import { setupCache } from "axios-cache-adapter";

class UserService {
  getUserByEmail = async (email: string) =>
    api.get<API.UserResponseModel>(`/User/GetUserByEmail?email=${email}`, {
      adapter: setupCache({}).adapter,
    });
}
export const userService = new UserService();
