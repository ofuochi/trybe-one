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
    bills: {
      index: "/transactions/bills",
      waste: "/transactions/bills/waste",
      electricity: "/transactions/bills/electricity",
    },
    statement: {
      index: "/transactions/statement",
    },
  },

  investments: "/investments",
  spendTracker: "/spendingtracker",
  targetSavings: {
    index: "/target-savings",
    tokenizeCard: "/target-savings/tokenize-card",
    createTargetSaving: "/target-savings/create-target-saving",
  },
  //accounts
  accounts: "/accounts",
  
  card: {
    tokenize: "/tokenize-card",
  },
  login: "/login",
  signup: "/signup",
  otp: "/otp",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  home: "/",
  learning: "/learning",
};
