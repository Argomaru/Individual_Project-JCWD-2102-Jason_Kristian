import {
  FormControl,
  Stack,
  FormLabel,
  Input,
  Flex,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "../../lib/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function EditAvatar() {
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth);
  const inputFileRef = useRef(null);

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      caption: "",
      location: "",
    },
    onSubmit: async () => {
      const formData = new FormData();
      const { caption, location, avatar_url } = formik.values;

      formData.append("caption", caption);
      formData.append("location", location);
      formData.append("UserId", userSelector.id);
      formData.append("image", selectedFile);
      formData.append("avatarImg", avatar_url);

      try {
        await axiosInstance
          .post("/user/" + userSelector.id, formData)
          .then(() => {
            toast({
              title: "Post added! Success!!",
              status: "success",
              isClosable: true,
            });
          });
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

  async function uploadProfilePict() {
    axiosInstance.patch(`/user/uploadProfilePicture/${userSelector.id}`, {});
  }
  return (
    <Box backgroundColor={"#FAFAFA"}>
      <Flex minH={"80vh"} align={"center"} justify={"center"}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type={"file"}
              display={"none"}
              onChange={handleFile}
              accept={"image/png, image/jpg, image/jpeg, image/gif"}
              ref={inputFileRef}
            ></Input>
            <Button
              colorScheme={"blue"}
              onClick={() => inputFileRef.current.click()}
            >
              Upload Image
            </Button>
          </FormControl>

          <FormControl align={"center"}>
            <Button colorScheme={"green"} onClick={uploadProfilePict}>
              Submit
            </Button>
          </FormControl>
        </Stack>
      </Flex>
    </Box>
  );
}
