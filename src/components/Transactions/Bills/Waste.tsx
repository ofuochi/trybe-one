
import { useEffect, useState } from "react";
import * as Yup from "yup";

import api from "../../../config/api.config";
import { localStoreService } from "../../../services";

const validationSchema = Yup.object().shape({
  walletNumber: Yup.string().required("required"),
  mobileNo: Yup.string().required("required"),
  airtimeAmount: Yup.number().integer().min(1).required("required"),
  pin: Yup.string().required("required"),
  serviceId: Yup.string().required("required"),
  remarks: Yup.string().max(20),
});

export const Waste = () => {
  const [userAccts, setUserAccts] = useState<API.UserNubanDto[] | undefined>();
  useEffect(() => {
    const currentUser = localStoreService.getCurrentUser();
    api
      .get<API.UserResponseModel>(
        `/User/GetUserByEmail?email=${currentUser?.email}`,
        { cache: { clearOnStale: true } }
      )
      .then(({ data }) => setUserAccts(data.accountDetails));
  }, []);
  const sessionID = localStoreService.getAuthToken() || undefined;
  const initialValues: API.CreditSwitchVendAirtimeRequestDto = {
    sessionID,
    appId: 1,
    walletNumber: "",
    mobileNo: "",
    airtimeAmount: "",
    pin: "",
    serviceId: "",
  };

  return (
    <div className="mt-3">
    
    </div>
  );
};
