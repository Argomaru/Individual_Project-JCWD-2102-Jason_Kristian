import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";
import auth_types from "../redux/reducers/types/auth";
import { axiosInstance } from "../lib/api";
function AuthProvider({ children }) {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // const savedUserData = localStorage.getItem("user_data")
    const fetchdata = async () => {
      const userToken = jsCookie.get("auth_token");

      if (userToken) {
        const userResponse = await axiosInstance.get("/user/refresh-token", {
          headers: {
            authorization: userToken,
          },
        });

        dispatch({
          type: auth_types.AUTH_LOGIN,
          payload: userResponse.data.result.user,
        });
      }

      setIsAuthChecked(true);
    };

    fetchdata();
  }, []);

  if (!isAuthChecked) return <div>Loading...</div>;

  return children;
}

export default AuthProvider;
