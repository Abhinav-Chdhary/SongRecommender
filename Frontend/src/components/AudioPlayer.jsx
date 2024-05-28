import { Box } from "@chakra-ui/react";
import React from "react";

const AudioPlayer = ({ fileURL }) => {
  return (
    <Box mt={4}>
      <p>Your Song:</p>
      <audio controls>
        <source src={fileURL} type='audio/wav' />
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default AudioPlayer;
