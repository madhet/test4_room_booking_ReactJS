import React from 'react'
import { connect } from 'react-redux'
import { delHall } from '../redux/dispatchers'
import HallCard from './HallCard'

function HallsItem(props) {

  const { user, admin, hasTickets, hallId, hall, delHall, routerProps } = props;

  function clickDeleteHall() {
    delHall(hallId)
  }

  function clickShowTickets() {
    routerProps.history.push(`/tickets/${hallId}`)
  }

  function clickBookRoom() {
    routerProps.history.push(`/halls/${hallId}`)
  }

  return (
    <div className='hall-item'>
      <HallCard hall={hall} />
      <div className='button-panel'>
        <div>
          <button className='booking-button' onClick={clickBookRoom}>{user ? 'Book room' : 'View'}</button>
          {user && hasTickets && <button className='booking-button' onClick={clickShowTickets}>My tickets</button>}
        </div>
        {admin &&
          <div>
            <button className='booking-button' onClick={clickDeleteHall}>Delete hall</button>
          </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  // console.log('hall-item-state', state)
  let hallId = ownProps.hallId;
  let userId = state.user.id;
  let hasTickets = state.tickets.some(ticket => ticket.hall_id === hallId && ticket.user_id === userId)
  return {
    user: userId,
    admin: state.user.admin,
    hall: state.halls.find(hall => hall._id === hallId),
    hasTickets
  }
}

const mapDispatchToProps = {
  delHall,
}

export default connect(mapStateToProps, mapDispatchToProps)(HallsItem)