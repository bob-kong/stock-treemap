import React from 'react'

const Box = (props) => {
    const zeroValue = "text-center border text-bg-secondary"
    const positiveValue = "text-center border text-bg-success"
    const negative = "text-center border text-bg-danger"
    return (
        <div style={{
            display:'inline-block',
            width:`${props.boxWidth/props.containerWidth*100}%`,
            minHeight:'10vh',
            height:'100%',
            lineHeight:"100%",
            }} 
            className={ 
                        props.value == 0 ? zeroValue 
                                         : props.value > 0 ? positiveValue : negative
                      }
        >
            <div className='position-relative' style={{top:"40%",fontSize:"1em"}}>
                {props.name}<br/>{(props.value*100).toFixed(2)}%
            </div>
        </div>
    )
}

export default Box