import React from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  Container,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";
import { AddIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion"; // Import motion

// Wrap Chakra's Button in motion for animation
const MotionButton = motion(Button);

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="container.lg" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Left side: Logo */}
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"radial(gray.300, yellow.400, pink.200)"}
          bgClip={"text"}
        >
          <Link href="/">Product Store</Link>
        </Text>

        {/* Right side: Sign Up button with plus icon */}
        <div>
          <Link href="/create" px={3}>
            <MotionButton
              fontSize={20}
              whileHover={{ scale: 1.2 }} // Scale up on hover
              whileTap={{ scale: 0.9 }} // Scale down slightly on tap
              transition="0.2s ease-in-out"
            >
              <AddIcon />
            </MotionButton>
          </Link>

          <Button fontSize={20} onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun fontSize={20} />}
          </Button>
        </div>
      </Flex>
    </Container>
  );
};

export default Navbar;
