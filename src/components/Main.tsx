import { Stack, StackProps } from "@chakra-ui/react";

export const Main = (props: StackProps) => (
    <Stack
        as={"main"}
        spacing="1.5rem"
        width="100%"
        maxWidth="48rem"
        {...props}
    />
);