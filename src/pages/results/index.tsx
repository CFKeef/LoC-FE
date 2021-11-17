import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Main } from "../../components/Main";
import { Text, Heading, Flex, Grid, Button, Spinner } from "@chakra-ui/react";
import Anchor from "../../components/Anchor";
import { GetServerSidePropsContext } from "next";
import Card from "../../components/Card";
import { Response } from "../../types";

interface Props extends Response {
    error?: { msg: string };
}

const getQueryPortionFromURL = (url: string) => {
    const queryStart = url.indexOf("?");
    return url.substring(queryStart);
};

const fetchSearchWithQuery = async (
    query: string,
): Promise<Response | null> => {
    return await fetch(process.env.IP + "/api/v1/search" + query)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json() as Promise<Response>;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
};

const Index: React.FunctionComponent<Props> = (props) => {
    const { pagination, results, error } = props;
    const [data, setData] = useState<Response>({ pagination, results });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFetchingPage = async (route: string) => {
        setIsLoading(true);

        const query = getQueryPortionFromURL(route);

        const data = await fetchSearchWithQuery(query);

        setIsLoading(false);
        setData(data);
    };

    const handleRenderingCardList = () => {
        if (data.results.length == 0) {
            return <Text>No Results found :(</Text>;
        }

        return (
            <Grid
                as={"ul"}
                w={"100%"}
                justifyContent={"space-between"}
                templateRows={["repeat(auto,1fr)", "repeat(5, 1fr)"]}
                templateColumns={[
                    "repeat(auto-fit,40%)",
                    "repeat(auto-fit, 20%)",
                ]}
                gap={5}
            >
                {data.results.map((elem) => (
                    <Card key={elem.id} {...elem} />
                ))}
            </Grid>
        );
    };

    const determineRender = () => {
        if (isLoading) return <Spinner />;
        else if (error) return <Text>{error.msg}</Text>;
        else {
            return (
                <>
                    {handleRenderingCardList()}
                    <Flex
                        m={"1rem 0"}
                        w={"50%"}
                        justifyContent={"space-evenly"}
                        gap={"1rem"}
                        flexDirection={"row"}
                    >
                        {data.pagination.previous && (
                            <Button
                                w={"30%"}
                                onClick={() =>
                                    handleFetchingPage(data.pagination.previous)
                                }
                            >
                                Prev
                            </Button>
                        )}
                        {data.pagination.next && (
                            <Button
                                w={"30%"}
                                onClick={() =>
                                    handleFetchingPage(data.pagination.next)
                                }
                            >
                                Next
                            </Button>
                        )}
                    </Flex>
                </>
            );
        }
    };

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
                    <Flex gridGap={"1rem"}>
                        <Anchor
                            styles={{
                                textAlign: "right",
                            }}
                            to={"/"}
                            text={"Back to search"}
                        />
                    </Flex>
                </Flex>
                {determineRender()}
            </Main>
        </Layout>
    );
};

export default Index;

export const getServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const query = getQueryPortionFromURL(context.resolvedUrl);

    if (!query) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    const data = await fetchSearchWithQuery(query);

    if (!data) {
        return {
            props: {
                pagination: {},
                results: [],
                error: { msg: "Something went wrong :(" },
            },
        };
    }

    return {
        props: {
            pagination: data.pagination,
            results: data.results,
        },
    };
};
