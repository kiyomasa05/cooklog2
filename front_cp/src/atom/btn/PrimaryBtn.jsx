import { memo } from "react"
import { Button } from "@chakra-ui/react"


export const PrimaryBtn = memo((props) => {
  const {
    children,
    isFullWidth = false,
    disabled = false,
    isLoading = false,
    onClick
  } = props;
  return (
    <Button bg="green.300" color="white" _hover={{ opacity: 0.8 }}>{children}</Button>);
});

