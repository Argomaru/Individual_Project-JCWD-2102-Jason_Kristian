import {
  Box,
  Container,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Input,
  Image,
  useColorModeValue,
  Stack,
  color,
  Text,
  Center,
  Icon,
  FormControl,
  FormHelperText,
  LinkNext,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalProfPicture,
  ModalBody,
  ModalFooter,
  Select,
  FormLabel,
  Wrap,
  WrapItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
} from "@chakra-ui/react";
// import ContentCard from "../../components/ContentCard/index";
import NavBar from "../../components/navbar";
import image from "../../assets/images/azazel.png";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { AiFillSetting } from "react-icons/ai";
// import { useEffect } from "react";
import { axiosInstance } from "../../lib/api";
import { useState, useEffect } from "react";
axiosInstance;
export default function profileuser() {
  const userSelector = useSelector((state) => state.auth);
  const render = useSelector((state) => state.automaticRendering);
  const [postProfile, setPostProfile] = useState();
  useEffect(() => {
    async function myProfile() {
      try {
        const res = await axiosInstance.get("/post/" + id);
        const data = res.data.result;
        setPostProfile([...data]);
      } catch (error) {
        console.log(error);
      }
    }
    if (render?.value != undefined) {
      myProfile();
      console.log(userSelector);
    }
  }, [render]);

  return (
    <>
      <NavBar />
      <Flex justifyContent="center">
        <Box justifyContent="center" minW="990px" mt="10px">
          <Box display="flex">
            <Avatar size="2xl" src={userSelector.avatar_url} mr={10} />
            <Box>
              <Text fontSize={"xl"}>{userSelector.username}</Text>
              <Text>{userSelector.email}</Text>
              <Text>{userSelector.full_name}</Text>
              <Text>My Bio: {userSelector.bio}</Text>
            </Box>
            <Link href="/editprofile">
              <HStack>
                <Box ml="20px" boxShadow={"dark-lg"}>
                  <Button>
                    <Icon color="black" as={AiFillSetting} />
                    Edit your Profile
                  </Button>
                </Box>
              </HStack>
            </Link>
          </Box>
          <Box>
            <Tabs align="center">
              <TabList align="center">
                <Tab>Posted</Tab>
                <Tab>Liked</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem w="100%" h="300px" bg="blue.500" />
                    <GridItem w="100%" h="300px" bg="blue.500" />
                    <GridItem w="100%" h="300px" bg="blue.500" />
                    <GridItem w="100%" h="300px" bg="blue.500" />
                    <GridItem w="100%" h="300px" bg="blue.500" />
                  </Grid>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Flex>
      {/* <Center>
        <Grid templateColumns="repeat(3, 1fr)" gap={2} gridAutoRows>
          {postProfile ? (
            <>
              {postProfile.map((val, idx) => {
                return (
                  <Image
                    src={val.image_url}
                    boxSize="md"
                    objectFit={"cover"}
                    transition="0.4s ease-in-out"
                    _hover={{
                      filter: "auto",
                      brightness: "40%",
                    }}
                  />
                );
              })}
            </>
          ) : (
            <div>loading</div>
          )}
        </Grid>
      </Center> */}
    </>
  );
}
