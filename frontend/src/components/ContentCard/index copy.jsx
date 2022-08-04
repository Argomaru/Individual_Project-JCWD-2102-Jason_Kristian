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
import {
  BsFillHeartFill,
  BsHeart,
  BsFillChatLeftTextFill,
  BsThreeDotsVertical,
  BsHeartFill,
} from "react-icons/bs";
import Comment from "./comment/index";
import * as moment from "moment";
import qs from "qs";
import axios from "axios";
import { useFormik } from "formik";
import testing from "../../assets/images/kakap.jpg";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../configs/api";
import { axiosInstance } from "../../lib/api";
import LikePost from "./like/index";
import EditPost from "../../components/ContentCard/editPost";

function ContentCard(props) {
  const userSelector = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const render = useSelector((state) => state.automateRendering);
  const dispatch = useDispatch();
  const now = moment;
  const {
    username,
    location,
    caption,
    Date,
    numberOfLikes,
    numberOfComments,
    image_url,
    id,
    avatarImg,
    idLikeUser,
    idPostUser,
  } = props;

  const [comments, setComments] = useState([]);
  const [seeLike, setSeeLike] = useState([]);
  const [numberofComments, setNumberofComments] = useState(numberOfComments);
  const [commentIcon, setCommentIcon] = useState(false);
  const [likeIcon, setLikeIcon] = useState(idLikeUser);
  const [displaySaveInput, setDisplaySaveInput] = useState(false);
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [numLikes, setNumLikes] = useState(numberOfLikes);

  async function deletePost() {
    try {
      await axiosInstance.delete("/post/" + id);

      toast({
        title: "Success",
        description: "Success on deleting post",
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Error on deleting post",
        status: "error",
        isClosable: true,
      });
    }
  }

  async function editPost() {
    try {
      await axiosInstance.patch("/post/" + id);
      dispatch({
        type: "FETCH_RENDER",
        payload: { value: !render.value },
      });

      toast({
        title: "Success",
        description: "Success on editing post",
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Error on editing post",
        status: "error",
        isClosable: true,
      });
    }
  }
  // like;
  // const Likebutton = async () => {
  //   if (!likeIcon) {
  //     setNumLikes(numLikes + 1);
  //     setDisplayLikeInput(true);
  //     try {
  //       let body = {
  //         number_of_likes: numLikes + 1,
  //       };
  //       let body2 = {
  //         user_id: userSelector.id,
  //         post_id: id,
  //       };
  //       await axiosInstance.patch("/post/" + id, qs.stringify(body));
  //       await axiosInstance.post("/like", qs.stringify(body2));
  //       dispatch({
  //         type: "FETCH__RENDER",
  //         payload: { value: !render.value },
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     setNumLikes(numLikes - 1);
  //     setDisplayLikeInput(false);
  //     try {
  //       let body = {
  //         number_of_likes: numLikes - 1,
  //       };
  //       await axiosInstance.patch("/post/" + id, qs.stringify(body));
  //       await axiosInstance.delete(`/like/user/${userSelector.id}/post/${id}`);
  //       dispatch({
  //         type: "FETCH_RENDER",
  //         payload: { value: !render.value },
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  // comment
  // const formik = useFormik({
  //   initialValues: {
  //     comment_onPost: "",
  //   },
  //   onSubmit: async () => {
  //     const { comment_onPost } = formik.values;
  //     try {
  //       let body = {
  //         comment_onPost: comment_onPost,
  //         user_id: userSelector.id,
  //         post_id: id,
  //       };
  //       let body2 = {
  //         number_of_comments: numComments + 1,
  //       };
  //       setNumComments(numComments + 1);
  //       await axiosInstance.patch("/post/" + id, qs.stringify(body2));
  //       await axiosInstance.post("/comment", qs.stringify(body));
  //       dispatch({
  //         type: "FETCH_RENDER",
  //         payload: { value: !render.value },
  //       });
  //       toast({
  //         title: `Comment created`,
  //         status: "success",
  //         isClosable: true,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     formik.setSubmitting(false);
  //     formik.resetForm("comment_onPost", "");
  //   },
  // });

  // // fetchcomment;
  // async function fetchComment() {
  //   try {
  //     axiosInstance.get("/comment/post/" + id).then((res) => {
  //       setComments(res.data.result);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const renderComment = () => {
  //   return comments.map((val, index) => {
  //     return (
  //       <Comment
  //         key={index}
  //         cUsername={val.User?.username}
  //         cDate={val.createdAt}
  //         cComment={val.comment_onPost}
  //         cUserId={val.user_id}
  //         cPostId={val.post_id}
  //         cId={val.id}
  //         cNumComment={val.Post?.number_of_comments}
  //       />
  //     );
  //   });
  // };

  // useEffect(() => {
  //   fetchComment();
  // }, [render]);

  return (
    <Box
      borderWidth="1px"
      bg="#ffffff"
      borderRadius="lg"
      maxW="lg"
      paddingY="2"
      marginX="10px"
      mb="15px"
      boxShadow={"dark-lg"}
      borderColor="gray"
      mt="10px"
    >
      {/* Header */}
      <Box
        paddingX="3"
        paddingBottom="2"
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Box display={"flex"}>
          <Avatar src={avatarImg} size="md" />
          <Box marginLeft="4">
            <Text
              fontSize="md"
              fontWeight="bold"
              // defaultValue={userSelector?.username}
            >
              {username}
            </Text>

            <Text fontSize="sm" color="GrayText">
              {location}
            </Text>
          </Box>
        </Box>
        {/* icon buat nampilin edit dan delete di post */}

        {userSelector.username == username ? (
          <Box>
            <Menu>
              <MenuButton cursor="pointer" backgroundColor="white">
                <Icon as={BsThreeDotsVertical} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onOpen}>Edit</MenuItem>
                <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />

                  <ModalContent>
                    <EditPost
                      editCaption={caption}
                      editLocation={location}
                      editImageURL={image_url}
                      editId={id}
                      onClose={onClose}
                    />
                  </ModalContent>
                </Modal>

                {/* buat delete si post */}
                <MenuItem onClick={deletePost}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        ) : (
          <></>
        )}
      </Box>
      {/* Card Media/Content */}
      <Image minW="lg" src={`http://${image_url}`} />
      {/* Action Buttons */}
      <Box>
        <Box paddingX="3" paddingY="2" display="flex" alignItems="center">
          <Icon
            boxSize={6}
            onClick={() => Like()}
            as={likeIcon ? BsHeartFill : BsHeart}
            sx={{
              _hover: {
                cursor: "pointer",
              },
            }}
          />
          <Icon
            onClick={() => setCommentInput(true)}
            marginLeft="4"
            boxSize={6}
            as={BsFillChatLeftTextFill}
            sx={{
              _hover: {
                cursor: "pointer",
              },
            }}
          />
        </Box>
        {/* ini belom diisi */}
        {/* <Box paddingX="3" paddingY="2" display="flex" alignItems="center">
        {displaySaveInput ? (
          <Icon
          boxSize={6}
          onClick={() => setDisplaySaveInput(false)}
          as={FaBookmark}
          sx={{ _hover: { cursor: "pointer" } }}
          />
          ) : (
            <Icon
            boxSize={6}
            onClick={() => setDisplaySaveInput(true)}
            as={FaRegBookmark}
            sx={{ _hover: { cursor: "pointer" } }}
            />
            )}
          </Box> */}
      </Box>
      {/* Like Count */}
      <Box paddingX="3">
        <Text fontWeight="bold">
          <Link>{numLikes?.toLocaleString()} likes</Link>
        </Text>
      </Box>
      {/* Caption */}
      <Box paddingX="3">
        <Text display="inline" fontWeight="bold" marginRight="2">
          {username}
        </Text>
        <Text display="inline">{caption}</Text>
      </Box>
      {/* Comment Section */}

      <Box paddingX="3">
        <Text display="inline" fontWeight="bold" marginRight="2">
          {moment(Date).format("DD MM YYYY")}
        </Text>
      </Box>

      <FormControl>
        <InputGroup size="sm">
          <Input
            id="inputComment"
            onChange={(event) =>
              formik.setFieldValue("comment_post", event.target.value)
            }
            border="0"
            maxLength="300"
            type="text"
            // value={formik.values.comment_onPost}
            placeholder="Add Your Comment"
          />
        </InputGroup>
      </FormControl>
    </Box>
  );
}
// }

export default ContentCard;
