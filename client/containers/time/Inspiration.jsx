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

const Inspiration = ({ handleFetchState, inspirationTrips, handleFavorite }) => {
  useEffect(() => {
    handleFetchState('inspiration');
  }, []);

  console.log('INSPIRATION ALL TRIPS: ', inspirationTrips);
  return (
    <>
      <NavBar />
      <Box>
        <>
          <Flex>
            {inspirationTrips &&
              inspirationTrips.map((trip) => (
                <ProfileTrip
                  key={trip.id}
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
              ))}
          </Flex>
        </>
      </Box>
      <Footer />
    </>
  );
};
export default Inspiration;
