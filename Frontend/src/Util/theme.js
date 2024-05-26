import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
const darktheme = extendTheme({ config });

export default darktheme;