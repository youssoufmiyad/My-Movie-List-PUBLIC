import React from 'react'
import { Stack, Typography } from '@mui/material'

const Review = ({username, review}) => {
  return (
    <Stack sx={{ backgroundColor: "#FFF", padding: "20px", margin: "20px" }}>
			{/*nom d'utilisateur */}
			<Typography fontSize={"10px"}>{username}</Typography>
			{/*commentaire */}
			<Typography>{review}</Typography>
		</Stack>
  )
}

export default Review
