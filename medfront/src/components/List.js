import React from 'react'

export default function List(props) {
  return (
    <div className='list'>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <button>+</button>
      <button>-</button>
      <button>x</button>
    </div>
  )
}

