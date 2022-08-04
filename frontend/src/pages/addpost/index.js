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

export default function addpost() {
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();

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
      const { caption, location } = formik.values;

      formData.append("caption", caption);
      formData.append("location", location);
      formData.append("UserId ", 1);
      formData.append("image", selectedFile);

      try {
        await axiosInstance.post("/post", formData).then(() => {
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

          <FormControl>
            <FormLabel>Caption</FormLabel>
            <Input
              onChange={(e) => {
                formik.setFieldValue("caption", e.target.value);
              }}
            ></Input>
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              onChange={(e) => {
                formik.setFieldValue("location", e.target.value);
              }}
            ></Input>
          </FormControl>

          <FormControl align={"center"}>
            <Button colorScheme={"green"} onClick={formik.handleSubmit}>
              Submit
            </Button>
          </FormControl>
        </Stack>
      </Flex>
    </Box>
  );
}
