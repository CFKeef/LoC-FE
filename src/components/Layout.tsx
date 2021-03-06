import React from "react";
import { HigherOrderFC } from "../types";
import { Box } from "@chakra-ui/react";
import Head from "next/head";

interface Props extends HigherOrderFC {
	title?: string;
}

const Layout: React.FunctionComponent<Props> = ({
	children,
	title = "LoC Image Search",
}) => {
	return (
		<Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<Box
				display={"flex"}
				justifyContent={"center"}
				flexDirection={"column"}
				alignItems={"center"}
				width="100%"
			>
				{children}
			</Box>
		</Box>
	);
};

export default Layout;
