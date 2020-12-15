import api from "../config/api.config";
import { localStoreService } from "./local-store.service";

class AuthService {
  login = async (nuban: string, password: string) => {
    const input: API.SignInWithNuban = {
      nuban,
      password,
    };
    return api.post<API.UserResponseModel>("/user/signIn", input);
  };
  signup = async (input: API.CreateWalletRequestDto) =>
    api.post<API.UserResponseModel>("/User/CreateUserWallet", input);

  logout = async () => {
    localStoreService.clear();
  };
  isAuthenticated = () => !!localStoreService.getAuthToken();
}

export const authService = new AuthService();
