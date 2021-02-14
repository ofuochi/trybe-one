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
  private authToken = "AuthToken";
  private cardToken = "CardToken";
  private cardReference = "CardReference";
  private cardTokenizedAmount = "CardTokenizedAmount";
  private user = "CurrentUser";
  saveAuthToken = (token: string, currentUser: CurrentUser) => {
    localStorage.setItem(this.authToken, token);
    localStorage.setItem(this.user, JSON.stringify(currentUser));
  };
  saveCardToken = (token: string, amount: number, ref: string) => {
    localStorage.setItem(this.cardToken, token);
    localStorage.setItem(this.cardTokenizedAmount, amount.toString());
    localStorage.setItem(this.cardReference, ref);
  };

  getAuthToken = () => localStorage.getItem(this.authToken);
  getCardToken = () => ({
    cardToken: localStorage.getItem(this.cardToken),
    cardTokenizedAmount: localStorage.getItem(this.cardTokenizedAmount),
    cardReference: localStorage.getItem(this.cardReference),
  });
  getCurrentUser = () => {
    const currentUserStr = localStorage.getItem(this.user);
    if (currentUserStr) return JSON.parse(currentUserStr) as CurrentUser;
  };
}
export const localStoreService = new LocalStoreService();
