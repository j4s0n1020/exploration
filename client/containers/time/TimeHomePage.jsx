import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import IntroText from '../../components/IntroText';
import NewTripDrawer from '../../components/NewTrip';
import TripListContainer from './TripList';

class TimeHomePage extends Component {
	componentDidMount() {
		console.log('I AM HOME PAGE PROPS', this.props);
		this.props.handleFetchState();
	}

	handleNewTrip = (title, destination, dates_known, tripStart, tripEnd) => {
		fetch('/imagefetch/' + destination.value.place_id, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((body) => {
				const results = body.result.photos;
				//console.log(results)
				let locationphotos = [];
				for (let i = 0; i < results.length; i++) {
					locationphotos.push(
						`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${results[i].photo_reference}&key=AIzaSyD1C3IhMoufeZNQ0FEC2b5B2wyr6gVBMfo`
					);
				}

				let start_date, end_date;
				dates_known === 'day' || dates_known === 'month'
					? (start_date = tripStart.toLocaleDateString('en-US'))
					: (start_date = 'Soon!');
				dates_known === 'day' || dates_known === 'month'
					? (end_date = tripEnd.toLocaleDateString('en-US'))
					: (end_date = 'Soon!');

				this.handleTripToBackEnd(
					title,
					destination,
					destination.value.place_id,
					start_date,
					end_date,
					locationphotos,
					dates_known
				);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	handleTripToBackEnd = (
		title,
		destination,
		place_id,
		start_date,
		end_date,
		locationphotos,
		dates_known
	) => {
		const newTripForBackEnd = {
			title,
			destination: destination.label,
			place_id,
			start_date,
			end_date,
			locationphotos,
			dates_known,
		};
		fetch('/api/trips/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTripForBackEnd),
		})
			.then((response) => response.json())
			.then((data) => {
				//console.log('Success:', data);
				const trips = [...this.props.trips, data.trip];
				this.props.handleNewTrip(trips);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	deleteTripHandler = (event) => {
		const deleteTripId = Number(event.target.id);
		fetch(`/api/trips/${deleteTripId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.status === 200) return res.json();
				return res.json().then((data) => {
					throw data;
				});
			})
			.then((data) => {
				const trips = this.props.trips.filter((el) => el.id !== deleteTripId);
				const message = data.message;
				this.props.handleDelete(trips, message);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		return (
			<>
				<NavBar />
				<IntroText />
				<NewTripDrawer
					handleNewTrip={this.handleNewTrip}
					saveLocation={this.props.saveLocation}
				/>
				<TripListContainer
					deleteTripHandler={this.deleteTripHandler}
					trips={this.props.trips}
					message={this.props.message}
					{...this.props}
				/>
				<Footer />
			</>
		);
	}
}

export default TimeHomePage;
