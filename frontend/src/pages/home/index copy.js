import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../lib/api";
import ContentCard from "../../components/ContentCard/index";
import NavBar from "../../components/navbar/index";
import { useDispatch } from "react-redux";
import { HomeUnverified } from "../../components/verification/homeprotect";
import { NavbarUnverified } from "../../components/verification/navbarprot";
export default function home() {
  const userSelector = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [ContentHome, setContentHome] = useState([]);
  const render = useSelector((state) => state.automateRendering);
  const router = useRouter();
  useEffect(() => {
    if (!userSelector?.id) {
      setIsLoading(true);
      router.push("/auth/login");
    }
  }, [userSelector?.id]);

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
  console.log(ContentHome);

  const renderContentHome = () => {
    return ContentHome.map((val, index) => {
      return (
        <div key={index}>
          <ContentCard
            username={val.User?.username}
            location={val.location}
            // Date={val.createdAt}
            image_url={val.image_url}
            caption={val.caption}
            numberOfLikes={val.number_of_likes}
            numberOfComments={val.number_of_comments}
            id={val.id}
          />
        </div>
      );
    });
  };

  useEffect(() => {
    fetchContentHome();
  }, [render]);

  //   return (
  //     <>
  //       {isLoading ? (
  //         <>
  //           <Spinner size={"lg"} />{" "}
  //         </>
  //       ) : (
  //         <>
  //           <NavBar />
  //           <Flex>{userSelector.is_verified == 0 ? <></> : <></>}</Flex>

  //           <Flex wrap="wrap">
  //             <HomeUnverified />
  //           </Flex>
  //         </>
  //       )}
  //     </>
  //   );
  // }

  // {
  /* {
      isLoading ? 
      <>
      <Spinner size={"lg"} />
    </>
   : (
    <>
      <NavBar />

      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        className="bghome"
        direction={"column"}
        >
      <Flex wrap={"wrap"} justify={"center"}>  
      <HomeUnverified/>
        </Flex>
    <Flex wrap={"wrap"}>
      {
        isLoadingPost ?
        <Box>
          <Spinner />
        </Box> :
        <>
        {renderContentHome()}
        </>
      }
    </Flex>
    </>
    }
        {/* {ContentHome.map((val, index) => {
          {userSelector.is_verified == 0 ? 
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
          })} */
}
{
  /* </Flex>
}

} */
}
