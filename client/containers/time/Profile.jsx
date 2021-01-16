import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileTrip from '../../components/profile/ProfileTrip';

import {
  Box,
  
  Center,
  Flex,
 
  HStack
} from '@chakra-ui/react';

const Profile = ({ trips, handleFetchState, savedTrips, pastTrips }) => {
  const [currentTab, setCurrentTab] = useState('inspiration');

  useEffect(() => {
    handleFetchState('all'); // 'all' -> server side splits to 'upcoming' and 'past'
  }, []);

  const profileTabs = {
    upcoming: trips,
    inspiration: savedTrips,
    'past trips': pastTrips,
  };

  // console.log('all trips FROM PROFILE PAGE', trips)
  console.log('INSPIRATION SAVED TRIPS: ', savedTrips);
  return (
    <>
      <NavBar />
      <Box>
        <ProfileHeader
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          menuItems={Object.keys(profileTabs)}
        />
        <>
          <Center> <HStack spacing ="20px">
            {profileTabs[currentTab] &&
              profileTabs[currentTab].map((trip) => (
                <Flex>
                  <ProfileTrip
                    title={trip.title}
                    destination={trip.destination}
                    start_date={trip.start_date}
                    end_date={trip.end_date}
                    locationphotos={trip.locationphotos}
                    member_name='trip.username'
                    member_id={trip.member_id}
                    favorite={trip.favorite}
                  />
                </Flex>
              ))}
              </HStack>
          </Center>
        </>
      </Box>
      <Footer />
    </>
  );
};
export default Profile;
