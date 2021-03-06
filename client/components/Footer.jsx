import React from 'react';
import { AiOutlineGithub } from 'react-icons/ai';

import { Box, Button, Text, Grid, GridItem, Link } from '@chakra-ui/react';

// stateless functional component

const Footer = () => (
  <Box
    border='1px'
    borderColor='#c8c8c8'
    background='#e8e8e8'
    left='0px'
    bottom='0px'
    height='12%'
    width='100%'
  >
    <Grid templateColumns='repeat(3, 1fr)' gap={4}>
      <GridItem m={2}>
        <Link href='https://github.com/ExplorationLLC/exploration'>
          <Button
            leftIcon={
              <AiOutlineGithub w={('20px', '32px')} h={('20px', '32px')} />
            }
            rowSpan={1}
            fontSize={{ base: '12px', md: '12px', lg: '16px' }}
            background='#f8f8f8'
          >
            Open Source Code
          </Button>
        </Link>
        <Link href='https://github.com/teamjellybean/exploration' m={1}>
          <Button
            leftIcon={
              <AiOutlineGithub w={('20px', '32px')} h={('20px', '32px')} />
            }
            rowSpan={1}
            fontSize={{ base: '12px', md: '12px', lg: '16px' }}
            background='#f8f8f8'
          >
            Iteration Code
          </Button>
        </Link>
      </GridItem>
      <GridItem m={2}>
        <Text
          textAlign={['left', 'center']}
          fontSize={{ base: '8px', md: '12px', lg: '16px' }}
        ></Text>
      </GridItem>
      <GridItem m={2}>
        <Text
          textAlign={['left', 'center']}
          fontSize={{ base: '8px', md: '12px', lg: '16px' }}
        >
          Open Source Iteration By Scott Campbell, Christy Gomez, Dasha Kondratenko, Jason Lee, &
          Chris Lung
        </Text>
      </GridItem>
    </Grid>
  </Box>
);

export default Footer;
