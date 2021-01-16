/* eslint-disable max-len */
import React from 'react';
import EachActivity from './EachActivity';
import Activity from '../../../components/activityComponent';

import {
	Center,
	Flex,
	Button,
	Box,
	Grid,
	GridItem,
	Text,
	StackDivider,
	Heading,
} from '@chakra-ui/react';
const ActivityList = ({
	searchResults,
	addActivityHandler,
	onClose,
	toggle,
}) => {
	return (
		<>
			<Box>
				<Grid templateColumns="repeat(2, 1fr)" m={30} padding={2} gap={6}>
					{searchResults.map((activity) => (
						<Activity
							addActivityHandler={addActivityHandler}
							toggle={toggle}
							activity={activity}
							onClose={onClose}
						/>
					))}
				</Grid>
			</Box>
		</>
	);
};

export default ActivityList;
