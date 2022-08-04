import {
  Box,
  Text,
  Flex,
  Button,
  Icon,
  Tooltip,
  useDisclosure,
  useToast,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormHelperText,
  Stack,
  Link,
  Input,
  Avatar,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../lib/api";
import qs from "qs";
import * as yup from "yup";

function CommentComp(props, { username, content }) {
  const {
    cUsername,
    cComment,
    cPostId,
    cUserId,
    cId,
    cNumbofComment,
    cbAvatar,
  } = props;
  const userSelector = useSelector((state) => state.auth);
  const toast = useToast();
  const [editI, setEditI] = useState(false);

  // delete comment
  async function deleteComment() {
    try {
      let body = {
        number_of_comments: cNumbofComment - 1,
      };
      await axiosInstance.patch("/post/" + cPostId, qs.stringify(body));
      await axiosInstance.delete("/comment/" + cId);
      toast({
        title: "Success",
        description: "Success delete!",
        status: "success",
        isCloseable: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // edit comment
  const formik = useFormik({
    initialValues: {
      comment_onPost: `${cComment}`,
    },
    validationSchema: yup.object().shape({
      comment_onPost: yup.string().required("Edit Comment is required"),
    }),
    validateOnChange: false,
    onSubmit: async () => {
      const { comment_onPost } = formik.values;
      try {
        let body = {
          comment_onPost,
        };
        await axiosInstance
          .patch("/comment/" + cId, qs.stringify(body))
          .then(() => {
            setEditI(false);
            toast({
              title: "Comment has been updated",
              status: "success",
              isClosable: true,
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <>
      <Box marginY="1">
        <Flex>
          <Avatar src={cbAvatar} size={"xs"} marginLeft="2px" />
          <Text
            display="inline"
            fontWeight="bold"
            marginRight="2"
            marginLeft={"2px"}
          >
            {cUsername}
          </Text>
          <Text display="inline">{cComment}</Text>
        </Flex>
      </Box>
    </>
  );
}

export default CommentComp;
