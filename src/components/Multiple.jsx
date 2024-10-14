import 'katex/dist/katex.min.css';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';


function Multiple() {
    const [numbervariable, Setnumbervariable] = useState(2)
    const [numPoint, setNumPoints] = useState(3)
    const [values, setValues] = useState(Array.from({ length: 3 }, () => Array(2).fill(0)))
    const [fx, setFx] = useState(Array(numPoint).fill(0));
    const [xValues, setXValues] = useState(Array(numbervariable).fill(Array(numbervariable).fill(0)))
    const [Steps, setSteps] = useState([]);

    const inputPoints = (event) => {
        const size = parseInt(event.target.value)
        setFx(Array(size).fill(0))
        setValues(Array.from({ length: size }, () => Array(numbervariable).fill(0)))
        setNumPoints(size)
    }

    const inputFx = (index, value) => {
        const updatedFx = [...fx]
        updatedFx[index] = parseFloat(value)
        setFx(updatedFx)
    }

    const inputValue = (pointIndex, variableIndex, value) => {
        const updatedValues = [...values]
        updatedValues[pointIndex] = [...updatedValues[pointIndex]]
        updatedValues[pointIndex][variableIndex] = parseFloat(value)
        setValues(updatedValues)
    }

    const inputXvalues = (index, value) => {
        const updatedX = [...xValues];
        updatedX[index] = parseFloat(value);
        setXValues(updatedX);
    }


    const calmultiple = () => {
        const X = values
        const Y = fx
        console.log(X)
        // console.log(Y)
        // console.log(numbervariable)
        


    }


    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Multiple Regression extrapolation</h1>
                    </div>
                    <div className='inputxlbi'>
                        <div className='input-group'>
                            <div className='input-item'>
                                <label>Number of points</label>
                                <input
                                    type="number"
                                    value={numPoint}
                                    onChange={inputPoints}
                                />
                            </div>
                            <div className='input-item'>
                                <label>(Number of X)</label>
                                <input
                                    type="number"
                                    value={numbervariable}
                                    onChange={(e) => Setnumbervariable(parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                    {Array.from({ length: numbervariable }, (_, i) => (
                        <div key={i}>
                            <span>X Variable {i + 1}:</span>
                            <input
                                type="number"
                                value={xValues[i]}
                                onChange={(e) => inputXvalues(i, e.target.value)}
                                placeholder={`x${i}`}
                            />
                        </div>
                    ))}

                    <div className='checkbox-group'>
                        {Array.from({ length: numPoint }, (_, i) => (
                            <div key={i}>
                                <span>{i + 1} .</span>
                                {Array.from({ length: numbervariable }, (_, j) => (
                                    <input
                                        key={`${j}`}
                                        type="number"
                                        value={values[i][j]}
                                        onChange={(e) => inputValue(i, j, e.target.value)}
                                        placeholder={`x${j}`}
                                    />
                                ))}
                                <input
                                    key={`fx-${i}`}
                                    type="number"
                                    value={fx[i]}
                                    onChange={(e) => inputFx(i, e.target.value)}
                                    placeholder={`f(x${i})`}
                                />
                            </div>
                        ))}
                    </div>

                    <div className='calbi'>
                        <button className="btn btn-neutral btn-sm" onClick={calmultiple} >
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

export default Multiple
