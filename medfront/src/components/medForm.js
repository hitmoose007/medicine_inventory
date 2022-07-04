import React from 'react'

export default function medForm(props) {
  return (
    <div>
        <form className=' bg-slate-200 w-2/5 m-auto p-7 rounded-md'>
            <input className='border-2 border-gray-600 p-2 w-full' type="text" value={props.name} onChange={e => props.handleChange('name', e.target.value)}/>
            <input className='border-2 border-gray-600 p-2 w-full' type="text" value={props.description} onChange={e => props.handleChange('description', e.target.value)}/>
            <input className='border-2 border-gray-600 p-2 w-full' type="text" value={props.price} onChange={e => props.handleChange('price', e.target.value)}/>
            <input className='border-2 border-gray-600 p-2 w-full' type="text" value={props.quantity} onChange={e => props.handleChange('quantity', e.target.value)}/>
            <input className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-4 rounded focus:outline-none focus:shadow-outline' type="submit" value="Submit" onClick={props.handleSubmit}/>
        </form>
    </div>
  )
}

