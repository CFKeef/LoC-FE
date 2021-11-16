import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import { Container } from "./Container";

const SearchBar = () => {
    const [value, setValue] = useState<string>("");

    const handleChange = (e: React.FormEvent<HTMLInputElement>) =>
        setValue(e.currentTarget.value);

    return (
        <Input
            placeholder={"Start searching"}
            value={value}
            onChange={handleChange}
        />
    );
};

export default SearchBar;
