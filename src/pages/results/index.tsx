import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Main } from "../../components/Main";
import { Text, Heading, Flex, Grid, Button, Spinner } from "@chakra-ui/react";
import Anchor from "../../components/Anchor";
import { GetServerSidePropsContext } from "next";
import Card from "../../components/Card";
import { Error, Response } from "../../types";

interface Props extends Response {
    error?: Error;
}

const fetchSearchWithQuery = async (
    query: string,
): Promise<Response | null> => {
    return await fetch("http://18.233.199.112:80/api/v1/search" + query)
        .then((res) => {
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
    const [err, setErr] = useState<Error>(error);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFetchingPage = async (route: string) => {
        setIsLoading(true);

        const data = await fetch(route)
            .then((res) => {
                return res.json() as Promise<Response>;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });

        setIsLoading(false);

        if (!data) {
            setErr({
                message: "Something went wrong :(",
                code: "server_blewup",
            });
        } else if (data.error) setErr(data.error);
        else setData(data);
    };

    const handleRenderingCardList = () => {
        if (data.results.length == 0) return <Text>No Results found :(</Text>;

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
        if (err) return <Text>{err.message}</Text>;

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
    };

    return (
        <Layout title={"Results for your search"}>
            <Main m={"0 0 1rem 0"}>
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
                {!data || isLoading ? <Spinner /> : determineRender()}
            </Main>
        </Layout>
    );
};

export default Index;

export const getServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const query = new URLSearchParams(
        context.query as Record<string, string>,
    ).toString();

    if (!query) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    const data = await fetchSearchWithQuery("?" + query);

    if (!data) {
        return {
            props: {
                pagination: {},
                results: [],
                error: { message: "Something went wrong :(" },
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
