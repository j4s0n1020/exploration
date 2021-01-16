const { transitionParser } = require('@chakra-ui/react');
const Pool = require('../model/database.js');

const tripController = {};

tripController.createTrip = async (req, res, next) => {
  const {
    title,
    destination,
    start_date,
    end_date,
    place_id,
    locationphotos,
    dates_known,
  } = req.body;

  const member_id = req.session.passport.user;

  if (
    title === undefined ||
    destination === undefined ||
    place_id === undefined ||
    locationphotos === undefined ||
    dates_known === undefined ||
    !dates_known ||
    !locationphotos ||
    !place_id ||
    !title ||
    !destination
  ) {
    return next({
      log: 'tripController.createTrip: Request parameters are empty',
      status: 406,
      message: {
        err: 'Request parameters are empty',
      },
    });
  }

  try {
    const query =
      'INSERT INTO trip (title, destination, place_id, start_date, end_date, locationphotos, dates_known, member_id) VALUES ($1, $2 , $3, $4, $5, $6, $7, $8) RETURNING *';
    const trip = await Pool.query(query, [
      title,
      destination,
      place_id,
      start_date,
      end_date,
      locationphotos,
      dates_known,
      member_id,
    ]);

    if (trip.rowCount) {
      res.locals.trip = trip.rows[0];
      console.log(res.locals.trip);
      next();
    }
  } catch (error) {
    return next({
      log: `tripController.createTrip: ${error}`,
      status: 500,
      message: {
        err: 'Internal server error',
      },
    });
  }
};

tripController.getTrips = async (req, res, next) => {
  const member_id = req.session.passport.user;
  console.log('req query', req.query);
  let query = '';
  if (req.query.type === 'all') {
    // query = 'SELECT * FROM trip WHERE member_id = $1';
    query =
      'SELECT trip.id,title,destination,start_date,end_date,member_id,place_id,dates_known,locationphotos FROM trip where member_id=$1 UNION SELECT trip.id,title,destination,start_date,end_date,member_id,place_id,dates_known,locationphotos FROM trip JOIN member ON member.id=$1 AND trip.id=ANY(saved_trips)';
  } else if (req.query.type === 'inspiration') {
    query = 'SELECT * FROM trip WHERE member_id <> $1';
  } else {
    query = 'SELECT * FROM trip WHERE member_id = $1';
  }
//SELECT DISTINCT on (trip.id) trip.id, trip.title, member_id, member.username FROM trip JOIN member ON member_id <> 1
  try {
    const trips = await Pool.query(query, [member_id]);

    const { rows } = trips;
    // 'all' is user's past/upcoming/and saved trips
    if (req.query.type === 'all') {
      const currentDate = new Date();

      res.locals.pastTrips = rows.filter((trip) => {
        const tripEndDate = new Date(trip.end_date);
        return tripEndDate < currentDate && trip.member_id === member_id;
      });
      res.locals.savedTrips = rows.filter((trip) => {
        return trip.member_id !== member_id;
      });
      // trips is upcomingTrips
      res.locals.trips = rows.filter((trip) => {
        const tripEndDate = new Date(trip.end_date);
        return tripEndDate >= currentDate && trip.member_id === member_id;
      });
    } else if (req.query.type === 'inspiration'){
      res.locals.inspirationTrips = rows;
      let insp_sTripsQuery = 'SELECT saved_trips FROM member WHERE id = $1'
      try{
        const insp_sTrips = await Pool.query(insp_sTripsQuery, [member_id]);
        const { rows } = insp_sTrips;
        // console.log(rows)
        res.locals.favoriteTripIds = rows[0].saved_trips;
      } catch (error) {
        return next({
          log: `tripController.getTrips: ${error}`,
          status: 500,
          message: {
            err: 'Internal server error',
          },
        });
      }
    }
    
    else {
      res.locals.trips = rows; // user's own trips
    }
    // console.log('PAST TRIPS: ', res.locals.pastTrips);
    // console.log('INSPIRATION ALL TRIPS: ', res.locals.inspirationTrips);
    console.log('INSPIRATION SAVED TRIPS: ', res.locals.savedTrips);
    next();
  } catch (error) {
    return next({
      log: `tripController.getTrips: ${error}`,
      status: 500,
      message: {
        err: 'Internal server error',
      },
    });
  }
};

tripController.updateTrip = async (req, res, next) => {
  const { id } = req.params;
  const { title, destination, place_id, start_date, end_date } = req.body;

  if (!id) {
    return next({
      log: 'tripController.updateTrip: Invalid trip id',
      status: 406,
      message: {
        err: 'Invalid trip id',
      },
    });
  }

  if (
    title === undefined ||
    destination === undefined ||
    place_id === undefined ||
    !place_id ||
    !title ||
    !destination
  ) {
    return next({
      log: 'tripController.updateTrip: Request parameters are empty',
      status: 406,
      message: {
        err: 'Request parameters are empty',
      },
    });
  }

  try {
    const query =
      'UPDATE trip SET destination = $1, start_date = $2, end_date = $3, title = $4, place_id = $5 WHERE id = $6 RETURNING *';
    const trip = await Pool.query(query, [
      destination,
      start_date,
      end_date,
      title,
      place_id,
      id,
    ]);

    if (trip.rowCount) {
      res.locals.trip = trip.rows[0];
      next();
    }
  } catch (error) {
    next({
      log: `tripController.updateTrip: ${error}`,
      status: 500,
      message: {
        err: 'Internal server error',
      },
    });
  }
};

tripController.deleteTrip = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    next({
      log: 'tripController.deleteTrip: Invalid trip id.',
      status: 406,
      message: {
        err: 'Invalid trip id.',
      },
    });
  }

  try {
    const activityQuery = 'DELETE FROM activity WHERE trip_id = $1';
    const activitiesDeleted = await Pool.query(activityQuery, [id]);
    const query = 'DELETE FROM trip WHERE id = $1';
    const tripDeleted = await Pool.query(query, [id]);

    if (tripDeleted.rowCount) next();
  } catch (error) {
    return next({
      log: `tripController.deleteTrip: ${error}`,
      status: 500,
      message: {
        err: 'Internal server error',
      },
    });
  }
};

tripController.getTrip = async (req, res, next) => {
  const sessionId = req.session.passport.user;
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM trip WHERE id = $1';
    const trip = await Pool.query(query, [id]);

    const {
      rowCount,
      rows: [data],
    } = trip;
    console.log(data);
    // if (rowCount) {
    res.locals.trip = data;
    res.locals.trip.sessionId = sessionId;
    console.log(res.locals.trip);
    next();
    // }
  } catch (error) {
    return next({
      log: `tripController.getTrip: ${error}`,
      status: 500,
      message: {
        err: 'Internal server error',
      },
    });
  }
};

module.exports = tripController;
