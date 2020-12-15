export interface CurrentUser {
  userId: string;
  email: string;
  name: string;
  nuban: string;
}
class LocalStoreService {
  clear() {
    localStorage.clear();
  }
  authToken = "AuthToken";
  user = "CurrentUser";
  saveAuthToken = (token: string, currentUser: CurrentUser) => {
    localStorage.setItem(this.authToken, token);
    localStorage.setItem(this.user, JSON.stringify(currentUser));
  };
  getAuthToken = () => localStorage.getItem(this.authToken);
  getCurrentUser = () => {
    const currentUserStr = localStorage.getItem(this.user);
    if (currentUserStr) return JSON.parse(currentUserStr) as CurrentUser;
  };
}
export const localStoreService = new LocalStoreService();
