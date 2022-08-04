import { Flex, Spinner, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../lib/api";
import ContentCard from "../../components/ContentCard/index";
import NavBar from "../../components/navbar/index";
import { useDispatc } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";
export default function home() {
  const userSelector = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [contentHome, setContentHome] = useState([]);
  const render = useSelector((state) => state.automateRendering);
  const router = useRouter();
  const [loadCom, setLoadCom] = useState(1);
  const [loadPage, setLoadPage] = useState(1);
  const [renderHome, setRenderHome] = useState();
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!userSelector?.id) {
  //     setIsLoading(true);
  //     router.push("/auth/login");
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [userSelector?.id]);
  // console.log("testing");
  async function fetchContentHome() {
    try {
      axiosInstance.get("/post/paging").then((res) => {
        console.log("fetchContent");
        console.log(res);
        setContentHome(res.data.results);
        const temp = res.data.results;
        console.log(temp);
      });
    } catch (err) {
      console.log(err);
    }
  }
  console.log(contentHome);

  const renderContentHome = () => {
    return contentHome?.map((val) => {
      const inputlike = false;
      const likeStatus = val.Likes?.find((a) => {
        return a?.UserId == userSelector.id;
      });

      if (!likeStatus) {
        inputlike = false;
      } else {
        inputlike = true;
      }
      console.log("ngetest render");
      return (
        // <div key={index}>
        <ContentCard
          username={val.User?.username}
          location={val.location}
          Date={val.createdAt}
          image_url={val.image_url}
          caption={val.caption}
          number_of_likes={val.number_of_likes}
          number_of_comments={val.number_of_comments}
          avatar_url={val.avatar_url}
          // avatarImg={`http://` + val.User?.image_url}
          id={val.id}
          // idLikeUser={inputlike}
          // idPostUser={val.user?.id}
        />
        // </div>
      );
    });
  };
  async function getMoreContent() {
    try {
      // if (loadCom > 0) {
      await axiosInstance
        .get(`/post/paging?page=${loadPage}&limit=5`)
        .then((res) => {
          setLoadPage(loadPage + 1);
          console.log(res.data.results);
          const data = res.data.results;

          if (data.length) {
            // setLoadPage(loadPage + 1);
            setContentHome([...contentHome, ...data]);
            setHasMore(true);
          } else {
            setHasMore(false);

            setLoadCom(0);
          }
        });
      // }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (!userSelector?.id) {
      setIsLoading(true);
      router.push("/auth");
    } else {
      setIsLoading(false);
    }
  }, [userSelector?.value]);

  return isLoading ? (
    <>
      <Spinner size={"lg"} />
    </>
  ) : (
    <>
      <NavBar />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        className="bghome"
        direction={"column"}
      >
        <InfiniteScroll
          pageStart={1}
          loadMore={getMoreContent}
          hasMore={hasMore}
        >
          {renderContentHome()}
          {/* {ContentHome.map((val, index) => {
          return (
            <div key={index}>
            <ContentCard
            username={val.User?.username}
            location={val.location}
            // Date={val.createdAt}
            caption={val.caption}
            numberOfLikes={val.number_of_likes}
            numberOfComments={val.number_of_comments}
            id={val.id}
              />
              </div>
              );
            })} */}
        </InfiniteScroll>
      </Flex>
    </>
  );
}
