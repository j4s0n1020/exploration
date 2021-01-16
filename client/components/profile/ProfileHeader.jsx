import React from 'react';

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
  Tabs,
  TabList,
} from '@chakra-ui/react';


const ProfileHeader = ({currentTab, setCurrentTab, menuItems}) => {
  return (
    <>
      <Box >
          <Grid templateColumns='repeat(4, 1fr)'>
              <GridItem>Profile Pic</GridItem>
              <GridItem>Username</GridItem>
              <GridItem>Following</GridItem>
              <GridItem>Edit</GridItem>
          </Grid>
        <Grid templateColumns='repeat(3, 1fr)'>
          {menuItems.map((el, index) => {
            return (
              <GridItem colSpan={1} m={2} key={el + index}>
                <Button colorScheme={currentTab === el ? 'teal' : 'gray' } onClick={() => setCurrentTab(el)}>
                  <Text fontSize={{ base: '0px', md: '18px', lg: '20px' }}>
                    {el}
                  </Text>
                </Button>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};
export default ProfileHeader;
