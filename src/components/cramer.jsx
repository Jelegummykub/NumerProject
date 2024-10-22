import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'katex/dist/katex.min.css'
import { det } from 'mathjs'
import React, { useState } from 'react'
import { BlockMath } from 'react-katex'
import './component.css'
import NAvbar from './Navbar'

const Cramer = () => {

    const [constants, setConstants] = useState(Array(3).fill(null));
    const [dimitions, setdimitions] = useState(3)
    const [Matrix, setmatrix] = useState(Array(3).fill().map(() => Array(3).fill(null)))
    const [data, setData] = useState([])

    const inputsize = (event) => {
        const size = parseInt(event.target.value)
        setdimitions(size)
        setmatrix(Array(size).fill().map(() => Array(size).fill(null)))
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

    const replace = (a, b, j) => {
        const newmatrix = a.map((row, rowindex) => [...row])
        for (let i = 0; i < newmatrix.length; i++) {
            newmatrix[i][j] = constants[i]
        }
        return newmatrix
    }

    const calCramer = (n, a, b) => {
        const detA = det(a)
        let obj = []

        if (detA === 0) {
            setData([{ Xn: "ไม่สามารถคำนวณได้" }])
            return
        }

        for (let i = 0; i < n; i++) {
            const newmatrix1 = replace(a, b, i)
            const detAi = det(newmatrix1)
            const result = (detAi / detA)

            const detA_latex = `\\text{det (A)} = ${detA.toFixed(2)}`;
            const detAi_latex = `\\text{det(A{${i + 1}})} = ${detAi.toFixed(2)}`;
            const result_latex = `X_{${i + 1}} = \\frac{\\text{det}(A_{${i + 1}})}{\\text{det}(A)} = \\frac{${detAi.toFixed(2)}}{${detA.toFixed(2)}} = ${result.toFixed(2)}`;

            obj.push({
                Xn: result,
                detA_latex,
                detAi_latex,
                result_latex
            })
        }
        setData(obj)
    }

    const calculateCramer = () => {
        calCramer(dimitions, Matrix, constants)
    }

    const resetForm = () => {
        setdimitions(3);
        setmatrix(Array(3).fill().map(() => Array(3).fill(0)));
        setConstants(Array(3).fill(0));
        setData([]);
    }

    return (
        <>
            <NAvbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Cramer's Rule</h1>
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
                            <button className="btn btn-neutral btn-sm" onClick={calculateCramer}>
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
                            <h3>Cramer Rule</h3>
                            {data.map((res, idx) => (
                                <div key={idx} className='calculation-step'>
                                    <span>
                                        <BlockMath>{res.detA_latex}</BlockMath>
                                        <BlockMath>{res.detAi_latex}</BlockMath>
                                        <BlockMath>{res.result_latex}</BlockMath>
                                        <div className='result'>
                                            <h5>X{idx + 1} = {res.Xn.toFixed(2)}</h5>
                                        </div>
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Cramer;
