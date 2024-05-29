import React, { useState } from "react";
import { Stack, Container, Heading, Button, Box, Text } from "@chakra-ui/react";
import FileUpload from "./FileUpload";
import AudioPlayer from "./AudioPlayer";

export default function InputForm() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [similarSongs, setSimilarSongs] = useState([]);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
      setFileURL(URL.createObjectURL(uploadedFile));
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
      const response = await fetch("http://localhost:5000/api/uploadFile", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("File saved:", data.filePath);

        // Fetch similar songs
        const songName = fileName.replace(".wav", ""); // Assuming the file name matches the song name in the similarity matrix
        const similarSongsResponse = await fetch(
          `http://localhost:5000/api/findSimilarSongs?name=${songName}.wav`
        );
        const similarSongsData = await similarSongsResponse.json();

        if (similarSongsResponse.ok) {
          setSimilarSongs(similarSongsData.similarSongs);
        } else {
          console.error("Error:", similarSongsData.error);
        }
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Container>
      <Heading mb={4} textAlign={"center"} fontSize={"large"}>
        Upload .WAV File:
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FileUpload fileName={fileName} handleFileChange={handleFileChange} />
          <Button type='submit' colorScheme='teal'>
            Upload
          </Button>
        </Stack>
      </form>
      <p>Your Song:</p>
      {fileURL && <AudioPlayer fileURL={fileURL} />}
      {similarSongs.length > 0 && (
        <Box mt={4}>
          <Text>Similar Songs:</Text>
          <ul>
            {similarSongs.map((song, index) => (
              <li key={index}>
                {song}
                <AudioPlayer
                  fileURL={`http://localhost:5000/api/audio/${encodeURIComponent(
                    song
                  )}`}
                />
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Container>
  );
}
