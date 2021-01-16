import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ProfileTrip from '../../components/profile/ProfileTrip';

import {
  Box,
  Button,
  Text,
  Image,
  Grid,
  GridItem,
  Link,
  Badge,
  Center,
  Flex,
} from '@chakra-ui/react';
import InspirationHeart from '../../components/InspirationHeart';

const Inspiration = ({
  handleFetchState,
  inspirationTrips,
  handleFavorite,
}) => {
  useEffect(() => {
    handleFetchState('inspiration');
  }, []);

  console.log('INSPIRATION ALL TRIPS: ', inspirationTrips);
  return (
    <>
      <NavBar />

      <>
        <Grid
          templateColumns='repeat(6,1fr)'
          templateRows='repeat(3,1fr)'
          gap={2}
        >
          {inspirationTrips &&
            inspirationTrips.map((trip) => (
              <Box
                key={trip.id}
                boxSize='m'
                textAlign="center"
                border='1px solid silver'
                mt='40px'
                mb='40px'
                maxW='300px'
                // py='40px'
                rounded='5%'
              >
                <GridItem colSpan={1} justify='center' m={2} bg="cyan.50" rounded="5%">
                  <ProfileTrip
                    justify='center'
                    tripId={trip.id}
                    title={trip.title}
                    destination={trip.destination}
                    start_date={trip.start_date}
                    end_date={trip.end_date}
                    locationphotos={trip.locationphotos}
                    favorite={trip.favorite}
                    member_name='trip.username'
                    member_id={trip.member_id}
                    handleFavorite={handleFavorite}
                  />
                  <InspirationHeart
                    tripId={trip.id}
                    title={trip.title}
                    destination={trip.destination}
                    start_date={trip.start_date}
                    end_date={trip.end_date}
                    locationphotos={trip.locationphotos}
                    favorite={trip.favorite}
                    member_name='trip.username'
                    member_id={trip.member_id}
                    handleFavorite={handleFavorite}
                  ></InspirationHeart>{' '}
                </GridItem>
              </Box>
            ))}
        </Grid>
      </>

      <Footer />
    </>
  );
};
export default Inspiration;
