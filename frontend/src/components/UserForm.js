import React, { useState } from 'react'
import restClient from '../utils/restClient'

export default function UserForm(props) {
  const { show, signUp, hideForm } = props

  const [userEmail, setEmail] = useState('')
  const [userPwd, setPwd] = useState('')
  const [userAdmin, setAdmin] = useState(false)

  // console.log(userEmail)
  // console.log(userPwd)
  // console.log(userIsAdmin)

  const userSign = (event) => {
    event.preventDefault()
    let body = {
      email: userEmail,
      password: userPwd,
    }
    if (signUp) body.isAdmin = userAdmin
    if (signUp) {
      restClient.userSignUp(body).then(data => {
        console.log('data', data)
      })
    } else {
      restClient.userSignIn(body).then(data => {
        console.log('data', data)
        localStorage.setItem('user', data._id)
        localStorage.setItem('email', userEmail)
        localStorage.setItem('token', data.token)
      })
    }
    setEmail('');
    setPwd('');
    setAdmin('');
    hideForm();
  }

  return (
    <div className={`user-form${show ? ' active' : ''}`}>
      <form>
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
        </div>
      </form>
    </div>
  )
}
