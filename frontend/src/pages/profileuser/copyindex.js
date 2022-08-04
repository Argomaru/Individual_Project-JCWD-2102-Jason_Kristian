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
// import NavBar from "../../components/navbar";
// import image from "../../assets/images/azazel.png";
import { useSelector } from "react-redux";
import * as yup from "yup";
// import { AiFillSetting } from "react-icons/ai";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/api";
export default function profileuser() {
    const userSelector = useSelector((state) => state.auth);
  const UserProfile = () => {
    const render = useSelector((state) => state.autoRender);
    const userSelector = useSelector((state) => state.auth);
    const [postProfile, setPostProfile] = useState([]);
    useEffect(() => {
      async function testProfile() {
        try {
          const res = await axiosInstance.get("/post/" + userSelector.id);
          const data = res.data.result;
          console.log(res.data.result);
          setPostProfile([...data]);
        } catch (error) {
          console.log("Error!");
        }
      }

      if (render?.value != undefined) {
        testProfile();
        console.log(userSelector);
      }
    }, [render]);

    return (
      <Center>
        <Grid gap={2} gridAutoRows>
          {postProfile ? (
            <>
              {postProfile.map((val, idx) => {
                return (
                  <Image
                    src={`${val.image_url}`}
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
      </Center>
    );
  };
}
