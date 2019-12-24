import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import HallForm from './HallForm'
import { getHalls } from '../redux/dispatchers'

function HallsViewer(props) {

  const { user, halls, getHalls } = props;
  console.log('props', props)
  const [showHallForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!halls) {
      getHalls()
    }
  }, [halls])

  function toggleShowForm() {
    setShowForm(!showHallForm)
  }

  return (
    <div>
      {user && <div><button onClick={toggleShowForm}>Create hall</button></div>}
      {showHallForm && <HallForm />}
      {halls && halls.length ? (
        <div>Halls</div>
      ) : (
          <div>No halls</div>
        )
      }
    </div >
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    user: state.user.authUser,
    halls: state.hall.halls
  }
}

const mapDispatchToProps = {
  getHalls
}

export default connect(mapStateToProps, mapDispatchToProps)(HallsViewer)