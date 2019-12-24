import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AuthPanel from './AuthPanel/AuthPanel'
import { userSetSigned } from '../redux/dispatchers'

function BookingHeader(props) {

  const { userSetSigned } = props;

  useEffect(() => {
    userSetSigned();
  })

  return (
    <div>
      <header className='app-header'>
        <div>Room booking</div>
        <AuthPanel />
      </header>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = {
  userSetSigned
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingHeader)