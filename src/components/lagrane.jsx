import 'katex/dist/katex.min.css';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';
import './component.css';

function Lagrane() {
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


    const calculateLagrange = () => {
        const selected = selectedPoints.map((checked, i) => checked ? i : null).filter(i => i !== null);
        let StepsArray = []


        if (selected.length < 2) {
            alert("Please select at least two points.");
            return;
        }

        let result = 0;
        StepsArray.push(`\\text{Lagrange Interpolation}`)


        for (let i = 0; i < selected.length; i++) {
            let temp = fx[selected[i]]
            // console.log(temp)
            let t1 = `f(x_{${selected[i]}}) = ${fx[selected[i]].toFixed(6)}`
            let t2 = `L_{${selected[i]}}(x) = ${fx[selected[i]].toFixed(6)}`
            for (let j = 0; j < selected.length; j++) {
                if (i !== j) {
                    temp *= (ValueX - xValues[selected[j]]) / (xValues[selected[i]] - xValues[selected[j]])
                    t2 += `\\left(\\frac{x - x_{${selected[j]}}}{x_{${selected[i]}} - x_{${selected[j]}}}\\right)`
                }
            }
            result += temp
            StepsArray.push(`${t1} \\cdot ${t2}`)
        }
        StepsArray.push(`\\text{Result: } L(${ValueX}) = ${result.toFixed(6)}`)
        setSteps(StepsArray)
    }

    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Lagrange Interpolation</h1>
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
                        <button className="btn btn-neutral btn-sm" onClick={calculateLagrange} >
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

export default Lagrane