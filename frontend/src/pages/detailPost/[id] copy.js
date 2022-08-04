import {
  Box,
  Center,
  Test,
  Heading,
  Avatar,
  Spinner,
  Center,
  Button,
} from "@chakra-ui/react";
import ContentCard from "../ContentCard";
import NavBar from "../navbar/index";
// import ContentCard from "../ContentCard/index";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";1
import jsCookie from "js-cookie";

export default function detailPost({ postData }) {
  const router = useRouter();
  console.log(postData);
  console.log("fill me");
  const userSelector = useSelector((state) => state.auth);
  let likepost = false;
  const check = postData.Likes.find((a) => {
    return a.user_id == userSelector.id;
  });
  if (!check) {
    like = false;
  } else {
    like = true;
  }
  const url = "http://localhost:3000" + id;

  return (
    <Page title={"Post from " = postData.User?.username}>

    <NavBar/>
    <Box>
      <Center>
        <ContentCard
          username={postData.User?.username}
          caption={postData?.caption}
          image_url={postData.image_url}
          location={postData.location}
          likes={postData.number_of_likes}
          id={postData?.id}
        number_of_likes={postData?.number_of_likes}
            number_of_comments={postData?.number_of_comments}
          liked={postData.liked}
          avatarImg={postData.avatar_url}
          
          />
      </Center>
    </Box>
          </Page>
  );
}

//ini buat ssr
export async function ServerSideRenderProp(context) {
  const { id } = context.params;

  const res = await axios.get(`http://localhost:2000/post/postId/${id}`);

  //   const postData = res.data;

  return {
    props: {
      postData: res.data.results[0],
    },
  };
}
