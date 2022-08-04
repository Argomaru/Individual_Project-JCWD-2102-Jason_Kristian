import {
  Flex,
  Box,
  Icon,
  Progress,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormHelperText,
  Toast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { regRegiter } from "../../../redux/action/userRegister";
import { useRouter } from "next/router";

export default function Register() {
  const userSelector = useSelector((state) => state.auth);
  const router = useRouter();

  // useEffect(() => {
  //   if (userSelector?.id) {
  //     console.log("masuk if");
  //     router.push("/home");
  // }
  // }, [userSelector?.id]);

  // useEffect(() => {
  //   console.log(userSelector.id);
  // }, []);

  YupPassword(yup);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const formik = useFormik(
    {
      initialValues: {
        full_name: "",
        username: "",
        password: "",
        email: "",
        password2: "",
      },
      validationSchema: yup.object().shape({
        email: yup
          .string()
          .email("email")
          .required("tolong isi emailnya")
          .matches(/@/, "Please inclue an '@' in the email address"),
        full_name: yup.string().required("isi nama anda"),
        username: yup.string().required("isi username anda"),
        password: yup
          .string()
          .required("isi password anda")
          .min(8, "Contain 8 Characters")
          .minLowercase(1, "need at least 1 small character")
          .minUppercase(1, "need at least 1 big character")
          .minSymbols(1, "need at least 1 symbol"),
        // .matches(
        //   /\w*[a-z]\w*/,
        //   "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character"
        // ) // lower
        // .matches(
        //   /\w*[A-Z]\w*/,
        //   "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character"
        // ) // upper
        // .matches(
        //   /\d/,
        //   "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character"
        // ) //must have number
        // .matches(
        //   /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        //   "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character"
        // ), //special char

        password2: yup
          .string()
          .oneOf([yup.ref("password")], "Passwords do not match")
          .required("Confirm password is required")

          .minLowercase(1, "need at least 1 small character")
          .minUppercase(1, "need at least 1 big character")
          .minSymbols(1, "need at least 1 symbol")
          .min(8, "need 8 charcters"),
      }),
      // onSubmit: (values) => {
      //   alert("udeh nih");
      //   // formik.values
      // },
      validateOnChange: false,
      onSubmit: async (values) => {
        dispatch(regRegiter(values, formik.setSubmitting));
        toast({
          title: "Account created",
          description: "Adasas",
          status: "success",
          isClosable: true,
        });
      },
    },
    useEffect(() => {
      if (userSelector?.id) {
        router.push("/home");
      }
    }, [userSelector?.id])
  );

  return (
    <Flex
      minH={"100vh"}
      // minW={"100vh"}
      align={"center"}
      justify={"center"}
      className="registerbg"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} color={"#ffffff"}>
            Register your Account here!
          </Heading>
          <Text fontsize={"lg"} color={"#ffffff"}>
            {formik.values.username}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          className="opareg"
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Fullname</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => {
                      formik.setFieldValue("full_name", e.target.value);
                    }}
                  />
                  <FormHelperText>{formik.errors.full_name}</FormHelperText>
                </FormControl>
              </Box>
              {/* <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box> */}
            </HStack>
            <FormControl id="username" isRequired>
              <FormLabel>username</FormLabel>
              <Input
                type="text"
                onChange={(e) => {
                  formik.setFieldValue("username", e.target.value);
                }}
              />
              <FormHelperText>{formik.errors.username}</FormHelperText>
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
              />
              <FormHelperText>{formik.errors.email}</FormHelperText>
            </FormControl>

            {/* First Password */}
            <FormControl
              id="password"
              isRequired
              isInvalid={formik.errors.password}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  maxLength={"30"}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    formik.setFieldValue("password", e.target.value);
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                    sx={{ _hover: { cursor: "pointer" } }}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.values.password.length > 7 &&
              formik.values.password.match(
                /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])(?=.{8,})/
              ) ? (
                <>
                  <Progress value={100} size="xs" colorScheme="green" />
                  <Text fontWeight="semibold" color="blue">
                    Strong
                  </Text>
                </>
              ) : formik.values.password.length > 5 &&
                formik.values.password.match(
                  /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])|(?=.[a-z])(?=.[A-Z])(?=.[!@#\$%\^&\*])/
                ) ? (
                <>
                  <Progress value={75} size="xs" colorScheme="yellow" />
                  <Text fontWeight="semibold" color="#green">
                    Medium
                  </Text>
                </>
              ) : formik.values.password.length > 4 &&
                formik.values.password.match(
                  /^(?=.[a-z])(?=.[A-Z])|(?=.[a-z])(?=.[A-Z])(?=.*[0-9])/
                ) ? (
                <>
                  <Progress value={50} size="xs" colorScheme="red" />
                  <Text fontWeight="semibold" color="orange">
                    Weak
                  </Text>
                </>
              ) : formik.values.password.length > 0 &&
                formik.values.password.match(/^(?=.*[a-z])/) ? (
                <>
                  <Progress value={25} size="xs" colorScheme="red" />
                  <Text fontWeight="semibold" color="red">
                    Very weak
                  </Text>
                </>
              ) : (
                <></>
              )}
              <FormHelperText color="red">
                {formik.errors.password}
              </FormHelperText>
            </FormControl>
            {/* Second Password */}
            <FormControl id="password2" isInvalid={formik.errors.password}>
              <FormLabel>Confirm your Password</FormLabel>
              <InputGroup>
                <Input
                  required
                  maxLength={"30"}
                  type={showPassword ? "text" : "password"}
                  onChange={(event) =>
                    formik.setFieldValue("password2", event.target.value)
                  }
                />
                <InputRightElement>
                  <Icon
                    fontSize="xl"
                    onClick={() => setShowPassword(!showPassword)}
                    as={showPassword ? ViewIcon : ViewOffIcon}
                    sx={{ _hover: { cursor: "pointer" } }}
                  />
                </InputRightElement>
              </InputGroup>
              <FormHelperText color="red">
                {formik.errors.password2}
              </FormHelperText>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={formik.handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} href="/auth/login">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
