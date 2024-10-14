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
        SetSize(size)
        setXValues(Array(size).fill(0))
        setFx(Array(size), fill(0))
    }

    const inputX = (event) => {
        SetValueX(event.target.value)
    }

    const handleCheckboxChange = (index) => {
        const updatedPoints = [...selectedPoints]
        updatedPoints[index] = !updatedPoints[index]
        setSelectedPoints(updatedPoints)
    }

    const handleXChange = (index, value) => {
        const updatedX = [...xValues]
        updatedX[index] = parseFloat(value)
        setXValues(updatedX)
    }

    const handleFxChange = (index, value) => {
        const updatedFx = [...fx]
        updatedFx[index] = parseFloat(value)
        setFx(updatedFx)
    }

    const recursive = (xValues, fx) => {
        const n = xValues.length
        // console.log(n)
        let temp1 = Array.from({ length: n }, () => Array(n).fill(0))
        // console.log(temp1)

        for (let i = 0; i < n; i++) {
            temp1[i][0] = fx[i]
            // console.log(temp1[i][0])
        }

        for (let j = 1; j < n; j++) {
            for (let i = 0; i < n - j; i++) {
                temp1[i][j] = (temp1[i + 1][j - 1] - temp1[i][j - 1]) / (xValues[i + j] - xValues[i])
                // console.log(temp1[i][j])
            }
        }

        // console.log(temp1[0])
        return temp1[0]


    }

    const calnewton = () => {
        const selected = selectedPoints.map((checked, i) => checked ? i : null).filter(i => i != null)
        if (selected.length < 2) {
            alert("กรุณากรอกมากกว่า 2 จุด");
            return;
        }

        let StepsArray = []
        const n = selected.length
        // console.log(n)
        const selectedX = selected.map((i => xValues[i]))
        // console.log(selectedX)
        const selectedFx = selected.map((i => fx[i]))

        const temp = recursive(selectedX, selectedFx)
        // console.log(temp)

        const temp99 = temp.map((c, idx) => `X${idx} = ${c}`).join(',');
        StepsArray.push(`\\text{Value: } ${temp99}`);

        let result = temp[0]
        // console.log(result)
        let temp2 = 1
        let resultLatex = `${temp[0]}`

        for (let i = 1; i < n; i++) {
            temp2 *= (ValueX - selected[i - 1])
            result += temp[i] * temp2
            resultLatex += ` + (${temp[i]}) \\cdot (${ValueX} - ${selectedX[i - 1]})`
        }
        StepsArray.push(`Fx(${ValueX}) = ${resultLatex}`);
        StepsArray.push(`\\text{Result: } Fx(${ValueX}) = ${result}`)
        setSteps(StepsArray);
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
