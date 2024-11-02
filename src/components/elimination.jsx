import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'katex/dist/katex.min.css';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';
import './component.css';


function ELimination() {

    const [Answer, SetAnswer] = useState(Array(3).fill(0))
    const [Matrix, SetMatrix] = useState(Array(3).fill().map(() => Array(3).fill(0)))
    const [dimitions, setdimitions] = useState(3)
    const [data, setData] = useState([])
    const [steps, setSteps] = useState([])

    const fetchRandomMatrix = async () => {
        try {
            const response = await axios.get('http://localhost:4000/infomatrix/matrix');
            console.log(response.data)

            if (response.data.result && response.data.data && Array.isArray(response.data.data)) {
                const equations = response.data.data;

                console.log("Equations:", equations)

                if (equations.length > 0) {
                    const randomIndex = Math.floor(Math.random() * equations.length)
                    const randomEquation = equations[randomIndex]

                    const cleanedMatrixString = randomEquation.matrix.replace(/(^"|"$)/g, '')
                    const cleanedConstantsString = randomEquation.constants.replace(/(^"|"$)/g, '')

                    const parsedMatrix = JSON.parse(cleanedMatrixString)
                    const parsedConstants = JSON.parse(cleanedConstantsString)

                    if (Array.isArray(parsedMatrix) && Array.isArray(parsedConstants)) {
                        const matrixSize = parsedMatrix.length
                        SetMatrix(parsedMatrix)
                        SetAnswer(parsedConstants)
                        setdimitions(matrixSize)
                    } else {
                        console.error("Parsed matrix or constants are not arrays", parsedMatrix, parsedConstants)
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
        setdimitions(size)
        SetAnswer(Array(size).fill(0))
        SetMatrix(Array(size).fill().map(() => Array(size).fill(0)))
    }

    const handleMatrixChange = (row, col, value) => {
        const newMatrix = [...Matrix]
        newMatrix[row][col] = parseFloat(value)
        SetMatrix(newMatrix)
    }

    const handleConstantChange = (row, value) => {
        const newAnswer = [...Answer]
        newAnswer[row] = parseFloat(value)
        SetAnswer(newAnswer)
    }

    const matrixToLatex = (A, B) => {
        let latex = '\\begin{bmatrix} ';
        for (let i = 0; i < A.length; i++) {
            latex += A[i].join(' & ') + ' & ' + B[i] + ' \\\\ ';
        }
        latex += '\\end{bmatrix}';
        return latex;
    }

    const calguass = (n, a, b) => {
        let obj = []
        let stepsArray = []
        let size1 = n
        // console.log("asdasd" + size1)
        const A = a.map(row => [...row])
        for (let i = 0; i < n; i++) {
            console.log(A[i])

        }
        const B = [...b]
        // for (let i = 0; i < n; i++) {
        //     console.log(B[i])
        // }

        const X = Array(n).fill(0)
        // console.log("sdda"+X)

        stepsArray.push(`\\text{Matrix A :} \\quad ` + matrixToLatex(A, B))

        //Forward

        for (let i = 0; i < n; i++) {
            let temp = A[i][i]
            stepsArray.push(`\\text{Give row } ${i + 1}: \\quad \\frac{\\text{Row }${i + 1}}{${temp}}`)
            // console.log(temp)
            for (let j = i; j < n; j++) {
                // const ratio = A[i][j] / temp
                A[i][j] /= temp
                // const ratio1 = A[i][j]
                // console.log(ratio1) // -2 3 1 4 -5 1
            }
            // let ans = B[i] / temp
            B[i] /= temp
            // console.log(ans)
            stepsArray.push(matrixToLatex(A, B))

            for (let k = i + 1; k < n; k++) {
                let factor = A[k][i]
                stepsArray.push(`\\text{Eliminate row } ${k + 1}: \\quad \\text{Row }${k + 1} - (${factor}) \\times \\text{Row }${i + 1}`)
                // console.log(factor)
                for (let j = i; j < n; j++) {
                    A[k][j] -= factor * A[i][j]
                    // let t = A[i][j]
                    // console.log(t)
                }
                B[k] -= factor * B[i]
                stepsArray.push(matrixToLatex(A, B))
            }
        }

        stepsArray.push(`\\text{After Forward Elimination:} \\quad ` + matrixToLatex(A, B))

        // Back

        for (let i = n - 1; i >= 0; i--) {
            X[i] = B[i]
            for (let j = i + 1; j < n; j++) {
                X[i] -= A[i][j] * X[j]
            }

            obj.push({
                Xn: Math.round(X[i])
            })

            stepsArray.push(`X_{${i + 1}} = ${B[i].toFixed(2)} - ${A[i].slice(i + 1).map((val, idx) => `(${val.toFixed(2)} \\times X_{${i + idx + 2}})`).join(' - ')} = ${X[i].toFixed(2)}`)

        }
        setData(obj.reverse())
        setSteps(stepsArray);

    }

    const calculateguass = () => {
        calguass(dimitions, Matrix, Answer)
    }

    const resetForm = () => {
        setdimitions(3)
        SetAnswer(Array(3).fill(0))
        SetMatrix(Array(3).fill().map(() => Array(3).fill(0)))
        setData([])
        setSteps([])
    }


    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Gauss Elimination</h1>
                    </div>
                    <div className='inputcramer'>
                        <div className='P'>
                            <p>Matrix size :  </p>
                        </div>
                        <div className='input2'>
                            <input
                                type="number"
                                value={dimitions}
                                onChange={inputsize}
                                placeholder="Enter size Metrix"
                            />
                        </div>
                        <div>
                            <button className="btn btn-sm btn-error" onClick={resetForm}>
                                <FontAwesomeIcon icon={faRedo} style={{ color: "#ffffff", }} />
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-neutral btn-sm" onClick={calculateguass} >
                                Calculate
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-sm btn-warning" onClick={fetchRandomMatrix}>
                                Random
                            </button>
                        </div>
                    </div>
                    <div className='container2'>
                        {dimitions > 0 && (
                            <div>
                                <div className='inmet'>
                                    <h3>Input Matrix</h3>
                                </div>
                                {Matrix.map((row, rowIndex) => (
                                    <div key={rowIndex} className='matrix-row'>
                                        {row.map((value, colIndex) => (
                                            <input
                                                key={colIndex}
                                                type="number"
                                                value={Matrix[rowIndex][colIndex]}
                                                onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
                                                className="matrix-input"
                                            />
                                        ))}
                                        <span>=</span>
                                        <input
                                            type="number"
                                            value={Answer[rowIndex]}
                                            onChange={(e) => handleConstantChange(rowIndex, e.target.value)}
                                            className="matrix-input"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {steps.length > 0 && (
                    <div className='table-container'>
                        <h3>Calculation Steps</h3>
                        {steps.map((step, idx) => (
                            <div key={idx} className='calculation-step'>
                                <BlockMath>{step}</BlockMath>
                            </div>
                        ))}
                    </div>
                )}
                {/* <div>
                    {data.length > 0 && (
                        <div className='table-container'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>X</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((res, idx) => (
                                        <tr key={idx}>
                                            <td>X{idx + 1} = {res.Xn}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div> */}
            </div>
        </>
    )
}

export default ELimination
