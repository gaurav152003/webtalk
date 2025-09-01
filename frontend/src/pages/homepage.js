import React, { useEffect } from 'react';
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import SIGNUP from '../components/authentication/SIGNUP ';
import LOGIN from '../components/authentication/LOGIN';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);

  return (
    <Box
      bgImage="url('/mnt/data/bbbbb.png')" // use your blue background image
      bgSize="cover"
      bgPosition="center"
      minHeight="90vh" // reduced from 100vh
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      px="10%"
    >
      <Container centerContent>
        <Box
          display="flex"
          justifyContent="center"
          p={3} // reduced padding
          bg="light blue"
          w="600px"
          m="30px 0 10px 0" // reduced top and bottom margin
          borderRadius="30px"
          borderWidth="1px"
          boxShadow="lg"
        >
          <Text
            fontSize="4xl"
            fontWeight="bold"
            color="black"
            fontFamily="Bodoni MT Black"
          >
            WEB TALK
          </Text>
        </Box>

        <Box
          bg="light blue"
          w="600px"
          p={5} // slightly reduced padding
          borderRadius="30px"
          color="black"
          borderWidth="1px"
          boxShadow="xl"
          mb="30px" // reduced bottom margin
        >
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList mb="1.5em">
              <Tab width="50%" fontWeight="bold">LOGIN</Tab>
              <Tab width="50%" fontWeight="bold">SIGN UP</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LOGIN />
              </TabPanel>
              <TabPanel>
                <SIGNUP />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
