import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "grey.800",
        fontWeight: "semibold",
        letterSpacing: "10%",
      }
    }
  }
});

export default theme;
