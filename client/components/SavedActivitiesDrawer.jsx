import React, { useRef } from 'react';
import SavedActivities from './SavedActivities';

import {
	useDisclosure,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Heading,
	Flex,
	Button,
	FormControl,
	Stack,
	Text,
	Box,
	Grid,
	GridItem,
	Select,
	Input,
} from '@chakra-ui/react';
import { RiAddCircleFill } from 'react-icons/ri';

const SavedActivitiesDrawer = ({ deleteActivityHandler, trip }) => {
	console.log('I AM TRIP: SAD', trip);
	console.log('I AM TRIP.ACT: SAD', trip.activities);
	const btnRef = React.useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div>
			<Flex justifyContent="center">
				<Button
					ref={btnRef}
					onClick={onOpen}
					leftIcon={<RiAddCircleFill />}
					colorScheme="teal"
					size="md"
					style={{ marginBottom: '10px' }}
				>
					View My Activities
				</Button>
			</Flex>

			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
				size="md"
			>
				<DrawerOverlay>
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader background="teal.50" fontSize="2xl">
							Your Activities
						</DrawerHeader>
						<DrawerBody>
							<Grid templateColumns="repeat(2, 1fr)" m={30} padding={2} gap={6}>
								{trip.activities.map((activity) => (
									<SavedActivities
										deleteActivityHandler={deleteActivityHandler}
										activity={activity}
									/>
								))}
							</Grid>
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</div>
	);
};

export default SavedActivitiesDrawer;
