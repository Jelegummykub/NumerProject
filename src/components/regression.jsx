import 'katex/dist/katex.min.css';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';


function Regression() {
    const [Size , SetSize] = useState(3)
    const [ValueX , SetValueX] = useState(0)
    const [xValues , setXValues] = useState(Array(3).fill(0))
    const [fx , setFx] = useState(Array(3).fill(0))
    const [Steps , setSteps] = useState([])

    const inputsize = (event) => {
        const size = parseInt(event.target.value)
        setFx(Array(size).fill(0))
        setXValues(Array(size).fill(0))
        SetSize(size)
    }

    const inputX = (event) => {
        SetValueX(event.target.value)
    }

    const handleFxChange = (index , value) => {
        const updatedFx = [...fx]
        updatedFx[index] = parseFloat(value)
        setFx(updatedFx)
    }

    const handleXChange = (index , value) => {
        const updatedX = [...xValues]
        updatedX[index] = parseFloat(value)
        setXValues(updatedX)
    }

    const calLeast = () => {
        let StepsArray = []
        const n = Size
        // console.log(n)
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0

        for (let i = 0; i < n; i++) {
            sumX += xValues[i]
            sumY += fx[i]
            sumXY += xValues[i] * fx[i]
            sumX2 += xValues[i] * xValues[i]
        }

        const denominator = (n * sumX2) - (sumX * sumX)
        const slope = (n * sumXY - sumX * sumY) / denominator
        const intercept = (sumY * sumX2 - sumX * sumXY) / denominator
        const result = (slope*ValueX) + (intercept)

        StepsArray.push(`Slope (m) = ${slope.toFixed(4)}`)
        StepsArray.push(`Intercept (b) = ${intercept.toFixed(4)}`)
        StepsArray.push(`y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`)
        StepsArray.push(`F(${ValueX}) = ${result.toFixed(4)} #`)

        setSteps(StepsArray)

        
    
    }

    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Least-Squares Regression</h1>
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
                        <button className="btn btn-neutral btn-sm" onClick={calLeast} >
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

export default Regression
