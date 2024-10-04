import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  VStack,
  Input,
  ModalFooter,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useproductstore } from "../store/store";
import { useState } from "react";

function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { deleteproducts, updateproducts, fetchproducts } = useproductstore();
  if (!product) {
    return (
      <Center h="200px" w="100%">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text ml={4} fontSize="lg" color="gray.500">
          Loading product details...
        </Text>
      </Center>
    );
  }
  const handledeleteproduct = async (id) => {
    const { success, message } = await deleteproducts(id);
    if (!success) {
      await fetchproducts();
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        duration: "3000",
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
        duration: "3000",
      });
    }
  };
  const handleUpdateProduct = async (id, updateProduct) => {
    setLoading(true); // Start loading
    try {
      const { success, message } = await updateproducts(id, updateProduct);

      if (success) {
        await fetchproducts();
        toast({
          title: "Product Updated",
          description: message,
          status: "success", // Ensure status is properly set
          isClosable: true,
          duration: 3000,
        });
      } else {
        throw new Error(message); // Throw an error to trigger the catch block
      }
    } catch (error) {
      toast({
        title: "Error updating product",
        description: error.message || "Something went wrong",
        status: "error", // Error status
        isClosable: true,
        duration: 3000,
      });
    } finally {
      setLoading(false); // End loading after the update is done
      onClose(); // Close modal after the update
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.image}
        w="full"
        objectFit={"cover"}
        h={48}
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => handledeleteproduct(product._id)}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <Input
                placeholder="product name"
                name="name"
                value={updateProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="price"
                name="price"
                value={updateProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="url"
                name="image"
                value={updateProduct.image}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, image: e.target.value })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updateProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProductCard;
