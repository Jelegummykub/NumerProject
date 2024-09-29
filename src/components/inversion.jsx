import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'katex/dist/katex.min.css';
import { all, create } from 'mathjs';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';
import './component.css';

const math = create(all);

function Inversion() {
    const [Answer, SetAnswer] = useState(Array(3).fill(0))
    const [Matrix, SetMatrix] = useState(Array(3).fill().map(() => Array(3).fill(0)))
    const [dimitions, setdimitions] = useState(3)
    const [data, setData] = useState([])

    const inputsize = (event) => {
        const size = parseInt(event.target.value)
        setdimitions(size)
        SetAnswer(Array(size).fill(0))
        SetMatrix(Array(size).fill().map(() => Array(size).fill(0)))
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

    const matrixToLatex = (A, B) => {
        let latex = '\\begin{bmatrix} ';
        for (let i = 0; i < A.length; i++) {
            latex += A[i].join(' & ');
            if (B && B[i] !== undefined) {
                latex += ' & ' + B[i];
            }
            latex += ' \\\\ ';
        }
        latex += '\\end{bmatrix}';
        return latex;
    }
    
    const calinversion = (n, a, b) => {
        const A = math.matrix(a)
        const B = math.matrix(b)
        const Ainv = math.inv(A)
    
        const x = math.multiply(Ainv, B)
    
        const stepsArray = []
    
        const AArray = A.toArray()
        const BArray = B.toArray()
        const xArray = x.toArray().map(Math.round)
    
        stepsArray.push(`\\text{Initial Matrix A:} \\quad ${matrixToLatex(AArray, BArray)}`)
        stepsArray.push(`\\text{Inverse Matrix A:} \\quad ${matrixToLatex(Ainv.toArray())}`)
        stepsArray.push(`\\text{Solution Vector x:} \\quad ${matrixToLatex([xArray], [])}`)
    
        return stepsArray
    }
    
    const calculateinversion = () => {
        const steps = calinversion(dimitions, Matrix, Answer)
        setData(steps)
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
                        <h1>Matrix Inversion</h1>
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
                            <button className="btn btn-neutral btn-sm" onClick={calculateinversion} >
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
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    {data.length > 0 && (
                        <div className='table-container'>
                            <h3>Matrix Inversion</h3>
                            {data.map((step, idx) => (
                                <div key={idx} className='calculation-step'>
                                    <BlockMath className='text-red-700'>{step}</BlockMath>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Inversion