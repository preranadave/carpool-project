import { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../../../Context/UserAuthContext";
const FetchUserData = () => {
  const [data, setData] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const { user } = useUserAuth();

  const fetchData =  () => {
    try {
      axios.get(`http://localhost:8000/Users`).then((response)=>{
        const current = response.data.filter((e) => e.UID === user.uid);
        setData(current || null);
      })
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  });
  // window.addEventListener("beforeunload", (event) => {
  //   fetchData();
  //   console.log("API call before page reload");
  // });

  // window.addEventListener("unload", (event) => {
  //   fetchData();
  //   console.log("API call after page reload");
  // });
  return {
    data,
    loading,
  };
};

export default FetchUserData;
