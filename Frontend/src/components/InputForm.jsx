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
  const [genre, setGenre] = useState("");
  const [similarSongs, setSimilarSongs] = useState([]);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Send the file to the Flask backend for genre prediction
      const genreResponse = await fetch("http://localhost:5000/api/getGenre", {
        method: "POST",
        body: formData,
      });
      const genreData = await genreResponse.json();
      setGenre(genreData.genre);

      // Send the file to the Flask backend for similar songs prediction
      const similarSongsResponse = await fetch(
        "http://localhost:5000/api/suggestSongs",
        {
          method: "POST",
          body: formData,
        }
      );
      const similarSongsData = await similarSongsResponse.json();
      setSimilarSongs(similarSongsData.similar_songs);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Container>
      <Heading mb={4} textAlign={"center"} fontSize={"large"}>
        Upload MP3 File:
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Box>
            <FormLabel htmlFor='file-upload'>Select MP3 File</FormLabel>
            <InputGroup>
              <Input
                id='file-upload'
                type='file'
                accept='.mp3'
                onChange={handleFileChange}
                borderColor={"tomato"}
              />
            </InputGroup>
            {fileName && <Text mt={2}>Selected file: {fileName}</Text>}
          </Box>
          <Button type='submit' colorScheme='teal'>
            Upload
          </Button>
        </Stack>
      </form>
      {genre && (
        <Box mt={4}>
          <Text>Predicted Genre: {genre}</Text>
        </Box>
      )}
      {similarSongs.length > 0 && (
        <Box mt={4}>
          <Text>Similar Songs:</Text>
          <ul>
            {similarSongs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </Box>
      )}
    </Container>
  );
}
