import { useSelector } from "react-redux";
import c from "./Output.module.css";
import { useCallback, useEffect, useState } from "react";
import api from "../../service/api";
const Output = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [data, setData] = useState([]);

  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/timelist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const d = await response.json();

      setData(d);
    } catch (e) {
      console.error(e);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callback();
  }, [callback]);

  console.log("tlist", data);
  return <div className={c.container}></div>;
};

export default Output;
