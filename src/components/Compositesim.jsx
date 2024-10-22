import 'katex/dist/katex.min.css';
import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';

function Compositesim() {
    const [xstart, setXstrat] = useState(null)
    const [xend, setXend] = useState(null)
    const [ampuntN, setAmountn] = useState(1)
    const [Equation, setEquation] = useState("")
    const [Steps, setSteps] = useState([])


    const inputEquation = (event) => {
        setEquation(event.target.value)
    }

    const inputXstart = (event) => {
        setXstrat(parseFloat(event.target.value))
    }


    const inputXend = (event) => {
        setXend(parseFloat(event.target.value))
    }

    const inputN = (event) => {
        setAmountn(parseFloat(event.target.value))
    }

    const calTrapezoidal = () => {
        let h = (xend - xstart) / ampuntN// 1.5
        let temph = h / 2
        let area = 0
        const f = (x) => evaluate(Equation, { x })

        area += f(xstart) + f(xend);


        for (let i = 1; i <= (ampuntN * 2) - 1; i++) {
            let x = xstart + i * temph; // Current x position
            if (i % 2 === 0) {
                console.log("even " , area += 2 * f(x))
            } else {
                console.log(" odd" ,area += 4 * f(x))
            }
            console.log(x)
        }



        area *= temph / 3
        console.log(area)


        const StepsArray = [];
        StepsArray.push(`F(x) = \\frac{h}{3} \\cdot \\left(f(a) + f(b) + 4 \\sum_{i=1}^{N-1} f(x_{i}) + 2 \\sum_{i=2}^{N-2} f(x_{i}) \\right)`);
        StepsArray.push(`h = \\frac{${xend} - ${xstart}}{${ampuntN}} = ${temph}`)
        StepsArray.push(`!Tip\\frac{${h}}2 = ${temph}`)
        StepsArray.push(`F(x) = \\frac{${temph}}{3} \\cdot \\left(${f(xstart)} + ${f(xend)} + 4 \\cdot \\sum_{i=1}^{${ampuntN - 1}} f(x_{i}) + 2 \\cdot \\sum_{i=2}^{${ampuntN - 2}} f(x_{i}) \\right) = ${area}`);

        setSteps(StepsArray);

    }

    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Composite Simpson's Rule</h1>
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
                                <label>X Start :</label>
                                <input
                                    type="number"
                                    value={xstart}
                                    onChange={inputXstart}
                                    placeholder="Enter an X Start"
                                />
                            </div>
                            <div className='input-item'>
                                <label>X End :</label>
                                <input
                                    type="number"
                                    value={xend}
                                    onChange={inputXend}
                                    placeholder="Enter an X End"
                                />
                            </div>
                            <div className='input-item'>
                                <label>N : </label>
                                <input
                                    type="number"
                                    value={ampuntN}
                                    onChange={inputN}
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
export default Compositesim
