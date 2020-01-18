import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AuthPanel from './AuthPanel'

function BookingHeader(props) {

  const { server } = props;

  return (
    <header className='app-header'>
      <div className='app-logo'><NavLink to='/'>Room booking</NavLink></div>
      {!server && <AuthPanel />}
    </header>
  )
}

const mapStateToProps = state => {
  return { server: state.server };
}

const mapDispatchToProps = {
}



export default connect(mapStateToProps, mapDispatchToProps)(BookingHeader);