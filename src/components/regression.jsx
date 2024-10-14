import 'katex/dist/katex.min.css';
import { det } from 'mathjs';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';



function Regression() {
    const [Size, SetSize] = useState(3)
    const [ValueX, SetValueX] = useState(0)
    const [Morder, SetMorder] = useState(1)
    const [xValues, setXValues] = useState(Array(3).fill(0))
    const [fx, setFx] = useState(Array(3).fill(0))
    const [Steps, setSteps] = useState([])

    const inputsize = (event) => {
        const size = parseInt(event.target.value)
        SetSize(size)
        setFx(Array(size).fill(0))
        setXValues(Array(size).fill(0))
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
        let StepsArray = []
        const m = parseInt(Morder)
        const matrixSize = m + 1
        // console.log(matrixSize)
        const matrix = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));
        // console.log(coefficients)
        const matrixB = Array(matrixSize).fill(0);


        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                matrix[i][j] = xValues.reduce((acc, x) => acc + Math.pow(x, i + j), 0);
            }
            matrixB[i] = xValues.reduce((acc, x, index) => acc + fx[index] * Math.pow(x, i), 0);
        }

        // console.log(matrix)
        // console.log(matrixB)

        const detA = det(matrix)
        // console.log(detA)

        const solutions = []

        const matrixLatex = `\\begin{bmatrix} ${matrix.map(row => row.join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;
        const constantsLatex = `\\begin{bmatrix} ${matrixB.join(' & ')} \\end{bmatrix}`;

        StepsArray.push(`\\text{Coefficient matrix: } ${matrixLatex}`);
        StepsArray.push(`\\text{Constants matrix: } ${constantsLatex}`);

        for (let i = 0; i < matrixSize; i++) {
            const modify = matrix.map(row => [...row])
            // console.log(modify)
            for (let j = 0; j < matrixSize; j++) {
                modify[j][i] = matrixB[j]
                // console.log(modify[j][i])
            }
            const detAi = det(modify)
            solutions.push(detAi / detA)
            StepsArray.push(`x_${i} = \\frac{\\text{det}(A_{${i}})}{\\text{det}(A)} = \\frac{${detAi.toFixed(6)}}{${detA.toFixed(6)}} = ${solutions[i].toFixed(6)}`);
        }

        console.log("Solutions:", solutions);

        solutions.forEach((solution, i) => {
            StepsArray.push(`x_${i} = ${solution.toFixed(6)}`)
        })

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
                            <div className='input-item'>
                                <label>M order</label>
                                <input type="number"
                                    value={Morder}
                                    onChange={inputMorder}
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
