import { Box, Avatar, Text, Divider } from "@chakra-ui/react";

export default function LikeUser(props) {
  const { likeUsername, likeFullname, likeImg_Url, likeUserId } = props;
  return (
    <Box>
      <Box display="flex">
        <Avatar
          size="md"
          name="Prosper Otemuyiwa"
          src={`http://${likeImg_Url}`}
        />
        <Box ml="20px">
          <Text _hover={{ color: "teal.500" }} fontWeight="bold">
            {likeUsername}
          </Text>
          <Text fontWeight="semibold">{likeFullname}</Text>
        </Box>
      </Box>
      <Divider my="10px" />
    </Box>
  );
}
