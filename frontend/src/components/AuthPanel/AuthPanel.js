import React, { useState } from 'react'
import { connect } from 'react-redux'
import { userSignOut } from '../../redux/dispatchers'
import UserForm from '../UserForm'

function AuthPanel(props) {
  const { mail, userSignOut } = props;

  const [signUp, setSignUp] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const clickSignUp = () => {
    setSignUp(true);
    setShowForm(true)
  }

  const clickSignIn = () => {
    setSignUp(false);
    setShowForm(true)
  }

  const hideForm = () => {
    setShowForm(false)
  }

  // console.log('panel props', props)
  return (
    <div className='auth-panel'>
      {
        mail ? (
          <div>Logged as {mail} <button onClick={userSignOut}>Sign out</button></div>
        ) : (
            <div><button onClick={clickSignIn}>Sign in</button> / <button onClick={clickSignUp}>Sign up</button></div>
          )
      }
      <UserForm signUp={signUp} show={showForm} hideForm={hideForm} />
    </div>
  )
}

const mapStateToProps = state => {
  // console.log(state)
  return { mail: state.user.mail };
}

const mapDispatchToProps = {
  userSignOut
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPanel)