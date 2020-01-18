import React, { useState } from 'react'
import { connect } from 'react-redux'
import { userSignUp, userSignIn } from '../redux/dispatchers'

function UserForm(props) {
  const { show, signUp, hideForm, userSignUp, userSignIn } = props

  const [userEmail, setEmail] = useState('')
  const [userPwd, setPwd] = useState('')
  const [userAdmin, setAdmin] = useState(false)
  const [fieldError, setFieldError] = useState({ email: '', password: '' })

  const fieldTemplate = {
    email: /^([\w.-]+)@([\w-]+\.)+([\w]{2,})$/i,
    password: /^[0-9a-zA-Z]{3,50}$/i,
  }

  function validateField() {
    let isValid = true;
    if (!fieldTemplate.email.test(userEmail)) {
      setFieldError(prevState => {
        return { ...prevState, email: '' }
      })
      isValid = false;
    }
    if (!fieldTemplate.password.test(userPwd)) {
      setFieldError(prevState => {
        return { ...prevState, password: '' }
      })
      isValid = false;
    }
    return isValid;
  }

  function changeInput(event) {
    switch (event.target.name) {
      case 'email': {
        if (fieldError.email) {
          setFieldError(prevState => {
            return { ...prevState, email: 'Incorrect email' }
          })
        }
        setEmail(event.target.value)
        break;
      }
      case 'password': {
        if (fieldError.password) {
          setFieldError(prevState => {
            return { ...prevState, password: 'Incorrect password' }
          })
        }
        setPwd(event.target.value)
        break;
      }
      default:
        break;
    }
  }

  const userSign = (event) => {
    event.preventDefault()
    if (!validateField()) return;
    let body = {
      email: userEmail,
      password: userPwd,
    }
    if (signUp) {
      body.isAdmin = userAdmin
    }
    if (signUp) {
      userSignUp(body)
    } else {
      userSignIn(body)
    }
    closeForm();
  }

  function clearForm() {
    setEmail('');
    setPwd('');
    setAdmin(false);
    setFieldError({ email: '', password: '' })
  }

  function closeForm() {
    clearForm();
    hideForm();
  }

  return (
    <div className={`user-form-wrapper${show ? ' open' : ''}`} onClick={closeForm} >
      <form className='user-form' onClick={e => e.stopPropagation()} >
        <div className='input-wrapper'>
          <label className='input-label' htmlFor="email">Email:</label>
          <input className={'input-field' + (fieldError.email ? ' error' : '')} type="email" id="email" name="email" value={userEmail} onChange={changeInput} />
          <div className={'input-error' + (fieldError.email ? ' error' : '')}>Incorrect email</div>
        </div>
        <div className='input-wrapper'>
          <label className='input-label' htmlFor="password">{signUp ? 'Password (min 3 character):' : 'Password:'}</label>
          <input className={'input-field' + (fieldError.password ? ' error' : '')} type="password" id="password" name="password" value={userPwd} onChange={changeInput} />
          <div className={'input-error' + (fieldError.password ? ' error' : '')}>Incorrect password</div>
        </div>
        {signUp &&
          <div>
            <label className='input-label inline-label' htmlFor="admin">Admin</label>
            <input className='input-field' type="checkbox" id="admin" name="admin" checked={userAdmin} onChange={e => setAdmin(e.target.checked)} />
          </div>
        }
        <button className='booking-button input-button' onClick={userSign}>{signUp ? 'Sign up' : 'Sign in'}</button>
      </form>
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
