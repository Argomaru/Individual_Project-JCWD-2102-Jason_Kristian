import { ReactNode } from "react";
import {
  Box,
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
  useColorModeValue,
  Stack,
  Divider,
  color,
  Text,
  Center,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import LinkNext from "next/link";
import logo from "../../assets/images/wcrown.png";
import {
  AiOutlineNotification,
  AiFillNotification,
  AiOutlineSetting,
  AiOutlineLogout,
  AiFillSetting,
} from "react-icons/ai";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import {
  BsChatDotsFill,
  BsChatDots,
  BsFillQuestionCircleFill,
} from "react-icons/bs";
import { CgAddR } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import jsCookie from "js-cookie";
import auth_types from "../../redux/reducers/types/auth";
import Image from "next/image";
import AddPost from "../../components/addPost";
import SiAddthis from "react-icons/si";
// const SubMenu = ['Profile', 'Logout'];

export default function NavbarComponent() {
  const dispatch = useDispatch();

  const NavLink = ({ children, path }) => (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("white"),
        color: "black",
      }}
      href={path}
    >
      {children}
    </Link>
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const render = useSelector((state) => state.automateRendering);
  const SubMenu = [
    { link: "Profile", path: "/profile", klik: undefined },
    {
      link: "logout",
      path: "/",
      klik: () => {
        btnlogout();
      },
    },
  ];

  // const Links = [
  //   { link: "Home", path: "/" },
  //   {
  //     link: "Product",
  //     path: "/product",
  //   },
  // ];

  function btnlogout() {
    jsCookie.remove("auth_token");
    dispatch({
      type: auth_types.AUTH_LOGOUT,
    });
  }
  console.log(userSelector.avatar_url);

  return (
    <>
      <Box
        bg={useColorModeValue("black")}
        color="white"
        // px={1}
        maxW="full"
        className="navbar"
      >
        <Flex h="60px" allignitems={"center"} justifyContent={"space-between"}>
          <Link href="/home">
            <HStack spacing={3} alignItems={"center"}>
              <Box pt="5px">
                <Image src={logo} alt="" width={50} height={50} />
              </Box>
            </HStack>
          </Link>
          <Flex position="static" allignitems={"center"}>
            <LinkNext href={"/home"}>
              <Button background="black" mr="8px">
                <Icon boxSize="7" as={HiOutlineHome} />
              </Button>
            </LinkNext>
            <Link onClick={onOpen}>
              <Modal onClick={onOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalHeader>
                  <AddPost />
                </ModalHeader>
              </Modal>
              <Button background="black" mr="8px">
                <Icon boxSize="7" as={CgAddR} />
              </Button>
            </Link>
            <Button background="black" mr="8px">
              <Icon boxSize="7" as={BsChatDots} />
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Change your Avatar</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <AddPost />
                  </ModalBody>
                  <ModalFooter>Close</ModalFooter>
                  {/* <ModalProfPicture onClose={onClose} /> */}
                </ModalContent>
              </Modal>
            </Button>
            <Button background="black" mr="8px">
              <Icon boxSize="7" as={AiOutlineNotification} />
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                align={"center"}
                bg="black"
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={userSelector.avatar_url} />
                <Text> {userSelector.username}</Text>
                {/* <Text ml="10px" mt="5px">
                  Username
                </Text> */}
              </MenuButton>
              <MenuList>
                <LinkNext href="/profileuser">
                  <MenuItem>
                    <Avatar size={"sm"} src={userSelector.avatar_url} />
                    <Text color="black" ml="10px">
                      {userSelector.username}'s profile
                    </Text>
                  </MenuItem>
                </LinkNext>
                <Divider />
                <LinkNext href="/editprofile">
                  <MenuItem>
                    <Icon color="black" boxSize="6" as={AiFillSetting} />
                    <Text color="black" ml="10px">
                      Edit Profile
                    </Text>
                  </MenuItem>
                </LinkNext>

                <LinkNext href="/auth/login">
                  <MenuItem onClick={btnlogout}>
                    <Icon color="black" boxSize="6" as={AiOutlineLogout} />
                    <Text color="black" ml="10px">
                      Log Out
                    </Text>
                  </MenuItem>
                </LinkNext>

                {/* lock navbar kalo belom verified */}
                {/* {userSelector.is_verified == 0 ? (
                  <></>
                ) : (
                  <>
                    <Link onClick={onOpen}>
                      <Button>
                        <Icon color="white" as={SiAddthis} />
                      </Button>
                    </Link>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                    </Modal>
                    <Button bg="black"></Button>
                    <Icon as={AiFillSetting} />
                    <Button bg="black"></Button>
                    <Icon as={AiOutlineLogout} />
                  </>
                )} */}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
