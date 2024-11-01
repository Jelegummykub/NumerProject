import axios from 'axios';
import 'katex/dist/katex.min.css';
import { det } from 'mathjs';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Plot from "react-plotly.js";
import Navbar from './Navbar';

function Polyregression() {
    const [Size, SetSize] = useState(3)
    const [ValueX, SetValueX] = useState(null)
    const [Morder, SetMorder] = useState(2)
    const [xValues, setXValues] = useState(Array(3).fill(null))
    const [fx, setFx] = useState(Array(3).fill(null))
    const [Steps, setSteps] = useState([])
    const [datachart, setDatachart] = useState([])
    const [datachart1, setDatachart1] = useState([])

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
        setFx(Array(size).fill(null))
        setXValues(Array(size).fill(null))
    }

    const inputX = (event) => {
        SetValueX(event.target.value)
    }

    const inputMorder = (event) => {
        SetMorder((parseInt(event.target.value)))
    }

    const handleFxChange = (index, value) => {
        const updatedFx = [...fx]
        updatedFx[index] = parseFloat(value)
        setFx(updatedFx)
    }

    const handleXChange = (index, value) => {
        const updatedX = [...xValues]
        updatedX[index] = parseFloat(value)
        setXValues(updatedX)
    }

    const calLeast = () => {
        let StepsArray = [];
        const m = parseInt(Morder);
        const matrixSize = m + 1;
        const matrix = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));
        const matrixB = Array(matrixSize).fill(0);

        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                matrix[i][j] = xValues.reduce((acc, x) => acc + Math.pow(x, i + j), 0);
            }
            matrixB[i] = xValues.reduce((acc, x, index) => acc + fx[index] * Math.pow(x, i), 0);
        }

        const detA = det(matrix);
        const solutions = [];
        const matrixLatex = `\\begin{bmatrix} ${matrix.map(row => row.join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;
        const constantsLatex = `\\begin{bmatrix} ${matrixB.join(' & ')} \\end{bmatrix}`;
        StepsArray.push(`\\text{Matrix : } ${matrixLatex}`);
        StepsArray.push(`\\text{Matrix B : } ${constantsLatex}`);

        for (let i = 0; i < matrixSize; i++) {
            const modify = matrix.map(row => [...row]);
            for (let j = 0; j < matrixSize; j++) {
                modify[j][i] = matrixB[j];
            }
            const detAi = det(modify);
            solutions.push(detAi / detA);

            StepsArray.push(`a_${i} = \\frac{\\text{det}(a_{${i}})}{\\text{det}(A)} = \\frac{${detAi}}{${detA}} = ${solutions[i]}`);
        }

        let result = solutions[0];
        StepsArray.push(`f(x) = ${solutions[0].toFixed(6)}`)

        for (let i = 1; i <= m; i++) {
            result += solutions[i] * Math.pow(ValueX, i);
            StepsArray.push(` + ${solutions[i].toFixed(6)} \\cdot x^{${i}}`)
        }

        setDatachart(result);
        StepsArray.push(`f(${ValueX}) = ${result}`)

        setSteps(StepsArray)

        const lineYValues = xValues.map(x => {
            let y = solutions[0];
            for (let i = 1; i <= m; i++) {
                y += solutions[i] * Math.pow(x, i)
            }
            return y
        })

        setDatachart1(lineYValues);
    }



    const chartData = {
        data: [
            {
                type: "scatter",
                mode: "markers",
                x: xValues,
                y: fx,
                marker: { color: "red", size: 8 },
                name: "Point",
            },
            {
                type: "scatter",
                mode: "lines",
                x: xValues,
                y: datachart1,
                line: { color: "orange", size: 15 },
                name: "Regression Line",
            },
            {
                type: "scatter",
                mode: "markers",
                x: [ValueX],
                y: [datachart],
                marker: { color: "blue", size: 12 },
                name: `Predicted Point f(${ValueX})`,
            }
        ],
        layout: {
            title: "Least-Squares Regression Plot",
            xaxis: { title: 'X' },
            yaxis: { title: 'f(X)' },
        }
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
                                    placeholder='Enter Value X'
                                />
                            </div>
                            <div className='input-item'>
                                <label>M order</label>
                                <input type="number"
                                    value={Morder}
                                    onChange={inputMorder}
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
                <div className='grap'>
                    <div className='congrap'>
                        <div className='w-full h-[40vh] md:h-[400px] lg:h-[500px] flex items-center justify-center'>
                            <Plot
                                data={chartData.data}
                                layout={{
                                    ...chartData.layout,
                                    autosize: true,
                                }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>
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

export default Polyregression
