import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginDataState } from "../../../recoil/atoms/common";
import CommonService from "../../../services/commonService";

const ResetMyAccountData = () => {
  const [loginData, setLoginData] = useRecoilState(loginDataState);
  useEffect(() => {
    resetData();
  }, []);

  const resetData = () => {
    const localLogindata = CommonService.getLocalEncryp("loginData");
    if (loginData && loginData.token && !localLogindata) {
      CommonService.setLocalEncryp("logindata", loginData);
    }

    if ((!loginData || !loginData.token) && localLogindata) {
      setLoginData(localLogindata);
    }
  };
};

export default ResetMyAccountData;
