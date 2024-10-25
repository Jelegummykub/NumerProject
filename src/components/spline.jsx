import axios from 'axios';
import 'katex/dist/katex.min.css';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';

function Spline() {
    const [Size, SetSize] = useState(3)
    const [ValueX, SetValueX] = useState(0)
    const [xValues, setXValues] = useState(Array(3).fill(0))
    const [fx, setFx] = useState(Array(3).fill(0))
    const [Steps, setSteps] = useState([])

    const fetchRandominterpolation = async () => {
        try {
            const response = await axios.get('http://localhost:3002/infointer/interpolation')

            if (response.data.result && response.data.data && Array.isArray(response.data.data)) {
                const equation = response.data.data
            console.log(equation)


                if (equation.length > 0) {
                    const randomIndex = Math.floor(Math.random() * equation.length)
                    const randomEquation = equation[randomIndex]

                    const rejaxvaluexsring = randomEquation.valuex.replace(/(^"|"$)/g, '')
                    const rejaxfxsring = randomEquation.fx.replace(/(^"|"$)/g, '')

                    const parsedvaluex = JSON.parse(rejaxvaluexsring)
                    const parsedfx = JSON.parse(rejaxfxsring)

                    if (Array.isArray(parsedvaluex) && Array.isArray(parsedfx)) {
                        const size = parsedvaluex.length
                        console.log(size)
                        setXValues(parsedvaluex)
                        setFx(parsedfx)
                        SetSize(size)
                    } else {
                        console.error("Parsed matrix or constants are not arrays", parsedvaluex, parsedfx)
                    }
                } else {
                    console.error("No equations found in response data")
                }
            } else {
                console.error("Unexpected response structure", response.data)
            }
        } catch (error) {
            console.error("Error fetching random equation", error)
        }
    }

    const inputsize = (event) => {
        const size = parseInt(event.target.value)
        SetSize(size)
        setXValues(Array(size).fill(0))
        setFx(Array(size).fill(0))
    }

    const inputX = (event) => {
        SetValueX(event.target.value)
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

    const calspline = () => {
        const n = Size
        // console.log(n)
        // console.log(xValues)
        let StepsArray = []
        let result = 0

        for (let i = 0; i < n - 1; i++) {
            if (ValueX >= xValues[i] && ValueX <= xValues[i + 1]) {
                // console.log("hi" ,xValues[i])
                // console.log(fx[i+1])
                
                const slope = ((fx[i + 1] - fx[i]) / ((xValues[i + 1] - xValues[i])))
                StepsArray.push(`m = \\frac{f(x_{${i + 1}}) - f(x_{${i}})}{x_{${i + 1}} - x_{${i}}} = \\frac{${fx[i + 1]} - ${fx[i]}}{${xValues[i + 1]} - ${xValues[i]}} = ${slope}`);
                // console.log(slope)
                result = fx[i] + (slope * (ValueX - xValues[i]))
                StepsArray.push(`f(${ValueX}) = f(x_{${i}}) + m \\cdot (x - x_{${i}})`);
                StepsArray.push(`f(${ValueX}) = ${fx[i]} + ${slope} \\cdot (${ValueX} - ${xValues[i]}) = ${result}`);

                console.log(result)
                break
            }
        }

        setSteps(StepsArray)

    }

    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Spline interpolation</h1>
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
                    <div className='calbi'>
                        <button className="btn btn-sm btn-warning" onClick={fetchRandominterpolation}>
                            Random
                        </button>
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
                        <button className="btn btn-neutral btn-sm" onClick={calspline} >
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
