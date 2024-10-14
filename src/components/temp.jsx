// import { faRedo } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import 'katex/dist/katex.min.css'
// import { det } from 'mathjs'
// import React, { useState } from 'react'
// import { BlockMath } from 'react-katex'
// import './component.css'
// import NAvbar from './Navbar'

// const Cramer = () => {

//     const [constants, setConstants] = useState(Array(3).fill(0));
//     const [dimitions, setdimitions] = useState(3)
//     const [Matrix, setmatrix] = useState(Array(3).fill().map(() => Array(3).fill(0)))
//     const [data, setData] = useState([])

//     const inputsize = (event) => {
//         const size = parseInt(event.target.value)
//         setdimitions(size)
//         setmatrix(Array(size).fill().map(() => Array(size).fill(0)))
//         setConstants(Array(size).fill(0))
//     }

//     const handleMatrixChange = (row, col, value) => {
//         const newMatrix = [...Matrix]
//         newMatrix[row][col] = parseFloat(value)
//         setmatrix(newMatrix)
//     }

//     const handleConstantChange = (row, value) => {
//         const newConstants = [...constants]
//         newConstants[row] = parseFloat(value)
//         setConstants(newConstants)
//     }

//     const replace = (a, b, j) => {
//         const newmatrix = a.map((row, rowindex) => [...row])
//         for (let i = 0; i < newmatrix.length; i++) {
//             newmatrix[i][j] = constants[i]
//         }
//         return newmatrix
//     }

//     const calCramer = (n, a, b) => {
//         const detA = det(a)
//         let obj = []

//         if (detA === 0) {
//             setData([{ Xn: "ไม่สามารถคำนวณได้" }])
//             return
//         }

//         for (let i = 0; i < n; i++) {
//             const newmatrix1 = replace(a, b, i)
//             const detAi = det(newmatrix1)
//             const result = (detAi / detA)

//             const detA_latex = `\\text{det (A)} = ${detA.toFixed(2)}`;
//             const detAi_latex = `\\text{det(A{${i + 1}})} = ${detAi.toFixed(2)}`;
//             const result_latex = `X_{${i + 1}} = \\frac{\\text{det}(A_{${i + 1}})}{\\text{det}(A)} = \\frac{${detAi.toFixed(2)}}{${detA.toFixed(2)}} = ${result.toFixed(2)}`;

//             obj.push({
//                 Xn: result,
//                 detA_latex,
//                 detAi_latex,
//                 result_latex
//             })
//         }
//         setData(obj)
//     }

//     const calculateCramer = () => {
//         calCramer(dimitions, Matrix, constants)
//     }

//     const resetForm = () => {
//         setdimitions(3);
//         setmatrix(Array(3).fill().map(() => Array(3).fill(0)));
//         setConstants(Array(3).fill(0));
//         setData([]);
//     }

//     return (
//         <>
//             <NAvbar />
//             <div>
//                 <div className='container1'>
//                     <div className='headbi'>
//                         <h1>Cramer's Rule</h1>
//                     </div>
//                     <div className='inputcramer'>
//                         <div className='P'>
//                             <p>Matrix size :  </p>
//                         </div>
//                         <div className='input2'>
//                             <input
//                                 type="number"
//                                 value={dimitions}
//                                 onChange={inputsize}
//                                 placeholder="Enter size Metrix"
//                             />
//                         </div>
//                         <div>
//                             <button className="btn btn-sm btn-error" onClick={resetForm}>
//                                 <FontAwesomeIcon icon={faRedo} style={{ color: "#ffffff", }} />
//                             </button>
//                         </div>
//                         <div>
//                             <button className="btn btn-neutral btn-sm" onClick={calculateCramer}>
//                                 Calculate
//                             </button>
//                         </div>
//                     </div>
//                     <div className='container2'>
//                         {dimitions > 0 && (
//                             <div>
//                                 <div className='inmet'>
//                                     <h3>Input Matrix</h3>
//                                 </div>
//                                 {Matrix.map((row, rowIndex) => (
//                                     <div key={rowIndex} className='matrix-row'>
//                                         {row.map((value, colIndex) => (
//                                             <input
//                                                 key={colIndex}
//                                                 type="number"
//                                                 value={Matrix[rowIndex][colIndex]}
//                                                 onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
//                                                 className="matrix-input"
//                                             />
//                                         ))}
//                                         <span>=</span>
//                                         <input
//                                             type="number"
//                                             value={constants[rowIndex]}
//                                             onChange={(e) => handleConstantChange(rowIndex, e.target.value)}
//                                             className="matrix-input"
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <div>
//                     {data.length > 0 && (
//                         <div className='table-container'>
//                             <h3>Cramer Rule</h3>
//                             {data.map((res, idx) => (
//                                 <div key={idx} className='calculation-step'>
//                                     <span>
//                                         <BlockMath>{res.detA_latex}</BlockMath>
//                                         <BlockMath>{res.detAi_latex}</BlockMath>
//                                         <BlockMath>{res.result_latex}</BlockMath>
//                                         <div className='result'>
//                                             <h5>X{idx + 1} = {res.Xn.toFixed(2)}</h5>
//                                         </div>
//                                     </span>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Cramer;


import 'katex/dist/katex.min.css';
import { det } from 'mathjs';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';

function Regression() {
    const [numVariables, setNumVariables] = useState(2); // จำนวนตัวแปรอิสระ
    const [numPoints, setNumPoints] = useState(3);
    const [values, setValues] = useState(Array(numPoints).fill(Array(numVariables).fill(0)));
    const [fx, setFx] = useState(Array(numPoints).fill(0));
    const [steps, setSteps] = useState([]);

    const inputPoints = (event) => {
        const size = parseInt(event.target.value);
        setNumPoints(size);
        setFx(Array(size).fill(0));
        setValues(Array(size).fill(Array(numVariables).fill(0)));
    };

    const inputFx = (index, value) => {
        const updatedFx = [...fx];
        updatedFx[index] = parseFloat(value);
        setFx(updatedFx);
    };

    const inputValue = (pointIndex, variableIndex, value) => {
        const updatedValues = [...values];
        updatedValues[pointIndex][variableIndex] = parseFloat(value);
        setValues(updatedValues);
    };

    const calculateRegression = () => {
        const matrixSize = numVariables + 1;
        const matrix = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));
        const matrixB = Array(matrixSize).fill(0);

        // สร้างแมทริกซ์ A และ B
        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                matrix[i][j] = values.reduce((acc, row) => acc + Math.pow(row[j], i + 1), 0);
            }
            matrixB[i] = values.reduce((acc, row, index) => acc + fx[index] * Math.pow(row[0], i + 1), 0); // เปลี่ยนให้รองรับตัวแปรที่ 0
        }

        const detA = det(matrix);
        const solutions = [];

        // ขั้นตอนการคำนวณ
        const stepsArray = [];
        const matrixLatex = `\\begin{bmatrix} ${matrix.map(row => row.join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;
        const constantsLatex = `\\begin{bmatrix} ${matrixB.join(' & ')} \\end{bmatrix}`;

        stepsArray.push(`\\text{Coefficient matrix: } ${matrixLatex}`);
        stepsArray.push(`\\text{Constants matrix: } ${constantsLatex}`);

        // คำนวณตัวแปรอิสระ
        for (let i = 0; i < matrixSize; i++) {
            const modifiedMatrix = matrix.map(row => [...row]);
            for (let j = 0; j < matrixSize; j++) {
                modifiedMatrix[j][i] = matrixB[j];
            }
            const detAi = det(modifiedMatrix);
            const solution = detAi / detA;
            solutions.push(solution);
            stepsArray.push(`x_${i} = \\frac{\\text{det}(A_{${i}})}{\\text{det}(A)} = \\frac{${detAi.toFixed(6)}}{${detA.toFixed(6)}} = ${solution.toFixed(6)}`);
        }

        setSteps(stepsArray);
    };

    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Multiple Regression Extrapolation</h1>
                    </div>
                    <div className='inputxlbi'>
                        <div className='input-group'>
                            <div className='input-item'>
                                <label>Number of points</label>
                                <input
                                    type="number"
                                    value={numPoints}
                                    onChange={inputPoints}
                                />
                            </div>
                            <div className='input-item'>
                                <label>Number of variables</label>
                                <input
                                    type="number"
                                    value={numVariables}
                                    onChange={(e) => setNumVariables(parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='checkbox-group'>
                        {Array.from({ length: numPoints }, (_, i) => (
                            <div key={i}>
                                <span>{i + 1} .</span>
                                {Array.from({ length: numVariables }, (_, j) => (
                                    <input
                                        key={j}
                                        type="number"
                                        value={values[i][j]}
                                        onChange={(e) => inputValue(i, j, e.target.value)}
                                        placeholder={`x${j}`}
                                    />
                                ))}
                                <input
                                    type="number"
                                    value={fx[i]}
                                    onChange={(e) => inputFx(i, e.target.value)}
                                    placeholder={`f(x${i})`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='calbi'>
                        <button className="btn btn-neutral btn-sm" onClick={calculateRegression}>
                            Calculate
                        </button>
                    </div>
                </div>
                {steps.length > 0 && (
                    <div className='table-container'>
                        {steps.map((step, idx) => (
                            <div key={idx} className='calculation-step'>
                                <BlockMath key={idx} math={step} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Regression;
