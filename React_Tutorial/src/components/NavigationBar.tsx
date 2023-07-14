import { HStack, Image} from "@chakra-ui/react"
import IconImage from "../assets/Icon.png";


export const NavigationBar = () => {
  return (
    <HStack justifyContent='space-between' padding='10px' w="100%" bg="rgba(0, 0, 0, 0.5)">
        <Image src={IconImage} boxSize="70px" />
    </HStack>
  )
}
