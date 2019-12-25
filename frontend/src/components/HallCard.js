import React from 'react'

export default function HallCard(props) {
  // console.log('hall card props', props)
  const { id, title, description, imageURL } = props.hall;

  return (
    <div>
      <div><img src={imageURL} alt="" /></div>
      <div>{id}</div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  )
}
