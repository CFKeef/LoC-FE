import { Link as ChakraLink, Text, Heading } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import SearchBar from "../components/SearchBar";
import { DarkModeSwitch } from "../components/DarkModeSwitch";

const Index = () => (
    <Container height="100vh">
        <Heading fontSize="2vw">Library of Congress Image Search</Heading>
        <Main>
            <SearchBar />
        </Main>
        <Text>Scala Computing</Text>
        <DarkModeSwitch />
    </Container>
);

export default Index;
