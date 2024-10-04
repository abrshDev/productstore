import React from "react";
import { Container, VStack, Text, Link, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useproductstore } from "../store/store";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const { fetchproducts, products } = useproductstore();
  useEffect(() => {
    fetchproducts();
  }, [fetchproducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack>
        {" "}
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r,cyan.400,blue.500)"}
          bgClip={"text"}
        >
          Current Products
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={Math.random()} product={product} />
          ))}
        </SimpleGrid>
        <Text
          fontSize="xl"
          textAlign={"center"}
          fontWeight={"bold"}
          color="gray.500"
        >
          {products.length > 0 ? (
            <Link href="/create">
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          ) : (
            " No Products Found 😥"
          )}
        </Text>
      </VStack>
    </Container>
  );
}

export default HomePage;
