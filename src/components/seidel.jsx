import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'katex/dist/katex.min.css';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';
import './component.css';

function Seidel() {

    const [Answer, SetAnswer] = useState(Array(3).fill(0))
  const [Matrix, SetMatrix] = useState(Array(3).fill().map(() => Array(3).fill(0)))
  const [dimitions, setdimitions] = useState(3)
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

  const caljacobi = (n, a, b, x) => {
    const Maxiteration = 100
    const e = 0.000001
    const A = a.map(row => [...row])
    let X = [...x]
    let obj = []
    let e1 = 1
    let iteration = 0

    while (e1 > e && iteration < Maxiteration) {
      e1 = 0;
      let newX = [...X];

      for (let i = 0; i < n; i++) {
        let temp = 0;

        for (let j = 0; j < n; j++) {
          if (i !== j) {
            temp += A[i][j] * X[j]
            console.log(temp)
          }
        }
        newX[i] = (b[i] - temp) / A[i][i];
        e1 += Math.abs(newX[i] - X[i]);
        X[i] = newX[i]
      }

    //   X = [...newX];
      iteration++;

      obj.push({
        iteration: iteration,
        X: X,
        error: e1
      });

      setData(obj)
      // console.log(`Iteration ${iteration}: X = [${X.join(', ')}], Error = ${e1}`);
    }
  }

  const calculatejacobi = () => {
    caljacobi(dimitions, Matrix, Answer, StartX)
  }

  const resetForm = () => {
    setdimitions(3)
    SetAnswer(Array(3).fill(0))
    SetMatrix(Array(3).fill().map(() => Array(3).fill(0)))
    SetStartX(Array(3).fill(0))
    setData([])
  }


    return (
        <>
            <Navbar />
            <div>
        <div className='container1'>
          <div className='headbi'>
            <h1>Gauss Seidel Medthod</h1>
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
              <button className="btn btn-neutral btn-sm" onClick={calculatejacobi} >
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
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Iteration</th>
                    <th>X</th>
                    <th>Error</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((element, index) => (
                    <tr key={index}>
                      <td>{element.iteration}</td>
                      <td>
                        <BlockMath math={`X = [${element.X.map(val => val.toFixed(6)).join(',')}]`} />
                      </td>
                      <td>
                        <BlockMath math={`Error = ${element.error.toFixed(6)}`} />
                      </td>
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

export default Seidel
