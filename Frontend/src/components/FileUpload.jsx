import {
    Input,
    Box,
    FormLabel,
    InputGroup,
    Text,
  } from "@chakra-ui/react";
  import React from "react";
  
  const FileUpload = ({ fileName, handleFileChange }) => {
    return (
      <Box>
        <FormLabel htmlFor='file-upload'>Select .WAV File</FormLabel>
        <InputGroup>
          <Input
            id='file-upload'
            type='file'
            accept='.wav'
            onChange={handleFileChange}
            borderColor={"tomato"}
          />
        </InputGroup>
        {fileName && <Text mt={2}>Selected file: {fileName}</Text>}
      </Box>
    );
  };
  
  export default FileUpload;
  