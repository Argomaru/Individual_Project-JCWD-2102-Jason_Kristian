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
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
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
  const [likeInput, setLikeInput] = useState(idLikeUser);
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [numberofLikes, setNumberofLikes] = useState(numberOfLikes);

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
  const Likebutton = async () => {
    if (!likeInput) {
      setNumberofLikes(numberofLikes + 1);
      setLikeInput(true);
      try {
        let body = {
          number_of_likes: numberofLikes + 1,
        };
        let body2 = {
          user_id: userSelector.id,
          post_id: props.id,
        };

        await axiosInstance.patch("/post/" + id, qs.stringify(body));
        await axiosInstance.post("/like", qs.stringify(body2));
        dispatch({
          type: "FETCH__RENDER",
          payload: { value: !render.value },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setNumberofLikes(numberofLikes - 1);
      setLikeInput(false);
      try {
        let body = {
          number_of_likes: numberofLikes - 1,
        };
        await axiosInstance.patch("/post", qs.stringify(body));
        await axiosInstance.delete(`/like/user/${userSelector.id}/post/${id}`);
        dispatch({
          type: "FETCH_RENDER",
          payload: { value: !render.value },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // comment
  //

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
      <Image minW="lg" src={`http://${image_url}`} />
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
          <Link>{numberofLikes?.toLocaleString()} likes</Link>
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
