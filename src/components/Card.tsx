import React from "react";
import { Item } from "../types";
import { Grid, Heading, Image, Text, Flex } from "@chakra-ui/react";
import Anchor from "./Anchor";
import { WarningIcon } from "@chakra-ui/icons";

const Card: React.FunctionComponent<Item> = (props) => {
	const { id, image_url, date, title } = props;

	return (
		<Grid
			as={"li"}
			borderRadius={8}
			padding={".5rem"}
			bg={"gray.100"}
			gridTemplateRows={"repeat(4,auto)"}
			rowGap={".5rem"}
			justifyContent={"center"}
			alignItems={"center"}
			minH={"10rem"}
		>
			<Heading fontSize={"md"} isTruncated>
				{title}
			</Heading>
			{date ? <Text>Date: {date}</Text> : <Text>Date: UNKNOWN</Text>}
			{image_url.length > 0 ? (
				<Image
					backgroundSize={"cover"}
					src={image_url[0]}
					alt={"Image for " + title}
					h={"auto"}
					maxH={"5rem"}
					w={"100%"}
				/>
			) : (
				<Flex minh={80} justifyContent={"center"}>
					<WarningIcon h={"auto"} maxH={"5rem"} w={"100%"} />
				</Flex>
			)}
			<Anchor
				to={id}
				text={"View"}
				styles={{
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					w: "100%",
				}}
			/>
		</Grid>
	);
};

export default Card;
