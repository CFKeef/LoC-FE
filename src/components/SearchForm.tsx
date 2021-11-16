import React, { useState } from "react";
import {
    Input,
    InputGroup,
    Stack,
    Button,
    FormControl,
    FormLabel,
    InputRightElement,
    IconButton,
    Box,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const SearchForm = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");

    const handleChange = (e: React.FormEvent<HTMLInputElement>) =>
        setValue(e.currentTarget.value);

    const handleClear = () => setValue("");

    const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        router.push("/results?search=" + value);
    };

    return (
        <Stack
            as={"form"}
            spacing="1rem"
            justifyContent={"center"}
            alignItems={"center"}
            w={["100%", "75%"]}
            onSubmit={handleSubmit}
        >
            <FormControl id="search" isRequired>
                <InputGroup display={"flex"} flexDirection={"column"}>
                    <FormLabel>Search</FormLabel>
                    <Box pos={"relative"}>
                        <Input
                            name={"search"}
                            placeholder={"Start searching"}
                            value={value}
                            onChange={handleChange}
                        />
                        {value != "" && (
                            <InputRightElement
                                children={
                                    <IconButton
                                        aria-label="Clear input"
                                        icon={<CloseIcon />}
                                        onClick={handleClear}
                                    />
                                }
                            />
                        )}
                    </Box>
                </InputGroup>
            </FormControl>
            <Button w="50%" type="submit" colorScheme="blue">
                Search
            </Button>
        </Stack>
    );
};

export default SearchForm;
