export const routePath = {
  dashboard: "/dashboard",
  transactions: {
    index: "/transactions",
    history: "/transactions/history",
    transfer: {
      index: "/transactions/transfer",
      self: "/transactions/transfer/self",
      others: "/transactions/transfer/others",
      sterling: "/transactions/transfer/sterling",
    },
    airtime: {
      index: "/transactions/airtime",
      self: "/transactions/airtime/self",
      others: "/transactions/airtime/others",
    },
  },

  investments: "/investments",
  targetsavings: "/targetsavings",
  login: "/login",
  signup: "/signup",
  otp: "/otp",
  forgotPassword: "/forgot-password",
  home: "/",
};
