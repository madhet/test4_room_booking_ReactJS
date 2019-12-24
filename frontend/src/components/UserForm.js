import React, { useState } from 'react'
import { connect } from 'react-redux'
import { userSignUp, userSignIn } from '../redux/dispatchers'

function UserForm(props) {
  const { show, signUp, hideForm, userSignUp, userSignIn } = props

  const [userEmail, setEmail] = useState('')
  const [userPwd, setPwd] = useState('')
  const [userAdmin, setAdmin] = useState(false)

  const userSign = (event) => {
    event.preventDefault()
    let body = {
      email: userEmail,
      password: userPwd,
    }
    if (signUp) {
      console.log('userAdmin', userAdmin)
      body.isAdmin = userAdmin
    }
    if (signUp) {
      userSignUp(body)
    } else {
      userSignIn(body)
    }
    setEmail('');
    setPwd('');
    setAdmin(false);
    hideForm();
  }

  return (
    <div className={`user-form${show ? ' active' : ''}`}>
      <div className='sign-form-wrapper'>
        <form className='sign-form'>
          <div>
            <label htmlFor="email">Email </label><input type="email" id="email" name="email" value={userEmail} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password </label><input type="password" id="password" name="password" value={userPwd} onChange={e => setPwd(e.target.value)} />
          </div>
          {signUp &&
            <div>
              <label htmlFor="admin">Admin </label><input type="checkbox" id="admin" name="admin" checked={userAdmin} onChange={e => setAdmin(e.target.checked)} />
            </div>
          }
          <div>
            <button onClick={e => userSign(e)}>{signUp ? 'Sign up' : 'Sign in'}</button>
            <button onClick={hideForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = {
  userSignUp,
  userSignIn
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
