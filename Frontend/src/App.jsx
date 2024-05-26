import { Box } from "@chakra-ui/react";
import React from "react";
import TitleBar from "./components/titleBar";
import InputForm from "./components/InputForm";


export default function App() {
  return (
    <Box>
      <TitleBar/>
      <InputForm/>
    </Box>
  );
}
