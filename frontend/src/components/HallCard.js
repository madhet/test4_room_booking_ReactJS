import React from 'react'

export default function HallCard(props) {

  const { title, description, imageURL } = props.hall;

  return (
    <div className='hall-card'>
      <div className='hall-image'>{imageURL ? <img src={imageURL} alt="imageURL" /> : <div>No image</div>}</div>
      <div className='hall-title'>{title}</div>
      <div className='hall-description'>{description}</div>
    </div>
  )
}
