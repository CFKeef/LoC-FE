import { Stack, StackProps } from "@chakra-ui/react";

export const Main = (props: StackProps) => (
    <Stack
        as={"main"}
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing="1.5rem"
        width={["calc(100% - 40px)", "100%"]}
        maxWidth="48rem"
        m={["20px", "0"]}
        {...props}
    />
);
