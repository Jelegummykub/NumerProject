import 'katex/dist/katex.min.css';
import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import Plot from "react-plotly.js";
import Navbar from './Navbar';


function Trapezoidal() {
    const [xstart, setXstrat] = useState(0)
    const [xend, setXend] = useState(0)
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

    const calTrapezoidal = () => {
        const h = (xend - xstart) / 2
        // console.log(h)

        // console.log(Equation)

        const f = (x) => {
            return evaluate(Equation, { x });
        };

        const area = (h) * (f(xstart) + f(xend));
        console.log(area)
        const StepsArray = [];
        StepsArray.push(`f(x_{0}) = f(${xstart}) = ${f(xstart)}`);
        StepsArray.push(`f(x_{1}) = f(${xend}) = ${f(xend)}`);
        StepsArray.push(`F(x) = \\frac{h}{2} \\cdot (f(a) + f(b)) = {${h}} \\cdot (${f(xstart)} + ${f(xend)}) = ${area}`);

        setSteps(StepsArray);

    }

    const getGraphData = () => {
        const xValues = [];
        const yValues = [];

        for (let x = xstart - 1; x <= xend + 1; x += 0.1) {
            xValues.push(x);
            yValues.push(evaluate(Equation, { x }));
        }

        return {
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines',
            line: { color: 'blue' },
        };
    };

    const getShadeData = () => {
        const xFill = [xstart, xend, xend, xstart];
        const yFill = [
            0,
            Number.isNaN(parseFloat(evaluate(Equation, { x: xstart })) ) ? 0 : parseFloat(evaluate(Equation, { x: xstart })),
            Number.isNaN(parseFloat(evaluate(Equation, { x: xend })) ) ? 0 : parseFloat(evaluate(Equation, { x: xend })),
            0
        ];
        console.log("xFill: ", xFill);
        console.log("yFill: ", yFill);

        return {
            x: xFill,
            y: yFill,
            fill: 'tozeroy',
            type: 'scatter',
            mode: 'lines',
            fillcolor: 'rgba(0, 100, 255, 0.3)',
            line: { color: 'rgba(0, 100, 255, 0)' },
        };
    };

    return (
        <>
            <Navbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Single Trapezoidal Rule</h1>
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
                    <div className='grap'>
                        <div className='congrap'>
                            <div className='w-full h-[40vh] md:h-[400px] lg:h-[500px] flex items-center justify-center'>
                                <Plot
                                    data={[getGraphData(), getShadeData()]}
                                    layout={{
                                        xaxis: { title: 'x' },
                                        yaxis: { title: 'f(x)' },
                                        showlegend: false,
                                    }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                )}

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

export default Trapezoidal
