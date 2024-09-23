import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Navbar from './Navbar';
import './component.css';



function ELimination() {

    const [constants, setConstants] = useState(Array(3).fill(0));
    const [dimitions, setdimitions] = useState(3)
    const [Matrix, setmatrix] = useState(Array(3).fill().map(() => Array(3).fill(0)))
    const [data, setData] = useState([])

    const inputsize = (event) => {
        const size = parseInt(event.target.value)
        setdimitions(size)
        setmatrix(Array(size).fill().map(() => Array(size).fill(0)))
        setConstants(Array(size).fill(0))
    }

    const handleMatrixChange = (row, col, value) => {
        const newMatrix = [...Matrix]
        newMatrix[row][col] = parseFloat(value)
        setmatrix(newMatrix)
    }

    const handleConstantChange = (row, value) => {
        const newConstants = [...constants]
        newConstants[row] = parseFloat(value)
        setConstants(newConstants)
    }

    const cal = (dimitions, Matrix, constants) => {
        let obj = []
        const n = dimitions
        const A = Matrix.map(row => [...row])
        // for(let i = 0 ; i < n ; i++){
        //     console.log(A[i])
        // }
        const B = [...constants]
        // for (let i = 0; i < n; i++) {
        //     console.log(B[i])
        // }
        const X = Array(n).fill(0)

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) { //1 0 2 0 2 1
                const ratio = A[j][i] / A[i][i]
                // console.log(ratio)
                for (let k = i; k < n; k++) {//A[j][k] (1 1 = 4) (1 2 = -5) (2 2 = 1)
                    // const temp96 = A[i][k]
                    // console.log(temp96)
                    //A[i][k] = (0 1 = 3) (0 2 = 1) (1 2 = -5)
                    A[j][k] -= ratio * A[i][k]
                    // const temp = A[j][k]
                    // console.log(temp)
                }
                B[j] -= ratio * B[i];
            }
        }

        for (let i = n - 1; i >= 0; i--) {
            let sum = 0
            for (let j = i + 1; j < n; j++) {
                sum += A[i][j] * X[j]
            }
            X[i] = Math.round((B[i] - sum) / A[i][i])
            const result = X[i]
            obj.push({
                Xn: result
            })
        }
        setData(obj.reverse())
    }


    const calculateguass = () => {
        cal(dimitions, Matrix, constants)
        // console.log("asddssf")
    }

    const resetForm = () => {
        setdimitions(3);
        setmatrix(Array(3).fill().map(() => Array(3).fill(0)));
        setConstants(Array(3).fill(0));
        setData([]);
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
                                            value={constants[rowIndex]}
                                            onChange={(e) => handleConstantChange(rowIndex, e.target.value)}
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
                </div>
            </div>
        </>
    )
}

export default ELimination
