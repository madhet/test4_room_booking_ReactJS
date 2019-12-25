import React from 'react'
import { connect } from 'react-redux'
import HallCard from './HallCard'

function HallBook(props) {
  console.log('hall-book-props', props)
  const { hall } = props;
  return (
    <div>
      <HallCard hall={hall} />
      <div>Date picker</div>
      <div>Date picker</div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log('room book state', state)
  console.log('room book ownProps', ownProps)
  let hallId = ownProps.routerProps.match.params.hallId;
  console.log('hallId', hallId)
  return {
    // user: state.user.id,
    // admin: state.user.admin,
    hall: state.halls.find(hall => hall._id === hallId)
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(HallBook)
