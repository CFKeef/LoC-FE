import React from "react";
import Layout from "../../components/Layout";
import { Main } from "../../components/Main";
import { Text, Heading, Flex, Button } from "@chakra-ui/react";
import Anchor from "../../components/Anchor";

interface Props {
    search: string;
}

const Index: React.FunctionComponent<Props> = ({ search }) => {
    console.log(search);
    return (
        <Layout title={"Results for your search"}>
            <Flex
                m={"1rem 0"}
                flexDirection={"row"}
                w={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Heading>Results</Heading>
                <Anchor to={"/"} text={"Back to search"} />
            </Flex>

            <Main>
                <Text>Test</Text>
            </Main>
        </Layout>
    );
};

export default Index;

export async function getServerSideProps(context) {
    const { search } = context.query;

    return {
        props: {
            search,
        },
    };
}
