import React from "react";
import { ChakraProps } from "@chakra-ui/react";
import Link from "next/link";
import { Link as ChakraLink, Text } from "@chakra-ui/react";

interface Props {
	to: string;
	text: string;
	styles?: ChakraProps;
	children?: React.ReactNode;
}

const Anchor: React.FunctionComponent<Props> = ({ to, text, styles }) => {
	return (
		<Link href={to} passHref={true}>
			<ChakraLink
				{...styles}
				display={"flex"}
				justifyContent={"center"}
				flexDirection={"row"}
				alignItems={"center"}
			>
				<Text as={"span"} fontSize={"md"}>
					{text}
				</Text>
			</ChakraLink>
		</Link>
	);
};

export default Anchor;
