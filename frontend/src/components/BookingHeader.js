import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AuthPanel from './AuthPanel/AuthPanel'
import { userSetSigned, getHalls, getTickets } from '../redux/dispatchers'

function BookingHeader(props) {

  const { userSetSigned, getHalls, getTickets } = props;

  useEffect(() => {
    userSetSigned();
  })

  useEffect(() => {
    getHalls();
  })

  useEffect(() => {
    getTickets();
  })

  return (
    <div>
      <header className='app-header'>
        <div><NavLink to='/'>Room booking</NavLink></div>
        <AuthPanel />
      </header>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = {
  userSetSigned,
  getHalls,
  getTickets
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingHeader)