import { Heading } from "@chakra-ui/react";
import { Main } from "../components/Main";
import SearchForm from "../components/SearchForm";
import Layout from "../components/Layout";

const Index = () => (
    <Layout title={"Search the Library Of Congress"}>
        <Main h={"100vh"}>
            <Heading fontSize={["1rem", "2vw"]} textAlign={"center"}>
                Library of Congress Image Search
            </Heading>
            <SearchForm />
        </Main>
    </Layout>
);

export default Index;
