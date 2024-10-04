import React, { useEffect } from 'react';
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import SIGNUP from '../components/authentication/SIGNUP ';
import  LOGIN from '../components/authentication/LOGIN';
import { useHistory } from 'react-router-dom';



const HomePage = () => {

    const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);
    return (
        <Container maxW='xl' centerContent>
            <Box
                display='flex'
                justifyContent="center"
                p={3}
                bg='lavender'
                w='100%'
                m='40px 0 15px 0'
                borderRadius='30px'
                borderWidth='1px'
                style={{ marginRight:'500px'}}
            >
                <Text fontSize='3xl' fontFamily='Bodoni MT Black ' color='black'>
                    WEB TALK
                </Text>
            </Box>
            <Box bg="lavender" w="100%" p={4} borderRadius="30px" color='black' borderWidth="1px" style={{ marginRight:'500px',marginBottom:'50px'}} >
                <Tabs variant='soft-rounded' colorScheme='blue'>
                    <TabList mb='1em'>
                        <Tab width='50%'>LOGIN</Tab>
                        <Tab width='50%'>SIGN UP</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <LOGIN/> 
                        </TabPanel>
                        <TabPanel>
                            <SIGNUP/> 
                            
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};
export default HomePage;