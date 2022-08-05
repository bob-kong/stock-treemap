import React from 'react'

const DataBoard = (props) => {
  return (
    <div className='border h-100 text-center' style={{minHeight:"50vh"}}>
        <div className='bg-black text-white'>Quantity: {props.data.length}</div>
        {JSON.stringify(props.data)}
    </div>
  )
}

export default DataBoard