import { axiosInstance } from "../../lib/api";
import qs from "qs";

export function userUpdate(values, setSubmitting) {
  return async function (dispatch) {
    try {
      let body = {
        full_name: values.full_name,
        username: values.username,
        bio: values.bio,
        email: values.email,
        gender: values.gender,
        avatar_url: values.avatar_url,
      };
      // console.log(body);
      await axiosInstance.patch(`/user/${values.id}`, qs.stringify(body));

      setSubmitting(false);
    } catch (err) {
      console.log(err);

      setSubmitting(false);
    }
  };
}

// const formik = useFormik({
//     intialValues: {
//       username: `${userSelector.username}`,
//       full_name: `${userSelector.full_name}`,
//       email: `${userSelector.email}`,
//       bio: `${userSelector.bio}`,
//       gender: `${userSelector.gender}`,
//       id: userSelector.id,
//     },
//     validationSchema: yup.object().shape({
//       username: yup.string().required("isi username anda"),
//       full_name: yup.string().required("isi full name anda"),
//     }),
//     validateOnChange: false,
//     onSubmit: (values) => {
//       dispatch(userUpdate(values, formik.setSubmitting));
//     },
//   });
