import { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Text,
  Icon,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  FormControl,
  FormLabel,
  Image,
  ModalContent,
  useDisclosure,
  useToast,
  Link,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  InputRightElement,
  Divider,
  Flex,
} from "@chakra-ui/react";
import moment from "moment";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../configs/api";
import { axiosInstance } from "../../lib/api";
import { useRouter } from "next/dist/client/router";
import { useFormik } from "formik";

export default function EditPost(props) {
  const { editCaption, editLocation, editId, editImageURL, onClose } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const userSelector = useSelector((state) => state.auth);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      caption: `${editCaption}`,
      location: `${editLocation}`,
    },
    onSubmit: async () => {
      const formData = new FormData();
      const { caption, location } = formik.values;
      try {
        let body = {
          caption,
          location,
        };
        await axiosInstance
          .patch("/post/" + editId, qs.stringify(body))
          .then(() => {
            toast({
              title: `Edit Succesfull!`,
              status: "success",
              isClosable: true,
            });
          });
      } catch (err) {
        console.log(err);

        toast({
          title: `Error! Please recheck your input.`,
          status: "error",
          isClosable: true,
        });
      }
    },
  });

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <>
      <ModalHeader>Edit your Post Content!</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box display={"flex"}>
          <Image src={`http://${editImageURL}`} />
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Caption</FormLabel>
            <Input
              onChange={(e) => {
                formik.setFieldValue("caption", e.target.value);
              }}
              placeholder="Edit youe caption"
              defaultValue={editCaption}
            ></Input>
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              onChange={(e) => {
                formik.setFieldValue("location", e.target.value);
              }}
              placeholder="Edit your location"
              defaultValue={editLocation}
            ></Input>
          </FormControl>
        </Box>

        <FormControl align={"center"}>
          <Flex mt="10px" align={"center"} justify={"center"}>
            <Button
              colorScheme={"blue"}
              onClick={() => {
                async function submit() {
                  await formik.handleSubmit();
                  onClose();
                }
                submit();
              }}
            >
              Submit Edit
            </Button>
          </Flex>
        </FormControl>
      </ModalBody>
    </>
  );
}
