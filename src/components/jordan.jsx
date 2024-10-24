import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'katex/dist/katex.min.css';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';
import './component.css';

function Jordan() {

    const [Answer, SetAnswer] = useState(Array(3).fill(0))
    const [Matrix, SetMatrix] = useState(Array(3).fill().map(() => Array(3).fill(0)))
    const [dimitions, setdimitions] = useState(3)
    const [data, setData] = useState([])
    const [steps, setSteps] = useState([])

    const fetchRandomMatrix = async () => {
        try {
            const response = await axios.get('http://localhost:3002/infomatrix/matrix');
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

    const caljordan = (n, a, b) => {
        let obj = []
        let stepsArray = []
        const A = a.map(row => [...row])
        const B = [...b]
        const X = Array(n).fill(0)

        //Forward

        stepsArray.push(`\\text{Matrix A:} \\quad ` + matrixToLatex(A, B))


        for (let i = 0; i < n; i++) {
            let pivot = A[i][i]
            stepsArray.push(`\\text{Give row } ${i + 1}: \\quad \\frac{\\text{Row }${i + 1}}{${pivot}}`)
            // console.log(pivot)
            for (let j = i; j < n; j++) {
                // let temp = A[i][j]
                // console.log("sds"+temp)
                A[i][j] /= pivot
            }
            B[i] /= pivot

            stepsArray.push(matrixToLatex(A, B))

            for (let k = 0; k < n; k++) {
                if (k !== i) {
                    let factor = A[k][i]
                    stepsArray.push(`\\text{Eliminate row } ${k + 1}: \\quad \\text{Row }${k + 1} - (${factor}) \\times \\text{Row }${i + 1}`)

                    for (let j = i; j < n; j++) {
                        A[k][j] -= factor * A[i][j]
                    }
                    B[k] -= factor * B[i]
                    Math.round(stepsArray.push(matrixToLatex(A, B)))

                }
            }
        }



        for (let i = n - 1; i >= 0; i--) {
            obj[i] = {
                Xn: Math.round(B[i])
            };
            stepsArray.push(`X_{${i + 1}} = ${Math.round(B[i])}`);
        }

        setData(obj)
        setSteps(stepsArray);



    }

    const calculatejordan = () => {
        caljordan(dimitions, Matrix, Answer)
    }

    const resetForm = () => {
        SetAnswer(Array(3).fill(0))
        setdimitions(3)
        SetMatrix(Array(3).fill().map(() => Array(3).fill(0)))
        setData([])
    }


    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Gauss Jordan</h1>
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
                            <button className="btn btn-neutral btn-sm" onClick={calculatejordan} >
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

export default Jordan
