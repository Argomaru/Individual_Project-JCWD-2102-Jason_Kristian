import React from "react";
import {
  Box,
  Avatar,
  Text,
  Icon,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  FormControl,
  FormLabel,
  Image,
  ModalContent,
  useDisclosure,
  useToast,
  Link,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  InputRightElement,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import profileuser from "./index";

export default function update() {
  const userSelector = useSelector((state) => state.auth);
  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <Box shadow="lg" overflow="hidden">
          <Image
            objectPosition="center"
            src={`${userSelector.avatar_url}`}
            alt="avatar"
          />
          <Flex alignItems="center">
            {/* <Icon as={MdHeadset} h={6} w={6} color="white" /> */}

            <Text>{`${userSelector.username}`}</Text>
          </Flex>

          <Box py={4} px={6}>
            <Text fontSize="xl">{`${userSelector.full_name}`}</Text>

            <Text py={2} color="gray.700">
              Test
            </Text>

            <Flex alignItems="center" mt={4} color="gray.700">
              {/* <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} /> */}

              <Text px={2} fontSize="sm">
                Hey
              </Text>
            </Flex>

            <Flex alignItems="center" mt={4}>
              {/* <Icon as={MdLocationOn} h={6} w={6} mr={2} /> */}

              <Text px={2} fontSize="sm">
                Ghottam city
              </Text>
            </Flex>
            <Flex alignItems="center" mt={4}>
              {/* <Icon as={MdEmail} h={6} w={6} mr={2} /> */}

              <Text px={2} fontSize="sm">
                {`${userSelector.email}`}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Flex>

      <Tabs variant="unstyled">
        <TabList>
          <Tab
            boxSize="50px"
            w="100px"
            _selected={{ color: "white", bg: "blue.500" }}
            fontFamily="koulen"
          >
            Post
          </Tab>
          <Tab
            boxSize="50px"
            w="100px"
            _selected={{ color: "white", bg: "green.400" }}
            fontFamily="koulen"
          >
            Like
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PostProfile />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
