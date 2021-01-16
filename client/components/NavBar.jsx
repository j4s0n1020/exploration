import React, { useState } from 'react';

// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { useHistory, Link } from 'react-router-dom';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Image,
  Button,
  Text,
  Grid,
  GridItem,
  Icon,
} from '@chakra-ui/react';

// import { RiAddCircleFill } from 'react-icons/ri';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { MdAirplanemodeActive, MdHome } from 'react-icons/md';
import { FaUser } from 'react-icons/fa'
// import { IconContext } from 'react-icons';
import { useAuth } from '../useAuth';

// stateless functional component

export default function NavBar() {
  const auth = useAuth();
  const history = useHistory();

  const handleSignOut = () => {
    fetch('/api/member/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.status === 200) {
          auth.signOutFunc(() => history.push('/'));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const goToProfile = () => {
    console.log('AUTH',auth.user)
    history.push(`/time/profile/${auth.user.Id}`);
  };

  return (
    <>
      <Box border='1px' borderColor='#c8c8c8' background='#e8e8e8'>
        <Grid templateColumns='repeat(2, 1fr)'>
          <GridItem colSpan={2} m={2}>
            <Link to={{ pathname: '/time/home' }}>
              <Button colorScheme='teal' variant='outline'>
                <Icon as={MdHome} w={6} h={6}/>
              </Button>
            </Link>
          </GridItem>
          <GridItem colSpan={2} m={2}>
            <Link to={{ pathname: '/time/inspiration' }}>
              <Button colorScheme='teal' color='gray.50'>
                <Text fontSize={{ base: '0px', md: '18px', lg: '20px' }}>
                  <Icon as={MdAirplanemodeActive} w={6} h={6}/> Inspiration
                </Text>
              </Button>
            </Link>
          </GridItem>

          <GridItem m={2}>
            <Button onClick={goToProfile} variant='outline' color='#319795'>
              <Text fontSize={{ base: '0px', md: '18px', lg: '20px' }}>
              <Icon as={FaUser} w={5} h={5}/> {auth.user.userName}
              </Text>
            </Button>
          </GridItem>

          <GridItem colStart={20} m={2}>
            <Button
              color='#319795'
              onClick={handleSignOut}
              variant='outline'
            >
              Log Out
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
