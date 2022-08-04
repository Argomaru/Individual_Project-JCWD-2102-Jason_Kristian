import {
  Box,
  Container,
  Flex,
  Avatar,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  useColorModeValue,
  Option,
  Stack,
  HStack,
  color,
  Text,
  Center,
  Icon,
  FormControl,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalProfPicture,
  ModalBody,
  ModalFooter,
  Select,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
// import ContentCard from "../../components/ContentCard/index";
import NavBar from "../../components/navbar";
import EditAvatar from "../../components/editAvatar";
import { axiosInstance } from "../../lib/api";
import Image from "../../assets/images/azazel.png";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { userUpdate } from "../../redux/action/userUpdate";
import qs from "qs";
// import EditAvatar from "../../components/editAvat ar";

export default function editprofile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  // const {
  //   editProfileusername,
  //   editPorfilefull_name,
  //   editProfileemail,
  //   editProfilebio,
  //   editProfilegender,
  //   editProfileId,
  // } = props;
  const userSelector = useSelector((state) => state.auth);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      username: `${userSelector.username}`,
      full_name: `${userSelector.full_name}`,
      email: `${userSelector.email}`,
      bio: `${userSelector.bio}`,
      gender: `${userSelector.gender}`,
      avatar_url: `${userSelector.avatar_url}`,
      id: userSelector.id,
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("isi username anda"),
      full_name: yup.string().required("isi full name anda"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(userUpdate(values, formik.setSubmitting));
    },
    onSubmit: async () => {
      const formData = new FormData();
      const { username, full_name, email, bio, gender, avatar_url } =
        formik.values;

      // formData.append("username", username);
      // formData.append("full_name", full_name);
      // formData.append("email", email);
      // formData.append("bio", bio);
      // formData.append("gender", gender);
      // // formData.append("username", );
      // formData.append("user_id", userSelector.id);

      try {
        await axiosInstance
          .patch("/user/" + userSelector.id, formData)
          .then(() => {
            toast({
              title: "Your Profile has been edited",
              status: "success",
              isClosable: true,
            });
          });

        console.log(formData);
      } catch (err) {
        console.log(err);

        toast({
          title: "Error! Please check your data again!",
          status: "error",
          isClosable: true,
        });
      }
    },
  });

  return (
    <>
      <NavBar />
      <Flex maxW="full" h="100vh">
        <Container justifyContent="center">
          {/* ini buat yang template kek kertas hvsnya */}
          <Flex
            wrap="wrap"
            justifyContent={"center"}
            alignContent={"center"}
            mt={3}
            borderWidth={8}

            // ini buat si border abu2
          >
            <Box width="400px" h="80px">
              {/* supaya kesamping pkae display flex */}
              <Box display={"flex"} mt={5}>
                <Avatar
                  size={"lg"}
                  src={
                    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5bf69ef5-0afc-41a5-a4f1-e81d62e253b4/d3db3f8-dcefe430-5a38-4769-82bb-0f2db980dc74.png/v1/fill/w_900,h_645,strp/tekken_6__azazel_by_rosasfantastica_d3db3f8-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQ1IiwicGF0aCI6IlwvZlwvNWJmNjllZjUtMGFmYy00MWE1LWE0ZjEtZTgxZDYyZTI1M2I0XC9kM2RiM2Y4LWRjZWZlNDMwLTVhMzgtNDc2OS04MmJiLTBmMmRiOTgwZGM3NC5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.W-UrpvETK4pcvNJNsnBqwLysiYXBCmSDv8zlXoXk-K0"
                  }
                />
                <Box ml="20px">
                  <Text>{userSelector.username}</Text>
                  <Link onClick={onOpen}>
                    <Text color="blue">Change your avatar</Text>
                  </Link>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Change your Avatar</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <EditAvatar />
                        {/* <HStack spacing="24px">
                          <Button
                            colorScheme={"blue"}
                            onClick={() => formik.handleSubmit}
                          >
                            Browse
                          </Button>

                          <Button
                            colorScheme={"green"}
                            onClick={() => formik.handleSubmit}
                          >
                            Submit
                          </Button>
                        </HStack> */}

                        {/* <Input
                          onChange={(e) => {
                            formik.setFieldValue("avatar_url", e.target.value);
                          }}
                          defaultValue={userSelector.full_name}
                        ></Input> */}
                      </ModalBody>
                      <ModalFooter>Close</ModalFooter>
                      {/* <ModalProfPicture onClose={onClose} /> */}
                    </ModalContent>
                  </Modal>
                </Box>
              </Box>
            </Box>
            <Box width="400px" h="10px"></Box>

            <Box width="200px" mt="20px">
              <Text>Name</Text>
              {/* {formik.values.full_name} */}
            </Box>
            <Box mt="20px" width="200px">
              <Input
                placeholder="User's Fullname"
                onChange={(e) => {
                  formik.setFieldValue("full_name", e.target.value);
                }}
                defaultValue={userSelector.full_name}
              ></Input>
              <Text fontSize="xs" color="gray">
                Help people find your account using a name that people recognize
                about you: whether your full name, nickname, or business name.
              </Text>
            </Box>

            <Box width="200px" mt="10px">
              <Text>Username</Text>{" "}
            </Box>
            <Box mt="10px" width="200px">
              <Input
                onChange={(e) => {
                  formik.setFieldValue("username", e.target.value);
                }}
                placeholder="User's Username"
                defaultValue={userSelector.username}
              ></Input>
            </Box>

            <Box width="200px" mt="10px">
              <Text>Bio</Text>
            </Box>
            {/* <Box width="400px" mt="10px"></Box> */}
            <Box mt="10px" width="200px">
              <Input
                onChange={(e) => {
                  formik.setFieldValue("bio", e.target.value);
                }}
                placeholder="User's Bio"
                defaultValue={userSelector.bio}
              ></Input>
              <Box mt="10px" width="200px">
                {" "}
              </Box>
              <Box width="200px" mt="10px">
                <Text color="gray">Personal Info</Text>
              </Box>
              <Box width="200px" mt="10px"></Box>
              <Box mt="10px" width="200px">
                <Text fontSize="xs" color="gray">
                  Help people find your account using a name that people
                  recognize about you: whether your full name, nickname, or
                  business name.
                </Text>
              </Box>
            </Box>

            <Box width="200px" mt="10px">
              <Text>E-Mail</Text>{" "}
            </Box>
            <Box mt="10px" width="200px">
              <FormControl>
                <Input
                  onChange={(e) => {
                    formik.setFieldValue("email", e.target.value);
                  }}
                  type="email"
                  placeholder="Your Email address"
                  defaultValue={userSelector.email}
                ></Input>
              </FormControl>
            </Box>

            <Box width="200px" mt="10px">
              <Text>Gender</Text>{" "}
            </Box>
            <Stack mt="10px" width="200px">
              <FormControl isInvalid={formik.errors.gender}>
                <Select
                  defaultValue={userSelector.gender}
                  onChange={(event) =>
                    formik.setFieldValue("gender", event.target.value)
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
            </Stack>

            <FormControl align={"center"}>
              <Flex mt="10px" align={"center"} justify={"center"}>
                <Button colorScheme={"blue"} onClick={formik.handleSubmit}>
                  Submit
                </Button>
              </Flex>
            </FormControl>
          </Flex>
        </Container>
      </Flex>
    </>
  );
}
