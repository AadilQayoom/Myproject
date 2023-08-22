import React, { useEffect } from "react";
import {
  busTerminalsState,
  metaDataState,
  uniqueBusCitiesState,
} from "../../../recoil/atoms/common";

import { Base64 } from "js-base64";
import { useRecoilState } from "recoil";

export function RestoreAppDataFromOrToSession() {
  const [metaData, setMetaData] = useRecoilState(metaDataState);
  const [uniqueBusCities, setBusCities] = useRecoilState(uniqueBusCitiesState);
  const [busTerminals, setBusTerminals] = useRecoilState(busTerminalsState);

  let metaDataLocal, uniqueBusCitiesLocal, busTerminalsLocal;

  if (typeof window !== "undefined") {
    metaDataLocal = localStorage.getItem("metaData");
    uniqueBusCitiesLocal = localStorage.getItem("uniqueBusCities");
    busTerminalsLocal = localStorage.getItem("busTerminals");
  }

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        if (metaData) {
          localStorage.setItem(
            "metaData",
            Base64.encode(JSON.stringify(metaData))
          );
        }
        if (uniqueBusCities) {
          localStorage.setItem(
            "uniqueBusCities",
            Base64.encode(JSON.stringify(uniqueBusCities))
          );
        }
        if (busTerminals) {
          localStorage.setItem(
            "busTerminals",
            Base64.encode(JSON.stringify(busTerminals))
          );
        }
        if (!metaData && metaDataLocal) {
          setMetaData(JSON.parse(Base64.decode(metaDataLocal)));
          // console.log(
          //   "JSON.parse(Base64.decode(metaDataLocal)",
          //   JSON.parse(Base64.decode(metaDataLocal))
          // );
        }
        if (!uniqueBusCities && uniqueBusCitiesLocal) {
          setBusCities(JSON.parse(Base64.decode(uniqueBusCitiesLocal)));
        }
        if (!busTerminals && busTerminalsLocal) {
          setBusTerminals(JSON.parse(Base64.decode(busTerminalsLocal)));
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return null;
}
