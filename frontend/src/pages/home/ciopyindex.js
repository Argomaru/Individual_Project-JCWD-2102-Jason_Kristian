import { Flex, Spinner, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../lib/api";
import ContentCard from "../../components/ContentCard/index";
import NavBar from "../../components/navbar/index";
import { useDispatc } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import InfiniteScrollerWithReactInfiniteScroller from "../../components/Infinite/Infinite";
import React from "react";
export default function home() {
  const userSelector = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [ContentHome, setContentHome] = useState([]);
  const render = useSelector((state) => state.automateRendering);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const router = useRouter();
  const [loadCom, setLoadCom] = useState(1);
  const [loadPage, setLoadPage] = useState(1);
  const [renderHome, setRenderHome] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userSelector?.id) {
      setIsLoading(true);
      router.push("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [userSelector?.id]);
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
      console.log("123");
    }
  }
  console.log(ContentHome);


  
  await axiosInstance
  .get(path)
  .then((res) =>{
    const data = res.data.results;
    setContentHome([...ContentHome,...data]);
    setLoadPage(page+1)
    if(res.data.results.length==0){
      setHasMoreItems(false);
    }else{
      setHasMoreItems(true);
    }
  })

  const renderContentHome = () => {
    return ContentHome?.map((val) => {
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

  useEffect(() => {
    if (render.value != undefined) {
      fetchContentHome();
    }
  }, [render?.value]);

  return isLoading ? (
    <>
      <Spinner size={"lg"} />
    </>
  ) : (
    <>
      <NavBar />
      <InfiniteScroll pageStart={1}>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          className="bghome"
          direction={"column"}
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
        </Flex>
      </InfiniteScroll>
    </>
  );
}
