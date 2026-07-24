import { Box, Typography } from "@mui/material";
import React from "react";

interface PlayerProps {
  jersey: string;
  name: string;
}

const HomePlayer: React.FC<PlayerProps> = ({ jersey, name }) => {
  return (
    <Box display="flex" gap={1}>
      <Typography variant="h6" fontSize="small" fontWeight="bold">
        {jersey}
      </Typography>
      <Typography variant="h6" fontSize="small" fontWeight="bold">
        {name}
      </Typography>
    </Box>
  );
};

export default HomePlayer;
