import React, { useState } from 'react'
import { connect } from 'react-redux'
import HallForm from './HallForm'
import HallsItem from './HallsItem';

function HallsList(props) {

  const { user, admin, halls, routerProps } = props;
  // console.log('hall list props', props)
  const [showHallForm, setShowForm] = useState(false)

  function toggleShowForm() {
    setShowForm(!showHallForm)
  }

  return (
    <div>
      <div>
        {admin && <div><button onClick={toggleShowForm}>Create hall</button></div>}
        {showHallForm && <HallForm toggleShowForm={toggleShowForm} />}
      </div>
      {halls && halls.length ? (
        <div>
          {halls.map(hall =>
            <HallsItem key={hall} hallId={hall} routerProps={routerProps} />
          )}
        </div>
      ) : (
          <div>No halls</div>
        )
      }
    </div >
  )
}

const mapStateToProps = state => {
  // console.log('halls list state', state)
  return {
    user: state.user.id,
    admin: state.user.admin,
    halls: state.halls.map(hall => hall._id)
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(HallsList)