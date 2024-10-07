import React, { useState } from 'react'
import Navbar from './Navbar'

function Spline() {
    const [Size , SetSize] = useState(3)
    const [ValueX , SetValueX] = useState(0)
    const [selectedPoints , setSelectedPoints] = useState([])
    const [xValues , setXValues] = useState(Array(3).fill(0))
    const [fx , setFx] = useState(Array(3).fill(0))
    const [Steps , setSteps] = useState([])

    const inputsize = (event) => {
        const size = parseInt(event.target.value)
        SetSize(size)
        setXValues(Array(size).fill(0))
        setFx(Array(size).fill(0))
    }

    const inputX = (event) => {
        SetValueX(event.target.value)
    }

    const handleCheckboxChange = (index) => {
        const updatedPoints = [...selectedPoints]
        updatedPoints[index] = !updatedPoints[index]
        setSelectedPoints[updatedPoints]
    }

    const handleXChange = (index , value) => {
        const updatedX = [...xValues]
        updatedX[index] = parseFloat(value)
        setXValues(updatedX)
    }

    const handleFxChange = (index , value) => {
        const updatedFx = [...fx]
        updatedFx[index] = parseFloat(value)
        setFx(updatedFx)
    }

    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Newton's Divided Difference</h1>
                    </div>
                    <div className='inputxlbi'>
                        <div className='input-group'>
                            <div className='input-item'>
                                <label>Number of points</label>
                                <input
                                    type="number"
                                    value={Size}
                                    onChange={inputsize}
                                />
                            </div>
                            <div className='input-item'>
                                <label>X Value</label>
                                <input
                                    type="number"
                                    value={ValueX}
                                    onChange={inputX}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='checkbox-group'>
                        {Array.from({ length: Size }, (_, i) => (
                            <div key={i}>
                                <input
                                    type="checkbox"
                                    checked={selectedPoints[i] || false}
                                    onChange={() => handleCheckboxChange(i)}
                                />
                                <span>{i + 1} .</span>
                                <input
                                    type="number"
                                    value={xValues[i]}
                                    onChange={(e) => handleXChange(i, e.target.value)}
                                    placeholder={`x${i}`}
                                />
                                <input
                                    type="number"
                                    value={fx[i]}
                                    onChange={(e) => handleFxChange(i, e.target.value)}
                                    placeholder={`f(x${i})`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='calbi'>
                        <button className="btn btn-neutral btn-sm" onClick={calnewton} >
                            Calculate
                        </button>
                    </div>
                    {/* <div className='latex-output'>
                        {Steps.map((step, index) => (
                            <BlockMath key={index} math={step} />
                        ))}
                    </div> */}
                </div>
                {Steps.length > 0 && (
                    <div className='table-container'>
                        {Steps.map((step, idx) => (
                            <div key={idx} className='calculation-step'>
                                <BlockMath key={idx} math={step} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </>
    )
}

export default Spline
