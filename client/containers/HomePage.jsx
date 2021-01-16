import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LoginPage from './LoginPage';
import {
  Button,
  Container,
  Box,
  Stack,
  Text,
  Heading,
  Flex,
  Image,
} from "@chakra-ui/react";
import Footer from "../components/Footer";
import image from "../assets/images/Bridge.jpg";
import { useAuth } from '../useAuth';

const HomePage = () => {
  
  const background = `url(${image})`;
  return (
    <>
      <Box
        backgroundImage={background}
        backgroundRepeat="no-repeat"
        bgPosition="center bottom"
        bgSize="cover"
        py={10}
        pb={40}
      >
        <Container bg="rgba(0, 0, 0,.7)" borderRadius='25px'>
        <Stack spacing={8}>
          <Box pb={10} opacity='1'>
            <Text fontSize="4xl" m={2} color="gray.50" textAlign="center">
              <b>T</b>ravel <b>I</b>tineary <b>M</b>ade <b>E</b>asy
            </Text>
            <Text fontSize="lg" m={2} color="gray.50" textAlign="center">
              Plan your next discovery. 
            </Text>
            <Text fontSize="lg" m={2} color="gray.50" textAlign="center">
              Create individual trips and start searching for activities to do
              within the area.
            </Text>
            <Text textAlign="center" fontSize="lg" color="gray.50" m={2}>
              Whether you are planning on going next week or simply creating a
              dream adventure, use TIME to take the stress out of planning and
              keep the joy in traveling!
            </Text>
            <LoginPage/>
          </Box>
        </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default HomePage;
