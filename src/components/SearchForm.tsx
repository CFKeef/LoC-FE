import React, { useReducer, useState } from "react";
import {
    Input,
    Stack,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import searchReducer, { SearchForm } from "../reducers/searchReducer";

const initialState = {
    query: "",
    location: "",
    subject: "",
    originalFormat: "",
    partOf: "",
    contributor: "",
};

const buildRequest = (data: SearchForm) => {
    const { query, ...rest } = data;
    let fa = [];

    for (let [key, value] of Object.entries(rest)) {
        if (value != "") {
            fa.push(`${key}:${value}`);
        }
    }

    const params = new URLSearchParams({
        q: query,
    });

    if (fa.length > 0) {
        params.set("fa", fa.join("|"));
    }

    return params.toString();
};

const SearchForm = () => {
    const router = useRouter();
    const [state, dispatch] = useReducer(searchReducer, initialState);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name: field, value } = e.currentTarget;

        dispatch({
            type: "TEXTFIELD",
            payload: {
                field,
                value,
            },
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const query = buildRequest(state);
        router.push("/results?" + query);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Stack
            as={"form"}
            spacing="1rem"
            justifyContent={"center"}
            alignItems={"center"}
            w={["100%", "75%"]}
            onSubmit={handleSubmit}
        >
            <FormControl id="query" isRequired>
                <FormLabel>Search</FormLabel>
                <Input
                    name={"query"}
                    placeholder={"Start searching"}
                    query={state.query}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl id="location">
                <FormLabel>Filter By Location</FormLabel>
                <Input
                    name={"location"}
                    placeholder={"Oregon,texas"}
                    query={state.location}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl id="subject">
                <FormLabel>Filter By Subject</FormLabel>
                <Input
                    name={"subject"}
                    placeholder={"Meterology,wildlife"}
                    query={state.subject}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl id="original-format">
                <FormLabel>Filter By Original Format</FormLabel>
                <Input
                    name={"original-format"}
                    placeholder={"Software,e-resource"}
                    query={state.originalFormat}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl id="partOf">
                <FormLabel>Filter By Part Of</FormLabel>
                <Input
                    name={"partOf"}
                    placeholder={"Performing arts encyclopedia"}
                    query={state.partOf}
                    onChange={handleChange}
                />
                <FormHelperText>
                    Collections, divisions, and units in the Library of
                    Congress.
                </FormHelperText>
            </FormControl>
            <FormControl id="contributor">
                <FormLabel>Filter By Original Format</FormLabel>
                <Input
                    name={"contributor"}
                    placeholder={"Dorothy, abigail"}
                    query={state.contributor}
                    onChange={handleChange}
                />
            </FormControl>
            <Button w="50%" type="submit" colorScheme="blue">
                Search
            </Button>
        </Stack>
    );
};

export default SearchForm;
