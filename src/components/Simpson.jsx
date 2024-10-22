import 'katex/dist/katex.min.css';
import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';

function Simpson() {
    const [xstart, setXstrat] = useState(null)
    const [xend, setXend] = useState(null)
    const [Equation, setEquation] = useState("")
    const [Steps, setSteps] = useState([])


    const inputEquation = (event) => {
        setEquation(event.target.value)
    }

    const inputXstart = (event) => {
        setXstrat(parseFloat(event.target.value))
    }


    const inputXend = (event) => {
        setXend(event.target.value)
    }

    const calTrapezoidal = () => {
        const h = (xend - xstart) / 2
        console.log(h)

        // console.log(Equation)

        const f = (x) => {
            return evaluate(Equation, { x })
        }

        const area = (h / 3) * (f(xstart) + (4 * f((xstart + h) / 2)) + f(xend))
        console.log(area)

        // const area = (h) * (f(xstart) + f(xend));
        // console.log(area)
        const StepsArray = [];
        StepsArray.push(`f(x{0}) = f(${xstart}) = ${f(xstart)}`);
        StepsArray.push(`f(x{1}) = f(${xstart + h}) = ${f(xstart + h)}`);
        StepsArray.push(`f(x{2}) = f(${xend}) = ${f(xend)}`);
        StepsArray.push(`F(x) = \\frac{h}{3} \\cdot (f(a) + 4f(x{1}) + f(b)) = \\frac{${h}}{3} \\cdot (${f(xstart)} + 4 \\cdot ${f(xstart + h)} + ${f(xend)}) = ${area.toFixed(6)}`);

        setSteps(StepsArray);

    }

    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Single Simpson's Rule</h1>
                    </div>
                    <div className='inputEquationbi'>
                        <div className='P'>
                            <p>F(x): {Equation}</p>
                        </div>
                        <div className='input1'>
                            <input
                                type="text"
                                value={Equation}
                                onChange={inputEquation}
                                placeholder="Enter an equation"
                            />
                        </div>
                    </div>
                    <div className='inputxlbi'>
                        <div className='input-group'>
                            <div className='input-item'>
                                <label>X Start:</label>
                                <input
                                    type="number"
                                    value={xstart}
                                    onChange={inputXstart}
                                    placeholder="Enter an X Start"
                                />
                            </div>
                            <div className='input-item'>
                                <label>X End:</label>
                                <input
                                    type="number"
                                    value={xend}
                                    onChange={inputXend}
                                    placeholder="Enter an X End"
                                />
                            </div>

                        </div>
                    </div>
                    <div className='calbi'>
                        <button className="btn btn-neutral btn-sm" onClick={calTrapezoidal}>
                            Calculate
                        </button>
                    </div>
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

export default Simpson
