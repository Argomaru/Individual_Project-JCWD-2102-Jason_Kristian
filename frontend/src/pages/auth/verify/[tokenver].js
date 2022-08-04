import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import {
  GoVerified,
  GoThumbsup,
  GoThumbsdown,
  GoUnverified,
} from "react-icons/go";
import { axiosInstance } from "../../../lib/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
export default function verifyAccount() {
  const [verified, setverified] = useState(false);
  const router = useRouter();
  const { tokenver } = router.query;
  const res = axiosInstance.patch("/verify/" + tokenver);

  useEffect(() => {
    async function updateVer() {
      const res = await axiosInstance.patch("/user/verify/" + tokenver);
      if (res.data) {
        const success = res.data.success;
        console.log(success);
        setverified(success);
      }
    }
    if (tokenver) {
      updateVer();
    }
  }, [router.isReady]);

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          // w={"full"}
          maxW={"2x1"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            {verified ? (
              <>
                Your Account Has Been Verified!
                <Icon paddingLeft={2} boxSize={8} as={GoVerified} />
                <Icon paddingLeft={2} boxSize={8} as={GoThumbsup} />
              </>
            ) : (
              <>
                Invalid Token
                <Icon paddingLeft={2} boxSize={8} as={GoUnverified} />
                <Icon paddingLeft={2} boxSize={8} as={GoThumbsdown} />
              </>
            )}
          </Heading>
        </Stack>
      </Flex>
      :<Spinner></Spinner>
    </>
  );
}

// import { Flex, Spinner } from "@chakra-ui/react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { axiosInstance } from "../../lib/api";
// import ContentCard from "../../components/ContentCard/index";
// import NavBar from "../../components/navbar/index";
// import { useDispatc } from "react-redux";

// export default function home() {
//   const userSelector = useSelector((state) => state.auth);
//   const [isLoading, setIsLoading] = useState(false);
//   const [ContentHome, setContentHome] = useState([]);
//   const render = useSelector((state) => state.automateRendering);
//   const router = useRouter();
//   useEffect(() => {
//     if (!userSelector?.id) {
//       setIsLoading(true);
//       router.push("/auth/login");
//     }
//   }, [userSelector?.id]);

//   async function fetchContentHome() {
//     try {
//       axiosInstance.get("/post/paging").then((res) => {
//         console.log("fetchContent");
//         console.log(res);
//         setContentHome(res.data.results);
//         const temp = res.data.results;
//         console.log(temp);
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   console.log(ContentHome);

//   const renderContentHome = () => {
//     return ContentHome.map((val, index) => {
//       return (
//         <div key={index}>
//           <ContentCard
//             username={val.User?.username}
//             location={val.location}
//             // Date={val.createdAt}
//             image_url={val.image_url}
//             caption={val.caption}
//             numberOfLikes={val.number_of_likes}
//             numberOfComments={val.number_of_comments}
//             id={val.id}
//           />
//         </div>
//       );
//     });
//   };

//   useEffect(() => {
//     fetchContentHome();
//   }, [render]);

//   return isLoading ? (
//     <>
//       <Spinner size={"lg"} />
//     </>
//   ) : (
//     <>
//       <NavBar />

//       <Flex
//         minH={"100vh"}
//         align={"center"}
//         justify={"center"}
//         className="bghome"
//         direction={"column"}
//       >
//         {renderContentHome()}
//         {/* {ContentHome.map((val, index) => {
//           return (
//             <div key={index}>
//               <ContentCard
//                 username={val.User?.username}
//                 location={val.location}
//                 // Date={val.createdAt}
//                 caption={val.caption}
//                 numberOfLikes={val.number_of_likes}
//                 numberOfComments={val.number_of_comments}
//                 id={val.id}
//               />
//             </div>
//           );
//         })} */}
//       </Flex>
//     </>
//   );
// }
