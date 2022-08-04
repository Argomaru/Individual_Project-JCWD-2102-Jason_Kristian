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
import LikeUser from "./like/index";
import CommentComp from "./comment/index";
import { useRouter } from "next/router";

function ContentCard(props) {
  const userSelector = useSelector((state) => state.auth);
  const router = useRouter();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenLike,
    onOpen: onOpenLike,
    onClose: onCloseLike,
  } = useDisclosure();
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
    avatar_url,
    idLikeUser,
    idPostUser,
  } = props;
  const [loadComment, setLoadComment] = useState(1);
  const [comments, setComments] = useState([]);
  const [seeLike, setSeeLike] = useState([]);
  const [numbofComments, setNumbofComments] = useState(numberOfComments);
  const [commentIcon, setCommentIcon] = useState(false);
  const [saveInput, setSaveInput] = useState(false);
  const [likeInput, setLikeInput] = useState(idLikeUser);
  const [commentInput, setCommentInput] = useState(false);
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [numbofLikes, setNumbofLikes] = useState(numberOfLikes);
  const [newComment, setNewComment] = useState(false);

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

  // like;
  const Likebutton = async () => {
    if (!likeInput) {
      setNumbofLikes(numbofLikes + 1);
      setLikeInput(true);
      try {
        let body = {
          number_of_likes: numbofLikes + 1,
        };
        let body2 = {
          UserId: userSelector.id,
          post_id: id,
        };
        await axiosInstance.post("/like", qs.stringify(body2));
        await axiosInstance.patch("/post/" + id, qs.stringify(body));
        dispatch({
          type: "FETCH__RENDER",
          // payload: { value: !render.value },
        });
      } catch (err) {
        console.log(err);
        console.log("test1");
      }
    } else {
      setNumbofLikes(numbofLikes - 1);
      setLikeInput(false);
      try {
        let body = {
          numberOfLikes: numbofLikes - 1,
        };
        await axiosInstance.patch("/post/" + id, qs.stringify(body));
        await axiosInstance.delete(`/like/user/${userSelector.id}/post/${id}`);
        dispatch({
          type: "FETCH_RENDER",
          // payload: { value: !render.value },
        });
      } catch (err) {
        console.log(err);
        console.log("test2");
      }
    }
  };

  // comment
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: async () => {
      const { content } = formik.values;
      try {
        content;
        let body = {
          content: content,
          UserId: userSelector.id,
          PostId: id,
        };
        let body2 = {
          number_of_comments: numberOfComments + 1,
        };

        setNumbofComments(numbofComments + 1);
        const newcom = await axiosInstance.post("/comment", qs.stringify(body));
        await axiosInstance.patch("/post/" + id, qs.stringify(body2));
        // dispatch({
        //   type: "FETCH_RENDER",
        //   payload: !render.value,
        // });

        setComments([newcom.data.Comment, ...comments]);

        setNewComment(!newComment);
        toast({
          title: `Comment send`,
          status: "success",
          isClosable: true,
        });
      } catch (err) {
        console.log(err);
      }
      formik.setSubmitting(false);
      formik.resetForm("comment_post", "");
    },
  });

  // ---------- Fetching Comments ---------- //
  // async function fetchComment() {
  //   try {
  //     await axiosInstance.get(`/comment/post/${id}`).then((res) => {
  //       setComments(res.data.result);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const fetchFirstComment = async () => {
    const res = await axiosInstance.get(
      `/comment/post/${id}?page=${loadComment}&limit=5`
    );

    const OldComment = res.data.result;
    setLoadComment(loadComment);
    setComments([...OldComment]);

    // alert(comments);
    // console.log(startComment);
    // alert(id);
    // console.log(comments.length);
  };

  const fetchComment = async () => {
    const res = await axiosInstance.get(
      `/comment/post/${id}?page=${loadComment}&limit=5`
    );

    const OldComment = res.data.result;
    setLoadComment(loadComment + 1);
    setComments([...comments, ...OldComment]);

    // alert(comments);
    // console.log(startComment);
    // alert(id);
    // console.log(comments.length);
  };
  const renderComment = () => {
    return comments.map((val, index) => {
      return val.PostId == id ? (
        <CommentComp
          key={index}
          cbAvatar={val?.User?.avatar_url}
          cUsername={val.User?.username}
          cDate={val.createdAt}
          cComment={val.content}
          cUserId={val.UserId}
          cPostId={val.PostId}
          cId={val.id}
          cNumbofComment={val.Post?.number_of_comments}
        />
      ) : null;
    });
  };

  useEffect(() => {
    fetchFirstComment();
    // setLoadComment(2);
  }, []);

  useEffect(() => {
    // fetchComment();
    // setLoadComment(2);
  }, [newComment]);

  useEffect(() => {
    // fetchLikePost();
    setNumbofLikes(numberOfLikes);
    setLikeInput(idLikeUser);
    // fetchComment();
  }, [idLikeUser]);
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
          <Avatar src={userSelector?.avatar_url} size="md" />
          <Box marginLeft="4">
            <Text
              fontSize="md"
              fontWeight="bold"
              // defaultValue={userSelector?.username}
            >
              {userSelector.username}
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
                {/* <Text>adasdasdad</Text> */}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onOpenEdit}>Edit</MenuItem>
                <Modal size="4xl" isOpen={isOpenEdit} onClose={onCloseEdit}>
                  <ModalOverlay />

                  <ModalContent>
                    <EditPost
                      editCaption={caption}
                      editLocation={location}
                      editImageURL={image_url}
                      editId={id}
                      onClose={onCloseEdit}
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
      <Image
        minW="lg"
        src={`http://${image_url}`}
        onClick={() => {
          router.push(`/detailPost/${id}`);
        }}
      />

      {/* Action Buttons */}
      <Box>
        <Box paddingX="3" paddingY="2" display="flex" alignItems="center">
          <Icon
            boxSize={6}
            onClick={() => Likebutton()}
            as={likeInput ? BsHeartFill : BsHeart}
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
      </Box>
      {/* Like Count */}
      <Box paddingX="3">
        <Text fontWeight="bold">
          <Link onClick={onOpenLike}>
            {numbofLikes?.toLocaleString()} likes
          </Link>
        </Text>
      </Box>
      {/* Caption */}
      <Box paddingX="3">
        <Text display="inline" fontWeight="bold" marginRight="2">
          {username}
        </Text>
        <Text display="inline">{caption}</Text>
      </Box>

      <Box paddingX="3">
        <Text display="inline" fontWeight="bold" marginRight="2">
          {moment(Date).format("DD MM YYYY")}
        </Text>
      </Box>

      <Modal
        isOpen={isOpenLike}
        onClose={onCloseLike}
        scrollBehavior={scrollBehavior}
        size="xs"
      ></Modal>

      {/* Comment*/}
      <Box>
        <Text>
          <Box>{renderComment()}</Box>
          {/* {!commentInput ? (
            <Link
              onClick={() => setCommentInput(true)}
              style={{ textDecoration: "none" }}
            >
              load {numbofComments?.toLocaleString()} comments
            </Link>
          ) : (
            <Link
              onClick={() => setCommentInput(false)}
              style={{ textDecoration: "none" }}
            >
              close {numbofComments?.toLocaleString()}
            </Link>
          )} */}
        </Text>
        {/* {!commentInput ? null : (
          <>
            <Box>{renderComment()}</Box>
            <Button onClick={fetchComment}>Load More Comments</Button>
          </>
        )} */}
      </Box>

      <FormControl>
        <InputGroup size="sm">
          <Input
            id="inputComment"
            onChange={(event) =>
              formik.setFieldValue("content", event.target.value)
            }
            border="0"
            maxLength="300"
            type="text"
            value={formik.values.content}
            placeholder="Add Your Comment"
          />
          <Button
            onClick={formik.handleSubmit}
            disabled={formik.values.content.length > 0 ? false : true}
          >
            Send
          </Button>
        </InputGroup>
      </FormControl>
    </Box>
  );
}
// }

export default ContentCard;
