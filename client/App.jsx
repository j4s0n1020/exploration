import React, { useState, Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import HomePage from './containers/HomePage';
import Profile from './containers/time/Profile';
import Inspiration from './containers/time/Inspiration';
import TimeHomePage from './containers/time/TimeHomePage';
import PrivateRoute from './privateRoute';
import NotFound from './containers/404';
// import ResetPasswordPage from './containers/ResetPasswordPage';

import TripPage from './containers/time/TripPage';
import ActivityList from './containers/time/Activities/ActivityList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [], // upcoming
      savedTrips: [],
      pastTrips: [],
      message: '',
      inputLocation: '',
      inspirationTrips: [],
      favoriteTripIds: [],
    };
  }

  saveLocation = (inputLocation) => {
    console.log('INPUT LOCATION:', inputLocation);
    this.setState({ inputLocation: inputLocation });
  };

  handleNewTrip = (trips) => {
    this.setState({ trips: trips });
  };

  handleAddedActivity = (trips) => {
    this.setState({ trips: trips });
  };

  handleDelete = (trips, message) => {
    this.setState({ trips: trips, message: message }, () =>
      console.log(this.state)
    );
  };

  handleFavorite = (inspirationTripId) => {
    console.log('in handleFavorite');

    let favoriteTripIdsUpdate = [...this.state.favoriteTripIds];

    const inspirationTripsUpdate = this.state.inspirationTrips.map((trip) => {
      if (trip.id === inspirationTripId) {
        // delete favorite
        if (trip.favorite) {
          favoriteTripIdsUpdate = favoriteTripIdsUpdate.filter((trip) => {
            return trip != inspirationTripId;
          });
        } else {
          favoriteTripIdsUpdate.push(trip.id);
        }

        const tripUpdate = { ...trip, favorite: !trip.favorite };
        return tripUpdate;
      }
      return trip;
    });

    this.setState({
      inspirationTrips: inspirationTripsUpdate,
      favoriteTripIds: favoriteTripIdsUpdate,
    });

    fetch('/api/member/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ saved_trips: favoriteTripIdsUpdate }),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log('HANDLEFAVORITE FETCH RESPONSE MESSAGE', data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  handleFetchState = (whichTrips) => {
    // whichTrips: upcoming/past/inspiration/all
    console.log('calling FETCH', "WHICH TRIPS IS:", whichTrips)
    fetch(`/api/trips/?type=${whichTrips}`) // `api/trips/?=${condition}`  // api/trips/?=all
      .then((response) => response.json())
      .then((result) => {
        console.log('RES', result);
        const {
          trips,
          savedTrips,
          pastTrips,
          inspirationTrips,
          favoriteTripIds,
        } = result;
        // console.log('BEFORE MAPPING FAV', inspirationTrips)
        console.log('FAVORITE TRIP IDS: ', favoriteTripIds);
        console.log('ROUTE', whichTrips);
        if (whichTrips === 'inspiration' && favoriteTripIds) {
          inspirationTrips.map((trip) => {
            // console.log(trip.id)
            trip.favorite = favoriteTripIds.includes(trip.id);
          });
          // console.log('AFTER MAPPING FAV', inspirationTrips)
        }
        this.setState({
          trips,
          savedTrips,
          pastTrips,
          inspirationTrips,
          favoriteTripIds,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  handleFetchYelp = (location, tripId) => {
    // console.log(this.state);
    fetch('/api/yelp/' + location, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log('result', result);
        let trips = [...this.state.trips];
        let trip = trips.filter((el) => el.id === tripId);
        trip = trip[0];
        let index = this.state.trips.indexOf(trip);
        let newActivites = result.result;
        trip.activities = newActivites;
        trips.splice(index, 1, trip);
        this.setState({ trips });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  render() {
    return (
      <div id='app' className='main-container'>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/signup' exact component={SignupPage} />
          {/* <Route path="/resetpassword" exact component={ResetPasswordPage} /> */}
          <PrivateRoute
            path='/time/home'
            component={TimeHomePage}
            trips={this.state.trips}
            handleNewTrip={this.handleNewTrip}
            handleStateUpdate={this.handleStateUpdate}
            handleDelete={this.handleDelete}
            handleFetchState={this.handleFetchState}
            saveLocation={this.saveLocation}
          />
          {/* <PrivateRoute path="/time/trip" exact component={TripPage} /> */}
          <PrivateRoute
            path='/time/trip/:member_id/:tripId'
            component={TripPage}
            handleFetchYelp={this.handleFetchYelp}
            handleAddedActivity={this.handleAddedActivity}
          />
          <PrivateRoute
            path='/time/profile/:userid'
            component={Profile}
            trips={this.state.trips}
            savedTrips={this.state.savedTrips}
            pastTrips={this.state.pastTrips}
            handleFetchState={this.handleFetchState}
          />
          <PrivateRoute
            path='/time/inspiration'
            component={Inspiration}
            inspirationTrips={this.state.inspirationTrips}
            savedTrips={this.state.savedTrips}
            handleFetchState={this.handleFetchState}
            handleFavorite={this.handleFavorite}
          />

          <PrivateRoute path='*' component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
