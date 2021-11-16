import React from "react";
import Layout from "../../components/Layout";
import { Main } from "../../components/Main";
import { Text, Heading, Flex } from "@chakra-ui/react";
import Anchor from "../../components/Anchor";

interface Props {}

const Index: React.FunctionComponent<Props> = () => {
    return (
        <Layout title={"Results for your search"}>
            <Main>
                <Flex
                    m={"1rem 0"}
                    flexDirection={"row"}
                    w={"100%"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Heading>Results</Heading>
                    <Anchor
                        styles={{
                            textAlign: "right",
                        }}
                        to={"/"}
                        text={"Back to search"}
                    />
                </Flex>
                <Text>Test</Text>
            </Main>
        </Layout>
    );
};

export default Index;

export async function getServerSideProps(context) {
    console.log(context.query);

    return {
        props: {},
    };
}
