import { flow, types } from "mobx-state-tree";
import { toast } from "react-toastify";
import { authService, localStoreService, userService } from "../services";
import { DateTime } from "../util/mst.date";

const accountDetail = types.model({
  accountNumber: types.maybe(types.string),
  accountType: types.maybe(types.string),
  userId: types.maybe(types.string),
  customerId: types.maybe(types.string),
  accountName: types.maybe(types.string),
  currency: types.maybe(types.string),
  addedDate: types.optional(
    types.union(DateTime, types.string, types.undefined),
    "",
    [null, undefined]
  ),
  modifiedDate: types.optional(
    types.union(DateTime, types.string, types.undefined),
    "",
    [null, undefined]
  ),
  passportPhoto: types.maybe(types.string),
  validIdType: types.maybe(types.string),
  validIdNumber: types.maybe(types.string),
  signature: types.maybe(types.string),
  validId: types.maybe(types.string),
  reference: types.maybe(types.string),
  bvN_Firstname: types.maybe(types.string),
  bvN_Lastname: types.maybe(types.string),
  jointAccountTransferLimit: types.maybe(types.number),
  sqNo: types.maybe(types.number),
  accountLinkCode: types.maybe(types.string),
  accountCategory: types.maybe(types.number),
  residence: types.maybe(types.string),
  rcNumber: types.maybe(types.string),
  incorpDate: types.maybe(types.string),
  tin: types.maybe(types.string),
  shortTitle: types.maybe(types.string),
});

export const CurrentUserStore = types
  .model("CurrentUserStore", {
    id: types.maybe(types.string),
    bvn: types.maybe(types.string),
    dateOfBirth: types.optional(
      types.union(DateTime, types.string, types.undefined),
      "",
      [null, undefined]
    ),

    email: types.maybe(types.string),
    phoneNumber: types.maybe(types.string),
    address: types.maybe(types.string),
    country: types.maybe(types.string),
    state: types.maybe(types.string),
    accountNumber: types.maybe(types.string),
    isActive: types.maybe(types.boolean),
    firstName: types.maybe(types.string),
    middleName: types.maybe(types.string),
    lastName: types.maybe(types.string),
    preferredName: types.maybe(types.string),
    sector: types.maybe(types.string),
    industry: types.maybe(types.string),
    nationality: types.maybe(types.string),
    gender: types.maybe(types.string),
    title: types.maybe(types.string),
    interestedInLoanProducts: types.maybe(types.string),
    maritalStatus: types.maybe(types.string),
    numberOfChildren: types.maybe(types.string),
    occupation: types.maybe(types.string),
    hobby: types.maybe(types.string),
    nokFirstName: types.maybe(types.string),
    nokMiddleName: types.maybe(types.string),
    nokFullName: types.maybe(types.string),
    nokLastName: types.maybe(types.string),
    nokAddress: types.maybe(types.string),
    nokPhoneNumber: types.maybe(types.string),
    nokRelationship: types.maybe(types.string),
    employmentStatus: types.maybe(types.string),
    employerName: types.maybe(types.string),
    employmentAddress: types.maybe(types.string),
    addressTown: types.maybe(types.string),
    addressState: types.maybe(types.string),
    addressLandmark: types.maybe(types.string),
    accountDetails: types.maybe(types.array(accountDetail)),
    addedDate: types.optional(
      types.union(DateTime, types.string, types.undefined),
      "",
      [null, undefined]
    ),
    modifiedDate: types.optional(
      types.union(DateTime, types.string, types.undefined),
      "",
      [null, undefined]
    ),
    sessionKey: types.maybe(types.string),
    passportPhoto: types.maybe(types.string),
    validIdType: types.maybe(types.string),
    validIdNumber: types.maybe(types.string),
    signature: types.maybe(types.string),
    validId: types.maybe(types.string),
    reference: types.maybe(types.string),
    bvN_Firstname: types.maybe(types.string),
    bvN_Lastname: types.maybe(types.string),
    residence: types.maybe(types.string),
    sideHustle: types.maybe(types.string),
    schoolName: types.maybe(types.string),
    trybersCode: types.maybe(types.string),
    courseDuration: types.maybe(types.string),
    level: types.maybe(types.string),
    instagramHandle: types.maybe(types.string),
    twitterHandle: types.maybe(types.string),
    videoUrl: types.maybe(types.string),
    branch: types.maybe(types.string),
    serviceProvider: types.maybe(types.string),
    trybersReferralCode: types.maybe(types.string),
    responseCode: types.maybe(types.string),
    responseDescription: types.maybe(types.string),
  })
  .actions((self) => ({
    login: flow(function* (nuban: string, password: string) {
      const { data }: { data: API.UserResponseModel } = yield authService.login(
        nuban,
        password
      );
      if (!data.sessionKey) {
        toast.warn("Invalid login details", {
          position: "top-center",
          delay: 0,
        });
      }
      if (data.responseCode !== "00") {
        toast.warn(data.responseDescription, {
          position: "top-center",
          delay: 0,
        });
      } else {
        self.firstName = data.firstName;
        self.dateOfBirth = data.dateOfBirth;
        localStoreService.saveAuthToken(data.sessionKey as string, {
          email: data.email as string,
          userId: data.id as string,
          name: data.firstName as string,
          nuban,
        });
      }
    }),
    updatedCurrentUser: flow(function* (email: string) {
      const {
        data,
      }: { data: API.UserResponseModel } = yield userService.getUserByEmail(
        email
      );
      self.firstName = data.firstName;
      self.dateOfBirth = data.dateOfBirth;
    }),
  }));
