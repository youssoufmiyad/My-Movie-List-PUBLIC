import React from 'react'
import { Stack } from '@mui/material';
import Skeleton from "@mui/material/Skeleton";


const CardLoading = () => {
    return (
		<Stack
			sx={{
				width: "176px",
				borderRadius: "0.5rem",
				outline: "#374151 2px solid",
				margin: "4px",
                backgroundColor: "#202126",

			}}
		>
            <Skeleton width={"176px"} height={"210px"}/>
			<Stack
				sx={{
					textTransform: "uppercase",
					height: "112px",
					color: "#E5E7EB",
					padding: "8px",
					borderBottomLeftRadius: "0.5rem",
					borderBottomRightRadius: "0.5rem",
				}}
			>
				<Skeleton variant='text'/>
				<hr style={{ width: "160px" }} color="#374151" />
				<Skeleton variant='text'/>
			</Stack>
		</Stack>
	);
}

export default CardLoading
