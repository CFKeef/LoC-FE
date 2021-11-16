import { Link as ChakraLink, Text, Heading } from "@chakra-ui/react";
import { Main } from "../components/Main";
import SearchBar from "../components/SearchBar";
import { Container } from "../components/Container";

const Index = () => (
    <Container height="100vh">
        <Main>
            <Heading fontSize={["1rem", "2vw"]} textAlign={"center"}>
                Library of Congress Image Search
            </Heading>
            <SearchBar />
        </Main>
    </Container>
);

export default Index;
