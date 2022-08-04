import {
  Avatar,
  Box,
  Button,
  Text,
  Flex,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AxiosInstance } from "axios";
import Image from "next/image";
import ohno from "../../assets/images/ohnocat.gif";
import qs from "qs";
import { useState } from "react";
import { useEffect } from "react";
import { axiosInstance } from "../../configs/api";

export default function UnverifiedPage() {
  const userSelector = useSelector((state) => state.auth);
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!userSelector?.id) {
      router.push("/home");
    } else {
      setIsLoading(false);
    }
  }, [useSelector?.id]);

  function resendVerification() {
    try {
      let body = {
        id: userSelector.id,
        username: userSelector.username,
        email: userSelector.email,
      };
      axiosInstance.post("/user/resend", qs.stringify(body));

      toast({
        title: "re-send email is successfull",
        description: "Email for verification has been send to to your email.",
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {isLoading ? (
        <>
          <Spinner /> loading
        </>
      ) : (
        <>
          <Box justifyContent={"center"}>
            <Text ml="700px" size={"lg"}>
              Please Verify your Account first!
            </Text>

            <Text mt="25px" ml="430px" size={"10px"}>
              Oh No! It appears that your account is still not verified, please
              click the button bellow to verifiedyour email!
            </Text>
            <Box ml="590px">
              <Image src={ohno}></Image>
            </Box>
            <Button
              background={"cyan"}
              mt="50px"
              ml="750px"
              onClick={() => resendVerification}
            >
              Send Email!
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
