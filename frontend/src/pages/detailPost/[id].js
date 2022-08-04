import {
  Box,
  Center,
  Test,
  Heading,
  Avatar,
  Spinner,
  Page,
  Flex,
  Button,
} from "@chakra-ui/react";
import ContentCard from "../../components/ContentCard/index";
import NavBar from "../../components/navbar/index";
// import ContentCard from "../ContentCard/index";
import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import jsCookie from "js-cookie";

export default function detailPost({ postData }) {
  // const url = "http://localhost:3000" + router.pathname;
  console.log(postData);
  return (
    <Box>
      {/* <Page
        title={"Post from " + postData.User?.username}
        description={postData?.caption}
        image={`${postData?.image_url}`}
        url={url}
        type="website"
      > */}
      <NavBar />
      <Flex align={"center"} justify={"center"}>
        <ContentCard
          username={postData?.User?.username}
          full_name={postData?.User?.full_name}
          avatarImg={postData?.User?.avatar_url}
          location={postData?.location}
          caption={postData?.caption}
          image_url={postData?.image_url}
          likes={postData?.number_of_likes}
          createddate={postData?.createdAt}
          // liked={postData?.liked}
          id={postData?.id}
          userId={postData?.User?.id}
        />
      </Flex>
      {/* </Page> */}
    </Box>
  );
}

//ini buat ssr
export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await axios.get(`http://localhost:2000/post/${id}`);

  const postData = res.data.result;

  return {
    props: {
      postData,
    },
  };
}
