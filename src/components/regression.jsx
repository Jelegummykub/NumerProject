import axios from 'axios';
import { det } from 'mathjs';
import React, { useState } from 'react';
import Plot from "react-plotly.js";


function Regression() {
    const [Size, Setsize] = useState(3)
    const [ValueX, SetValueX] = useState(null)
    const [xValues, setXValues] = useState(Array(3).fill(0))
    const [fx, setFx] = useState(Array(3).fill(0))
    const [ans, setans] = useState(null)
    const [datachart, setDatachart] = useState([])
    const [datachart1, setDatachart1] = useState([])

    const fetchRandominterpolation = async () => {
        try {
            const response = await axios.get('http://localhost:4000/infointer/interpolation')
            if (response.data.result && response.data.data && Array.isArray(response.data.data)) {
                const equation = response.data.data
                console.log(equation)

                if(equation.length > 0){
                    const randomIndex = Math.floor(Math.random() * equation.length)
                    const randomEquation = equation[randomIndex]

                    const rejaxvaluexsring = randomEquation.valuex.replace(/(^"|"$)/g, '')
                    const rejaxfxsring = randomEquation.fx.replace(/(^"|"$)/g, '')
                    const parsedvaluex = JSON.parse(rejaxvaluexsring)
                    const parsedfx = JSON.parse(rejaxfxsring)

                    if(Array.isArray(parsedvaluex) && Array.isArray(parsedfx)){
                        const size = parsedvaluex.length
                        setXValues(parsedvaluex)
                        setFx(parsedfx)
                        Setsize(size)
                    }else{
                        console.error("error")
                    }
                }else {
                    console.error("error")
                }
            }else{
                console.error("error")
            }
        } catch (error) {
            console.error("error")
        }
    }


    const inputsize = (even) => {
        const size = parseInt(even.target.value)
        Setsize(size)
        setFx(Array(size).fill(0))
        setXValues(Array(size).fill(0))
    }

    const inputX = (event) => {
        SetValueX(parseFloat(event.target.value))
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
        const matrixSize = 2
        const matrix = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));
        const matrixB = Array(matrixSize).fill(0);


        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                matrix[i][j] = xValues.reduce((acc, x) => acc + Math.pow(x, i + j), 0)
            }

            console.log(xValues)
            matrixB[i] = xValues.reduce((acc, x, index) => acc + fx[index] * Math.pow(x, i), 0)
            // console.log(matrixB[i])
        }

        const detA = det(matrix)
        const solutions = []

        for (let i = 0; i < matrixSize; i++) {
            const modify = matrix.map(row => [...row])
            for (let j = 0; j < matrixSize; j++) {
                modify[j][i] = matrixB[j]
            }

            const detai = det(modify)
            solutions.push(detai / detA)
        }

        console.log("Solutions:", solutions)
        let result
        for (let i = 0; i < solutions.length; i++) {
            result = solutions[0] + (solutions[1] * ValueX)
            setDatachart(result)
        }
        console.log(result)

        setans(result)

        const lineYValues = xValues.map(x => {
            let y = solutions[0]
            if (1 >= 1) {
                y += solutions[1] * x
            }
            return y
        })
        setDatachart1(lineYValues)

    }

    const chartData = {
        data: [
            {
                tpye: "scatter",
                mode: "markers",
                x: xValues,
                y: fx,
                marker: { color: "red", size: 7 },
                name: "Point",
            },
            {
                type: "scatter",
                mode: "lines",
                x: xValues,
                y: datachart1,
                line: { color: "blue", size: 12 },
                name: "Line"
            },
            {
                type: "scatter",
                mode: "marker",
                x: [ValueX],
                y: [datachart],
                marker: { color: "black", size: 12 },
                name: `f(${ValueX})`,
            }
        ],
        layout: {
            title: "Regression",
            xaxis: { title: 'X' },
            yaxis: { title: 'f(X)' },
        }
    }

    return (
        <>
            <div>
                <label> point </label>
                <input type="number"
                    value={Size}
                    onChange={inputsize}
                />
            </div>
            <div>
                <input
                    type="number"
                    value={ValueX}
                    onChange={inputX}
                />
            </div>
            <div >
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
            <button className="btn btn-neutral btn-sm" onClick={calLeast} >
                Calculate
            </button>
            <div>
                <button className="btn btn-sm btn-warning" onClick={fetchRandominterpolation}>
                    Random
                </button>
            </div>
            <div>
                <p>Ans: {ans}</p>
            </div>
            <div>
                <Plot
                    data={chartData.data}
                    layout={{
                        ...chartData.layout,
                        autosize: true,
                    }}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </>
    )
}

export default Regression
