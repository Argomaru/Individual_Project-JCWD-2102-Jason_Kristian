import {
  Avatar,
  AvatarBadge,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  Icon,
  InputRightAddon,
  InputRightElement,
  FormHelperText,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import { GoEye, GoEyeClosed } from "react-icons/go";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userLogin } from "../../../redux/action/userLogin";

export default function Login() {
  const [passwordView, setPasswordView] = useState(false);
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // username: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("email harus diisi"),
      password: Yup.string()

        .required("password harus diisi")
        .min(8, "Password harus berisi minimal 8 karakter"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(userLogin(values, formik.setSubmitting));
    },
  });

  useEffect(() => {
    console.log(userSelector);
    if (userSelector?.id) {
      console.log("masuk if");
      router.push("/home");
    }
  }, [userSelector?.id]);
  return (
    <Flex minH={"100vh"} className="background">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading color={"#ffffff"} fontSize={"4xl"}>
            Sign in to your account
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          className="opa"
        >
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={formik.errors.email}>
              <FormLabel className="labelEmail">Username or Email</FormLabel>
              <Input
                required
                className="inputEmail"
                type="text"
                maxLength={"40"}
                onChange={(event) =>
                  formik.setFieldValue("email", event.target.value)
                }
              />

              <FormHelperText color="red">{formik.errors.email}</FormHelperText>
            </FormControl>
            <FormControl
              id="password"
              marginTop={"30px"}
              mb={"3px"}
              isInvalid={formik.errors.password}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  required
                  className="inputPass"
                  maxLength={"30"}
                  type={passwordView ? "text" : "password"}
                  onChange={(event) =>
                    formik.setFieldValue("password", event.target.value)
                  }
                />

                <InputRightAddon>
                  <Icon
                    fontSize="xl"
                    onClick={() => setPasswordView(!passwordView)}
                    as={passwordView ? GoEye : GoEyeClosed}
                    sx={{ _hover: { cursor: "pointer" } }}
                  />
                </InputRightAddon>
              </InputGroup>
              <FormHelperText color="#fc2403">
                {formik.errors.password}
              </FormHelperText>
            </FormControl>
            <Stack spacing={3}>
              {/* <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >aaaaaaaaaaa</Stack> */}
              <Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={formik.handleSubmit}
                >
                  Sign in
                </Button>
              </Stack>
              <Box mt={"30px"} display={"flex"}>
                <FormLabel>Didn't have an account yet?</FormLabel>
                <Flex className="Div">
                  {/* <FormLabel>Didn't have an account yet?</FormLabel> */}
                  <Link color={"blue.400"} href="/auth/register">
                    Create an Account
                  </Link>
                </Flex>
              </Box>
              <Box display={"flex"}>
                <FormLabel>Forget your password?</FormLabel>
                <Flex className="Div">
                  {/* <FormLabel>Didn't have an account yet?</FormLabel> */}
                  <Link color={"blue.400"} href="/auth/forgot">
                    Reset Password
                  </Link>
                </Flex>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
