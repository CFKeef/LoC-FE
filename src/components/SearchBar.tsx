import React, { useState } from "react";
import {
    Input,
    InputGroup,
    Stack,
    Button,
    FormControl,
    InputRightElement,
    IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const SearchBar = () => {
    const [value, setValue] = useState<string>("");

    const handleChange = (e: React.FormEvent<HTMLInputElement>) =>
        setValue(e.currentTarget.value);

    const handleClear = () => setValue("");

    return (
        <Stack
            as={"form"}
            spacing="1rem"
            justifyContent={"center"}
            alignItems={"center"}
            w={["100%", "75%"]}
        >
            <FormControl id="search" isRequired>
                <InputGroup>
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
                </InputGroup>
            </FormControl>
            <Button w="50%" type="submit" colorScheme="blue">
                Search
            </Button>
        </Stack>
    );
};

export default SearchBar;
