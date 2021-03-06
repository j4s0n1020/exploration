import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import {
  Icon,
  Box,
  Button,
  Text,
  Image,
  Grid,
  GridItem,
  Badge,
  Center,
  Flex,
  Tabs,
  TabList,
} from '@chakra-ui/react';

const ProfileTrip = ({
  title,
  destination,
  start_date,
  end_date,
  locationphotos,
  member_name,
  favorite,
  tripId,
  handleFavorite,
  member_id,
}) => {
  return (
    <>
      <Box>
        <Grid>
          <GridItem fontSize="12px" >{title}</GridItem>
          <GridItem>{destination}</GridItem>
          <GridItem fontSize="12px">
            {new Date(start_date).toLocaleDateString()} -{' '}
            {new Date(end_date).toLocaleDateString()}
          </GridItem>
          <GridItem fontSize="12px">
            <Link to={{ pathname: `/time/profile/2` }}>
              PERSON {member_name}
            </Link>
          </GridItem>
          <GridItem align="center">
            <Image  rounded="5%"
                boxSize='200px'
              src={locationphotos[0]}
              fallbackSrc='https://www.ishn.com/ext/resources/900x550/airplane-plane-flight-900.jpg?height=635&t=1583412590&width=1200'
            />
          </GridItem>
        </Grid>
        {/* <Grid>
          <Button onClick={() => handleFavorite(tripId)}>
            {favorite ? (
              <Icon as={AiFillHeart} color='teal.500' />
            ) : (
              <Icon as={AiOutlineHeart} color='teal.500' />
            )}
          </Button>
        </Grid> */}
      </Box>
    </>
  );
};
export default ProfileTrip;
