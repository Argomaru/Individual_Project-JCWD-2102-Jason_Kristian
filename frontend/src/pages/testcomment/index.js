import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../lib/api";
import ContentCard from "../../components/ContentCard/index";
import NavBar from "../../components/navbar/index";
import { useDispatc } from "react-redux";
import Comment from "../../components/ContentCard/comment/index";
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
        // setContentHome(res.data.result);
        const temp = res.data.result;
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
        <Comment />
      </Flex>
    </>
  );
}
