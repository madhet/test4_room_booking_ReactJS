import React, { useState } from 'react'
import { connect } from 'react-redux'
import HallForm from './HallForm'
import HallsItem from './HallsItem';

function HallsList(props) {

  const { server, admin, halls, routerProps } = props;

  const [showHallForm, setShowForm] = useState(false)

  function toggleShowForm() {
    setShowForm(!showHallForm)
  }

  if (server) {
    return (
      <div className='substitute-message'>{server}</div>
    )
  }

  return (
    <div>
      {admin &&
        <div className='hall-edit'>
          <div>
            <button className='booking-button' onClick={toggleShowForm}>{showHallForm ? 'Hide' : 'Create hall'}</button>
          </div>
          {showHallForm && <HallForm toggleShowForm={toggleShowForm} />}
        </div>
      }
      {halls && halls.length ? (
        <div className='hall-list'>
          {halls.map(hall =>
            <HallsItem key={hall} hallId={hall} routerProps={routerProps} />
          )}
        </div>
      ) : (
          <div className='substitute-message'>No halls</div>
        )
      }
    </div >
  )
}

const mapStateToProps = state => {
  return {
    server: state.server,
    admin: state.user.admin,
    halls: state.halls.map(hall => hall._id)
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(HallsList)