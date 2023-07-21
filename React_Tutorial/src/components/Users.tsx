import { Button, Grid, GridItem, HStack} from "@chakra-ui/react";
import LoginPage from "./LoginPage";
import { TbArrowBigLeft } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import SignupPage from "./SignupPage";

interface Props {
    type: string
}
const Users = ({type}:Props) => {
    const navigation = useNavigate();
  return (
    <div>
      <Grid
        templateAreas={`'nav nav' 'main main'`}
        templateColumns={"230px 1fr"}
      >
        <GridItem area={"nav"}>
          <HStack
            justifyContent="space-between"
            padding="10px"
            w="100%"
          >
            <HStack align="center">
                {type == 'login' && <Button
                        leftIcon={<TbArrowBigLeft />}
                        colorScheme="gray"
                        variant="solid"
                        onClick={() => {
                            navigation('/');
                        }}
                        >
                        Back
                        </Button>}
                {type == 'signup' && <Button
                    leftIcon={<TbArrowBigLeft />}
                    colorScheme="gray"
                    variant="solid"
                    onClick={() => {
                        navigation('/login');
                    }}
                    >
                    Back to Login
                    </Button>}
            </HStack>
          </HStack>
        </GridItem>
        <GridItem area={"main"}>
          {type=='login' && <LoginPage />}
          {type=='signup' && <SignupPage/>}
        </GridItem>
      </Grid>
    </div>
  );
};

export default Users;
