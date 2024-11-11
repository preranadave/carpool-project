import React from 'react'
import RideCards from './RideCards'

function SearchedRideList({ rides }) {

  return (
    <div className="">
    {rides &&
      rides.map((ride) => (
        <RideCards
          key={ride.id}
          from={ride.Origin}
          to={ride.Destination}
          ridedate={ride.RideDate}
          ridetime={ride.RideTime}
          availableseats={ride.AvailableSeats}
          price={ride.Price}
          status={ride.Status}
          driverprofile={ride.DriverProfile}
          drivername={ride.DriverName}
          id={ride.id}
        />
      ))}
  </div>
  )
}

export default SearchedRideList