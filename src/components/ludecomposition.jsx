import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'katex/dist/katex.min.css';
import { all, create } from 'mathjs';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';
import './component.css';

const math = create(all);

function Ludecomposition() {
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
        SetAnswer(Array(3).fill(0))
        SetMatrix(Array(3).fill().map(() => Array(3).fill(0)))
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

    const matrixToLatex = (matrix) => {
        if (Array.isArray(matrix[0])) {
            // Handle 2D matrix
            let latex = '\\begin{bmatrix} ';
            for (let i = 0; i < matrix.length; i++) {
                latex += matrix[i].join(' & ') + ' \\\\ ';
            }
            latex += '\\end{bmatrix}';
            return latex;
        } else {
            // Handle 1D matrix (array), display vertically
            let latex = '\\begin{bmatrix} ';
            for (let i = 0; i < matrix.length; i++) {
                latex += matrix[i] + ' \\\\ ';
            }
            latex += '\\end{bmatrix}';
            return latex;
        }
    };


    const calLu = (n, a, b) => {
        let obj = []
        const A = a.map(row => [...row])
        const B = [...b]
        // console.log(A)
        let stepsArray = []
        let L = Array(n).fill().map(() => Array(n).fill(0))
        let U = Array(n).fill().map(() => Array(n).fill(0))
        let Y = Array(n).fill(0);
        let X = Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (j < i) {
                    L[i][j] = `l{${i + 1}${j + 1}}`
                    // console.log(tem  p)
                    // stepsArray.push(`\\text{l{${temp}}}`+ matrixToLatex(temp, temp))
                } else if (i === j) {
                    const t = A[j][i]
                    // console.log(t)
                    L[i][j] = `l{${i + 1}${i + 1}}`
                    U[i][j] = `{${1}}`
                } else {
                    U[i][j] = `u{${i + 1}${j + 1}}`
                }
            }
        }
        const L_latex = matrixToLatex(L);
        const U_latex = matrixToLatex(U);
        const A_latex = matrixToLatex(A);
        const B_latex = matrixToLatex(B);

        const equationLatex = `A = L \\cdot U = ${L_latex} \\cdot ${U_latex}`;
        stepsArray = [equationLatex]

        // LU decomposition
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (j < i) {
                    L[j][i] = 0;
                } else {
                    L[j][i] = A[j][i];
                    for (let k = 0; k < i; k++) {
                        L[j][i] -= L[j][k] * U[k][i];
                    }
                }
            }
            for (let j = 0; j < n; j++) {
                if (j < i) {
                    U[i][j] = 0;
                } else if (j === i) {
                    U[i][j] = 1;
                } else {
                    if (L[i][i] !== 0) {
                        U[i][j] = A[i][j] / L[i][i];
                    } else {
                        U[i][j] = 0;
                    }
                    for (let k = 0; k < i; k++) {
                        U[i][j] -= (L[i][k] * U[k][j]) / (L[i][i] || 1);
                    }
                }
            }
        }
        // Forward substitution to solve L * Y = B
        for (let i = 0; i < n; i++) {
            let temp = B[i];
            for (let j = 0; j < i; j++) {
                temp -= L[i][j] * Y[j];
            }
            if (L[i][i] !== 0) {
                Y[i] = temp / L[i][i];
            } else {
                Y[i] = 0;
            }
        }
        // Backward substitution to solve U * X = Y
        for (let i = n - 1; i >= 0; i--) {
            let temp = parseFloat(Y[i]);
            console.log(temp)
            for (let j = n - 1; j > i; j--) {
                temp -= U[i][j] * X[j];
            }
            if (U[i][i] !== 0) {
                X[i] = temp / U[i][i];
            } else {
                X[i] = 0;
            }
        }
        const showtext1 = `\\text{[L][U] = [A]}`;
        stepsArray.push(showtext1);
        const L_latex1 = matrixToLatex(L);
        const U_latex1 = matrixToLatex(U);
        const equationLatex1 = `  ${L_latex1} \\cdot ${U_latex1} = ${A_latex} `;
        stepsArray.push(equationLatex1)

        const showtext = `\\text{[L][Y] = [B]}`;
        stepsArray.push(showtext);


        const equationLatex2 = `  ${L_latex1} \\cdot \\begin{bmatrix} ${Y.map((y, index) => `y_{${index + 1}}`).join(' \\\\ ')} \\end{bmatrix} = ${B_latex} `;
        stepsArray.push(equationLatex2);

        const equationLatex3 = `\\begin{bmatrix} ${Y.map((y, index) => `y_{${index + 1}}`).join(' \\\\ ')} \\end{bmatrix} = \\begin{bmatrix} ${Y.map(y => y.toFixed(4)).join(' \\\\ ')} \\end{bmatrix}`;
        stepsArray.push(equationLatex3);

        const showtext2 = `\\text{[U][X] = [Y]}`;
        stepsArray.push(showtext2);

        const equationLatex4 = `  ${U_latex1} \\cdot \\begin{bmatrix} ${X.map((x, index) => `x_{${index + 1}}`).join(' \\\\ ')} \\end{bmatrix} = \\begin{bmatrix} ${Y.map(y => y.toFixed(4)).join(' \\\\ ')} \\end{bmatrix} `;
        stepsArray.push(equationLatex4);

        const solutionLatex = `Solution: \\mathbf{X} = \\begin{bmatrix} ${X.map(x => x.toFixed(0)).join(' \\\\ ')} \\end{bmatrix}`;
        stepsArray.push(solutionLatex);

        setSteps(stepsArray);
    }

    const calculateLu = () => {
        calLu(dimitions, Matrix, Answer)
    }

    const resetForm = () => {
        setdimitions(3)
        SetAnswer(Array(3).fill(0))
        SetMatrix(Array(3).fill().map(() => Array(3).fill(0)))
        setData([])
        setSteps([]);
    }

    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Lu Decomposition</h1>
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
                            <button className="btn btn-neutral btn-sm" onClick={calculateLu} >
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
                        <h3>Lu Decomposition</h3>
                        {steps.map((step, idx) => (
                            <div key={idx} className='calculation-step'>
                                <BlockMath>{step}</BlockMath>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Ludecomposition
