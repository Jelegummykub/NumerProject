import axios from 'axios';
import 'katex/dist/katex.min.css';
import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Navbar from './Navbar';


function Composite() {
    const [xstart, setXstrat] = useState(0)
    const [xend, setXend] = useState(0)
    const [ampuntN, setAmountn] = useState(1)
    const [Equation, setEquation] = useState("")
    const [Steps, setSteps] = useState([])
    const [datachart, setDatachart] = useState([])

    const fetchRandomEquation = async () => {
        try {
            const response = await axios.get('http://localhost:4000/integrateq/value')
            if (response.data.result) {
                const equations = response.data.data
                const randomIndex = Math.floor(Math.random() * equations.length)
                const randomEquation = equations[randomIndex].equationintegrat
                setEquation(randomEquation)
                setXstrat("")
                setXend("")
                setSteps([])
            }
        } catch (error) {

        }
    }


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
        setAmountn(parseInt(event.target.value))
    }

    const calTrapezoidal = () => {
        const h = (xend - xstart) / ampuntN
        let area = 0
        const f = (x) => evaluate(Equation, { x })

        area += f(xstart) + f(xend)
        const xValues = [xstart, xend]
        const yValues = [f(xstart), f(xend)]
        console.log(xValues)
        console.log(yValues)
        // const trapezoidalXValues = [];
        // const trapezoidalYValues = [];

        for (let i = 1; i < ampuntN; i++) {
            const x = xstart + i * h
            area += 2 * f(x)
            // trapezoidalXValues.push(xstart + (i - 1) * h, x, null); // Closing the trapezoid with null for discontinuity
            // trapezoidalYValues.push(f(xstart + (i - 1) * h), f(x), null);
        }

        area *= h / 2


        const StepsArray = [];

        StepsArray.push(`F(x) = \\frac{h}{2} \\cdot (f(a) + f(b)) + 2 \\sum_{i=1}^{N-1} f(x_{i})`);
        StepsArray.push(`h = \\frac{${xend} - ${xstart}}{${ampuntN}} = ${h}`);
        StepsArray.push(`F(x) = \\frac{${h}}{2} \\cdot \\left(${f(xstart)} + ${f(xend)} + 2 \\sum_{i=1}^{${ampuntN - 1}} f(x_{i}) \\right) = ${area}`);

        setSteps(StepsArray)

        // setDatachart([
        //     {
        //         x: xValues,
        //         y: yValues,
        //         type: 'scatter',
        //         mode: 'lines+markers',
        //         marker: { color: 'blue' },
        //         name: 'f(x)',
        //     },
        //     {
        //         x: trapezoidalXValues,
        //         y: trapezoidalYValues,
        //         type: 'scatter',
        //         mode: 'lines',
        //         fill: 'tozeroy',
        //         fillcolor: 'rgba(0, 100, 255, 0.3)',
        //         line: { color: 'rgba(0, 100, 255, 0)' },
        //         name: 'Area',
        //     },
        // ])

    }



    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Composite Trapezoidal Rule</h1>
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
                                    placeholder="2"
                                />
                            </div>
                            <div className='input-item'>
                                <label>X End :</label>
                                <input
                                    type="number"
                                    value={xend}
                                    onChange={inputXend}
                                    placeholder="8"
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
                        <button className="btn btn-sm btn-warning" onClick={fetchRandomEquation}>
                            Random
                        </button>
                        <button className="btn btn-neutral btn-sm" onClick={calTrapezoidal}>
                            Calculate
                        </button>
                    </div>
                </div>
                {/* <div className='grap'>
                    <div className='congrap'>
                        <div className='w-full h-[40vh] md:h-[400px] lg:h-[500px] flex items-center justify-center'>
                            <Plot
                                data={datachart}
                                layout={{
                                    title: 'Composite Trapezoidal Rule',
                                    xaxis: { title: 'x' },
                                    yaxis: { title: 'f(x)' },
                                    showlegend: true,
                                    autosize: true,
                                }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>
                </div> */}
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

export default Composite
