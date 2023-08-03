import { Button, VStack , Text} from "@chakra-ui/react";
import { TbArrowBigLeft } from "react-icons/tb";
import { useNavigate,} from "react-router-dom";


const GameInfoPanel = () => {
  const navigation = useNavigate();

  return (
    <>
        <VStack style={{ height: "100%", width: "100%" }} borderRadius={10} spacing={20}>
            <Button onClick={() => { navigation('/') }} variant='link'>
              <Text fontSize="3xl" fontWeight="bold" mb="4px">Home</Text>
            </Button>
            <Button
                rightIcon={<TbArrowBigLeft />}
                colorScheme="gray"
                variant="solid"
                size="100px"
                onClick={() => {
                    navigation(-1);
                }}
                >
                <Text fontSize="3xl" fontWeight="bold" mb="4px">Back</Text>
            </Button>
        </VStack>
    </>
  );
};

export default GameInfoPanel;
