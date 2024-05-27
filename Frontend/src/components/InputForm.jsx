import {
    Input,
    Stack,
    Container,
    FormLabel,
    InputGroup,
    Box,
    Heading,
    Button,
    Text,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  
  export default function InputForm() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
  
    const handleFileChange = (event) => {
      const uploadedFile = event.target.files[0];
      if (uploadedFile) {
        setFile(uploadedFile);
        setFileName(uploadedFile.name);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic, e.g., sending the file to a server
      console.log("Uploaded file:", file);
    };
  
    return (
      <Container>
        <Heading mb={4} textAlign={"center"} fontSize={"large"}>Upload MP3 File:</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Box>
              <FormLabel htmlFor="file-upload">Select MP3 File</FormLabel>
              <InputGroup>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".mp3"
                  onChange={handleFileChange}
                  borderColor={"tomato"}
                />
              </InputGroup>
              {fileName && <Text mt={2}>Selected file: {fileName}</Text>}
            </Box>
            <Button type="submit" colorScheme="teal">Upload</Button>
          </Stack>
        </form>
      </Container>
    );
  }
  