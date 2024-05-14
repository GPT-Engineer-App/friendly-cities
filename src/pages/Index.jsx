import { useState, useEffect } from "react";
import { Container, Text, VStack, Box, Image, Input, SimpleGrid, Heading, Flex } from "@chakra-ui/react";
import axios from "axios";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then(response => setCities(response.data))
      .catch(error => console.error("Error fetching cities:", error));
  }, []);

  const filteredCities = cities.filter(city =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxW="container.xl" p={0}>
      <Box
        w="100%"
        h="300px"
        backgroundImage="url('/images/tropical-beach.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Heading color="white" fontSize="4xl" textAlign="center" bg="rgba(0, 0, 0, 0.5)" p={4} borderRadius="md">
          NomadRank
        </Heading>
      </Box>
      <Box p={4}>
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="xl" textAlign="center">
            Find the Best Cities for Digital Nomads
          </Heading>
          <Text fontSize="lg" textAlign="center">
            Discover and rank cities based on how friendly they are for digital nomads.
          </Text>
          <Input
            placeholder="Search for a city or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
            {filteredCities.map(city => (
              <Box key={city.id} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Heading as="h3" size="md">{city.city}</Heading>
                <Text>{city.country}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;