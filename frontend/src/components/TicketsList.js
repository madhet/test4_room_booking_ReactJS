import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { setActiveTicket, delTicket } from '../redux/dispatchers'

function TicketsList(props) {

  const { hallId, tickets, setActiveTicket, delTicket, routerProps } = props;

  function clickEditTicket(ticketId) {
    setActiveTicket(ticketId)
    routerProps.history.push(`/halls/${hallId}`)
  }

  if (tickets.length) {
    return (
      <ul className='ticket-list'>
        {tickets.map(ticket =>
          <li key={ticket._id} className='ticket-item'>
            <div className='ticket-title'>{ticket.title}</div>
            <div className='ticket-date'>{'From: ' + (moment(ticket.from).hours() ? moment(ticket.from).format('YYYY-MM-DD HH:mm') : moment(ticket.from).format('YYYY-MM-DD'))}</div>
            <div className='ticket-date'>{'To: ' + (moment(ticket.to).hours() ? moment(ticket.to).format('YYYY-MM-DD HH:mm') : moment(ticket.to).format('YYYY-MM-DD'))}</div>
            <div>
              <button className='booking-button' onClick={() => clickEditTicket(ticket._id)}>Edit</button>
              <button className='booking-button' onClick={() => delTicket(ticket._id)}>Delete</button>
            </div>
          </li>
        )}
      </ul>
    )
  }

  return (
    <ul className='ticket-list'>
      <div className='substitute-message'>You have no tickets for this room.</div>
    </ul>
  )
}

const mapStateToProps = (state, ownProps) => {
  let hallId = ownProps.routerProps.match.params.hallId;
  let userId = state.user.id;
  return {
    hallId,
    tickets: state.tickets.filter(ticket => ticket.hall_id === hallId && ticket.user_id === userId)
  }
}

const mapDispatchToProps = {
  setActiveTicket,
  delTicket,
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketsList);