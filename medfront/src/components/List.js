import React from 'react'
import {AiOutlineMinusCircle, AiOutlineDelete} from 'react-icons/ai'

export default function List(props) {
  return (
    <>
    <div className='list'>
      <div className='medName'>
      <h2>{props.name}</h2>
      </div>
      <div className='desc'>
        <p>{props.email}</p>
      </div>
      <div className='buttons'>
      <button className='minus'>Minus</button>
      <button className='delete'>Delete</button>
      <button className='update'>Update</button>
      </div>
    </div>
    </>
  )
}

