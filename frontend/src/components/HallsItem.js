import React from 'react'
import { connect } from 'react-redux'
import { delHall } from '../redux/dispatchers'
import { NavLink } from 'react-router-dom'
import HallCard from './HallCard'

function HallsItem(props) {
  // console.log('hall item props', props)
  const { user, admin, hallId, hall, auth, delHall } = props;
  return (
    <div>
      <HallCard hall={hall} />
      {/* <div><img src={hall.imageURL} alt="" /></div>
      <div>{hallId}</div>
      <div>{hall.title}</div>
      <div>{hall.description}</div> */}
      {admin && <button onClick={() => delHall(hallId, auth)}>Delete hall</button>}
      {
        user &&
        <div>
          <NavLink to={`/halls/${hallId}`}>Book room</NavLink>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  // console.log('hall item state', state)
  return {
    user: state.user.id,
    admin: state.user.admin,
    auth: state.user.token,
    hall: state.halls.find(hall => hall._id === ownProps.hallId)
  }
}

const mapDispatchToProps = {
  delHall
}

export default connect(mapStateToProps, mapDispatchToProps)(HallsItem)