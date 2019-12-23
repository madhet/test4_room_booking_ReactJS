import React, { useState } from 'react'
import UserForm from '../UserForm'

export default function AuthPanel(props) {
  const { email, logOut } = props;
  // console.log(props)

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

  return (
    <div className='auth-panel'>
      {
        email ? (
          <div>Logged as {email} <button onClick={logOut}>Sign out</button></div>
        ) : (
            <div><span onClick={clickSignIn}>Sign In</span> / <span onClick={clickSignUp}>Sign Up</span></div>
          )
      }
      <UserForm signUp={signUp} show={showForm} hideForm={hideForm} />
    </div>
  )
}
