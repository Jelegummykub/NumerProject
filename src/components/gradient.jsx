import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'katex/dist/katex.min.css';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';
import './component.css';


function Gradient() {

    const [Answer, SetAnswer] = useState(Array(3).fill(0))
    const [dimitions, setdimitions] = useState(3)
    const [Matrix, SetMatrix] = useState(Array(3).fill().map(() => Array(3).fill(0)))
    const [StartX, SetStartX] = useState(Array(3).fill(0))
    const [data, setData] = useState([])

    const inputsize = (event) => {
        const size = parseInt(event.target.value)
        SetAnswer(Array(size).fill(0))
        SetMatrix(Array(size).fill().map(() => Array(size).fill(0)))
        setdimitions(size)
        SetStartX(Array(size).fill(0))
    }

    const handleConstantChange = (row, value) => {
        const newAnswer = [...Answer]
        newAnswer[row] = parseFloat(value)
        SetAnswer(newAnswer)
    }

    const handleMatrixChange = (row, col, value) => {
        const newMatrix = [...Matrix]
        newMatrix[row][col] = parseFloat(value)
        SetMatrix(newMatrix)
    }

    const handleStartChange = (row, value) => {
        const newStart = [...StartX]
        newStart[row] = parseFloat(value)
        SetStartX(newStart)
    }

    const calgradient = (n, a, b, x) => {
        const A = a.map(row => [...row])
        let X = [...x]
        let R = Array(n).fill(0)
        let D = Array(n).fill(0)
        let obj = []

        for (let i = 0; i < n; i++) {
            R[i] = b[i]
            // console.log(R[i])
            for (let j = 0; j < n; j++) {
                R[i] -= A[i][j] * X[j];
                // console.log(R[i])
            }
        }

        D = [...R] // 12 17 14 7
        // console.log(D)

        let iteration = 0;
        let e1 = 1;
        const MaxIteration = 100;
        const e = 0.000001;

        while (e1 > e && iteration < MaxIteration) {
            let alpha = 0
            let lamda = 0
            let tempR = 0
            let tempAD = Array(n).fill(0);

            for (let i = 0; i < n; i++) {
                tempR += R[i] * R[i]
                // console.log(tempR)
                for (let j = 0; j < n; j++) {
                    tempAD[i] += A[i][j] * D[j]
                    // console.log(tempAD)
                }
            }
            let tempDAD = 0;
            for (let i = 0; i < n; i++) {
                tempDAD += D[i] * tempAD[i]
                // console.log(tempAD[i])
            }
            lamda = tempR / tempDAD;

            // console.log(lamda)

            for (let i = 0; i < n; i++) {
                X[i] = X[i] + lamda * D[i]
                // console.log(X[i])
            }

            let newR = Array(n).fill(0)

            for (let i = 0; i < n; i++) {
                let tempSum = 0
                for (let j = 0; j < n; j++) {
                    tempSum += A[i][j] * X[j]
                }
                newR[i] = tempSum - b[i]
                // console.log(newR[i])
            }

            e1 = Math.sqrt(newR.reduce((acc, val) => acc + val * val, 0))


            let tempnewR = 0
            let tempnewR1 = 0
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    tempnewR += newR[i] * A[i][j] * D[j]
                    tempnewR1 += D[i] * A[i][j] * D[j]
                    // console.log(tempnewR1)
                }
            }

            alpha = tempnewR / tempnewR1
            // console.log(alpha)

            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    D[i] = alpha * D[i] - newR[i]
                    console.log(D[i])
                }
            }

            R = [...newR]

            obj.push({
                iteration: iteration + 1,
                X: [...X],
                R: [...R],
                D: [...D],
                alpha: alpha,
                lamda: lamda,
                error: e1
            });

            iteration++
        }

        setData(obj)

    }

    const calculategradient = () => {
        calgradient(dimitions, Matrix, Answer, StartX)
    }

    const resetForm = () => {
        setdimitions(3)
        SetAnswer(Array(3).fill(0))
        SetStartX(Array(3).fill(0))
        SetMatrix(Array(3).fill().map(() => Array(3).fill(0)))
        setData([])
    }

    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Conjugate Gradient Medthod</h1>
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
                            <button className="btn btn-neutral btn-sm" onClick={calculategradient} >
                                Calculate
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
                                        <span> X{rowIndex + 1}</span>
                                        <input
                                            type="number"
                                            value={StartX[rowIndex]}
                                            onChange={(e) => handleStartChange(rowIndex, e.target.value)}
                                            className="matrix-input"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    {data.length > 0 && (
                        <div className='table-container1'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Iteration</th>
                                        <th>Alpha (α)</th>
                                        <th>Lamda (λ)</th>
                                        <th>D</th>
                                        <th>X</th>
                                        <th>Residual (R)</th>
                                        <th>Error</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((element, index) => (
                                        <tr key={index}>
                                            <td>{element.iteration}</td>
                                            <td>{element.alpha.toFixed(6)}</td>
                                            <td>{element.lamda.toFixed(6)}</td>
                                            <td>
                                                <BlockMath math={`D = \\begin{bmatrix} ${element.D.map(val => `\\hspace{-150pt} ${val.toFixed(6)} \\hspace{-170pt}`).join('\\\\')} \\end{bmatrix}`} />
                                            </td>
                                            <td>
                                                <BlockMath math={`X = \\begin{bmatrix} ${element.X.map(val => `\\hspace{-150pt} ${val.toFixed(6)} \\hspace{-170pt}`).join('\\\\')} \\end{bmatrix}`} />
                                            </td>
                                            <td>
                                                <BlockMath math={`R = \\begin{bmatrix} ${element.R.map(val => `\\hspace{-150pt}${val.toFixed(6)}\\hspace{-170pt}`).join('\\\\')} \\end{bmatrix}`} />
                                            </td>
                                            <td>{element.error.toFixed(6)}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Gradient
