import React, { useState, useEffect } from 'react';
import './main.css'
import AuthPanel from './components/AuthPanel/AuthPanel'

function App() {
  const [currentUser, setCurrentUser] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [currentIsAdmin, setCurrentAdmin] = useState(false)
  const [currentToken, setCurrentToken] = useState('')

  const [halls, setHalls] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setCurrentUser(localStorage.getItem('user'))
      setCurrentEmail(localStorage.getItem('email'))
      setCurrentToken(localStorage.getItem('token'))
      setCurrentAdmin(localStorage.getItem('admin'))
    }
  }, [])

  // useEffect(() => {
  //   if (localStorage.getItem('CurrentUser')) {
  //     setCurrentUser(localStorage.getItem('CurrentUser'))
  //   }
  // }, [])

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
  }

  const signOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setCurrentEmail("");
  };

  return (
    <div className="App">
      <header className='app-header'><div>Room booking</div> <AuthPanel email={currentEmail} logOut={signOut} /></header>
      <div>Title</div>
      <div>Halls</div>
    </div>
  );
}

export default App;
