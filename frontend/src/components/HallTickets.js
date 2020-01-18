import React from 'react'
import { connect } from "react-redux";
import HallCard from './HallCard'
import TicketsList from './TicketsList'
import { ProgressSpinner } from 'primereact/progressspinner';

function HallTickets(props) {

  const { user, hall, routerProps } = props;

  function clickBackButton() {
    routerProps.history.goBack()
  }

  function clickBookRoom() {
    routerProps.history.push(`/halls/${hall._id}`)
  }

  if (hall) {
    return (
      <div className='hall-tickets'>
        <button className='booking-button' onClick={clickBackButton}>Back</button>
        <div className='hall-card-container'>
          <HallCard hall={hall} />
          <div>
            {user && <button className='booking-button' onClick={clickBookRoom}>Book room</button>}
          </div>
        </div>
        <TicketsList routerProps={routerProps} />
      </div>
    )
  }

  return <ProgressSpinner />
}

const mapStateToProps = (state, ownProps) => {
  let hallId = ownProps.routerProps.match.params.hallId;
  return {
    user: state.user.id,
    hall: state.halls.find(hall => hall._id === hallId),
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(HallTickets);
