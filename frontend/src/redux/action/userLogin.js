import jsCookie from "js-cookie";
import { axiosInstance } from "../../lib/api";
import auth_types from "../reducers/types/auth";
import qs from "qs";

export function userLogin(values, setSubmitting) {
  return async function (dispatch) {
    try {
      let body = {
        username: values.email,
        email: values.email,
        password: values.password,
      };
      // console.log(qs.stringify(body));
      const res = await axiosInstance.post("/user/login", qs.stringify(body));
      console.log("login");
      console.log(res);
      // const userData = res.data.result;
      const userData = res.data.result.user;
      const token = res.data.result.token;

      if (!res.data.result) {
        throw new Error("User not found");
      }

      console.log(userData);

      // if (userData.password !== values.password) {
      //   throw new Error("Wrong password");
      // }

      // const userData = user;
      // const stringifiedUserData = JSON.stringify(userData);

      console.log(userData);

      jsCookie.set("auth_token", token);
      dispatch({
        type: auth_types.AUTH_LOGIN,
        payload: userData,
      });

      setSubmitting(false);
    } catch (err) {
      console.log(err);

      setSubmitting(false);
    }
  };
}
