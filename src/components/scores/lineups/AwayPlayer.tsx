import { Box, Typography } from "@mui/material";
import React from "react";

interface AwayProps {
  name: string;
  jersey: string;
}

const AwayPlayer: React.FC<AwayProps> = ({ name, jersey }) => {
  return (
    <Box display="flex" justifyContent="flex-end" gap={1}>
      <Typography variant="h6" fontSize="small" fontWeight="bold">
        {name}
      </Typography>
      <Typography variant="h6" fontSize="small" fontWeight="bold">
        {jersey}
      </Typography>
    </Box>
  );
};

export default AwayPlayer;
