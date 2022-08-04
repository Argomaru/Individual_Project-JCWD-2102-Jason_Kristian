import jsCookie from "js-cookie";
import { axiosInstance } from "../../lib/api";
import auth_types from "../reducers/types/auth";
import qs from "qs";
import { useToast } from "@chakra-ui/react";

export function regRegiter(values, setSubmitting) {
  return async function (dispatch) {
    try {
      let body = {
        full_name: values.full_name,
        username: values.username,
        email: values.email,
        password: values.password,
      };

      // console.log(qs.stringify(body));
      const res = await axiosInstance.post(
        "/user/register",
        qs.stringify(body)
      );

      console.log(res);

      // const userData = res.data.result;
      const userData = res.data.result.user;
      const token = res.data.result.token;

      //   if (!res.data.result) {
      //     throw new Error("User not found");
      //   }

      // if (userData.password !== values.password) {
      //   throw new Error("Wrong password");
      // }

      // const userData = user;
      // const stringifiedUserData = JSON.stringify(userData);

      console.log(token);

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
