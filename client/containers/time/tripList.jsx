import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	createStandaloneToast,
	
	Flex,
	Button,

	Grid,
	GridItem,
	
} from '@chakra-ui/react';
import TripPlanned from '../../components/tripComponent';

const TripListContainer = ({ trips, deleteTripHandler, message }) => {
	const toast = createStandaloneToast();

	console.log('TRIPS FROM TRIPLIST: ', trips);
	return (
		<>
		<Flex m={5} align='center' justify='center'>
				<Grid templateColumns='repeat(3, 1fr)'>
					{trips.map(
						({
							id,
							title,
							destination,
							start_date,
							end_date,
							place_id,
							dates_known,
							member_id,
						}) => (
							<>
									<GridItem w='300px' background='#e8e8e8' borderColor='#c8c8c8' border='1px 50%' borderRadius='25px' align='center' pb={3} m={2}>
										<TripPlanned
											key={`trip_${id}`}
											title={title}
											destination={destination}
											start_date={start_date}
											end_date={end_date}
											place_id={place_id}
											dates_known={dates_known}
											member_id={member_id}
										/>
										<Link
											to={{
												pathname: `/time/trip/${member_id}/${id}`,
												state: { param: `${id}` },
											}}
										>
											<Button type="button" m={2} colorScheme="teal" w='200px' color='gray.50'>
												Explore
											</Button>
										</Link>
										<Button
											m={2}
											id={id}
											type="button"
											colorScheme="red"
											color='gray.50'
											onClick={deleteTripHandler}
											w='200px'
										>
											Delete Trip
										</Button>
									</GridItem>
							</>
						)
					)}
				</Grid>
		</Flex>
		</>
	);
};

export default TripListContainer;
