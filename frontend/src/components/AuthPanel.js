import React, { useState } from 'react'
import { connect } from 'react-redux'
import { userSignOut } from '../redux/dispatchers'
import UserForm from './UserForm'

function AuthPanel(props) {

  const { mail, userSignOut } = props;

  const [signUp, setSignUp] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const clickSignUp = () => {
    setSignUp(true);
    setShowForm(true);
  }

  const clickSignIn = () => {
    setSignUp(false);
    setShowForm(true);
  }

  const hideForm = () => {
    setShowForm(false)
  }

  return (
    <div className='auth-panel'>
      {
        mail ? (
          <div>
            <span className='auth-panel-text'>Logged as {mail} </span>
            <button className='booking-button' onClick={userSignOut}>Sign out</button>
          </div>
        ) : (
            <div>
              <button className='booking-button' onClick={clickSignIn}>Sign in</button>
              <span className='auth-panel-text'>/</span>
              <button className='booking-button' onClick={clickSignUp}>Sign up</button>
            </div>
          )
      }
      <UserForm signUp={signUp} show={showForm} hideForm={hideForm} />
    </div>
  )
}

const mapStateToProps = state => {
  return { mail: state.user.mail };
}

const mapDispatchToProps = {
  userSignOut
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPanel)