import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { dummy_data } from '../dummy/dummy'
import Box from '../components/Box'
import BoxDefault from '../components/Box_default'
import { distributeData } from '../Service/WeightService'
import DataBoard from '../components/DataBoard'

const Home = () => {
    const [data, setData] = useState([])
    const [rowData, setRowData] = useState()
    const [name, setName] = useState()
    const [weight, setWeight] = useState()
    const [totalWeight, setTotalWeight] = useState()
    const [largestWeight, setLargestWeight] = useState()
    const [value, setValue] = useState()
    const [row, setRow] = useState()
    const [submitData, setSubmitData] = useState({})
    const [containerWidth, setContainerWidth] = useState()
    const [displayTreemap, setDisplayTreemap] = useState(true)

    //dummy data init
    useEffect(() => {
        setData(dummy_data)
    },[])

    //check form data
    useEffect(() => {
        setSubmitData({"name":name,"weight":parseInt(weight),"value":parseInt(value)/100})
    },[name,weight,value])

    //Cal total weight and largest weight when data update
    useEffect(() => {
        setTotalWeight(
            data.reduce((accumulator, object) => {
                return accumulator + object.weight;
              }, 0)
        )
        
        setLargestWeight(
            data.reduce((accumulator, object) => {
                return accumulator = (accumulator > object.weight ? accumulator : object.weight)
            },0)
        )
    },[data])

    //Cal the width of the box
    useEffect(() => {
        setContainerWidth(
            totalWeight/row >= largestWeight ? Math.ceil(totalWeight/row) : largestWeight
        )
    },[row,largestWeight,totalWeight])

    //After submit function
    function handleSubmit(e) {
        e.preventDefault();
        if (data.length >= 50 ) return alert("Max 50 data reached ")
        setData([...data,submitData])
    }

    useEffect(() => {
        distributeData(data,row,setRowData)   
    },[data,row])

    return (
      <div className='container-fluid p-3'>
        <div className='row'>
            <div className='col-xl-4 '>
                <form onSubmit={handleSubmit}>
                    {/**************************************** Input Name **********************************/}
                    <div className="mb-3">
                      <label htmlFor="input_name" className="form-label">Stock Code</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="input_name"  
                        maxLength={50}
                        onChange={(e)=>setName(e.target.value)}
                        required
                    />
                    </div>
                    {/**************************************** Input Weight **********************************/}
                    <div className="mb-3">
                      <label htmlFor="input_weight" className="form-label">Weight of the box display</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="input_weight" 
                        onKeyPress={
                            (e) => {
                                if (!/[0-9]/.test(e.key)) {
                                  e.preventDefault();
                                }
                            }
                        }
                        onChange={(e)=>setWeight(e.target.value)}
                        required
                    />
                    </div>
                    {/**************************************** Input Value **********************************/}    
                    <div>
                        <label htmlFor="input_value" className="form-label">% Change ( % )</label>
                        <input 
                            type="number" 
                            step="any"
                            className="form-control" 
                            id="input_value" 
                            onChange={(e)=>setValue(e.target.value)}
                            required
                        />
                    </div>
                    {/**************************************** Submit Data **********************************/}    
                    <div className='mt-3'>
                        <button className="btn btn-primary" >Submit Data</button>
                    </div>
                </form>

                {/**************************************** Input Row **********************************/}
                <div className='mt-5 row'>
                    <div className='col-10'>
                        <label htmlFor="input_value" className="form-label">Row</label>
                        <input 
                            type="number"
                            className="form-control" 
                            id="input_row"
                            onChange={(e)=> { e.target.value > data.length ? alert("Row too big") : setRow(e.target.value)}}
                        />
                    </div>
                    <div className='col-2'>
                        <button className='btn btn-primary' 
                            onClick={ () => setDisplayTreemap(displayTreemap ? false :true )}
                        >
                            Switch Display Board
                        </button>
                    </div>
                </div>
            </div>

            <div className='col-xl-8 p-3'>
                {displayTreemap ? (
                    <div className='border h-100' style={{minHeight:"50vh"}}>
                        {rowData ? 
                            (rowData.map((obj,rowIndex) => (
                                <div style={{height:`${100/row}%`}} key={rowIndex}> 
                                    {obj.map((box,boxIndex) => (
                                        <Box 
                                            boxWidth = {box.weight}
                                            totalWeight = {totalWeight}
                                            largestWeight = {largestWeight}
                                            containerWidth = {containerWidth}
                                            row = {row}
                                            value = {box.value}
                                            name = {box.name}
                                            key = {boxIndex}
                                        />
                                    ))
                                    }
                                </div>
                                ))
                            ): (
                                <BoxDefault />
                            )
                        }
                    </div>
                ) : ( 
                    <DataBoard 
                        data = {data}
                    />
                )}
                

            </div>
        </div>
      </div>
    )
}

export default Home