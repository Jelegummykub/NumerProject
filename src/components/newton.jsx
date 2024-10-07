import 'katex/dist/katex.min.css';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';

function Newton() {
    const [Size, SetSize] = useState(3)
    const [ValueX, SetValueX] = useState(0)
    const [selectedPoints, setSelectedPoints] = useState([])
    const [xValues, setXValues] = useState(Array(3).fill(0))
    const [fx, setFx] = useState(Array(3).fill(0))
    const [Steps, setSteps] = useState([])

    const inputsize = (event) => {
        const size = parseInt(event.target.value)
        SetSize(size);
        setXValues(Array(size).fill(0))
        setFx(Array(size).fill(0))
    };

    const inputX = (event) => {
        SetValueX(event.target.value)
    }

    const handleCheckboxChange = (index) => {
        const updatedPoints = [...selectedPoints];
        updatedPoints[index] = !updatedPoints[index];
        setSelectedPoints(updatedPoints);
    }

    const handleXChange = (index, value) => {
        const updatedX = [...xValues]
        updatedX[index] = parseFloat(value)
        setXValues(updatedX)
    }

    const handleFxChange = (index, value) => {
        const updatedFx = [...fx];
        updatedFx[index] = parseFloat(value)
        setFx(updatedFx);
    }


    const calnewton = () => {
        const selected = selectedPoints.map((checked, i) => checked ? i : null).filter(i => i !== null)

        if (selected.length < 2) {
            alert("กรุณากรอกมากกว่า 2 จุด")
            return
        }

        let StepsArray = []
        const n = selected.length
        const diffTable = Array.from({ length: n }, () => Array(n).fill(0))

        for (let i = 0; i < n; i++) {
            diffTable[i][0] = fx[selected[i]]
        }

        // Fill the divided difference table
        for (let j = 1; j < n; j++) {
            for (let i = 0; i < n - j; i++) {
                diffTable[i][j] = (diffTable[i + 1][j - 1] - diffTable[i][j - 1]) / (xValues[selected[i + j]] - xValues[selected[i]])
                console.log(diffTable[i][j])
            }
        }

        let result = diffTable[0][0]
        let term = 1
        StepsArray.push(`\\text{Newton's Divided Difference Table}`)
        for (let i = 1; i < n; i++) {
            term *= (ValueX - xValues[selected[i - 1]])
            result += diffTable[0][i] * term;
            StepsArray.push(`\\text{C ${i}: } ${diffTable[0][i]} \\cdot (x - x_{${selected[i - 1]}})`)
        }

        StepsArray.push(`\\text{Result: } Fx(${ValueX}) = ${result}`)
        setSteps(StepsArray)
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

export default Newton;
