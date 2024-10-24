import axios from 'axios';
import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import Plot from "react-plotly.js";
import './component.css';
import NAvbar from './Navbar';

const Graphicalmethod = () => {
    const [datachart, setDatachart] = useState([
        // {
        //     label: "Xm",
        //     data: [{ i: 0, v: 0 }],

        // }
    ])

    const fetchRandomEquation = async () => {
        try {
            const response = await axios.get('http://localhost:3002/info/root')
            if (response.data.result) {
                const equations = response.data.data
                const randomIndex = Math.floor(Math.random() * equations.length)
                const randomEquation = equations[randomIndex].equation;
                setEquation(randomEquation)
                setXL("")
                setXR("")
                setData([])
                setDatachart([])
                setX(0)
            }
        } catch (error) {
            console.error("Error fetching random equation", error)
        }
    }


    const [data, setData] = useState([]);
    const [x, setX] = useState(0)
    const [Equation, setEquation] = useState("");
    const [XL, setXL] = useState(null)
    const [XR, setXR] = useState(null)

    const epsilon = 0.000001;
    const Error = (eq, xValue) => {
        if (eq && !isNaN(xValue)) {
            const scope = { x: xValue };
            return evaluate(eq, scope);
        }
    };

    // const primaryAxis = useMemo(
    //     () => ({
    //         getValue: datum => datum.i,
    //     }),
    //     [],
    // )

    // const secondaryAxes = useMemo(
    //     () => [{
    //         getValue: datum => datum.v,
    //     }],
    //     [],
    // )

    const Calgrapical = (xl, xr) => { // y x
        let y = xl, z = xr;
        let obj = [];
        let datachartTemp = [];
        let iter = 0;
        const MAX = 50;

        for (let x = xl; x < xr; x += 0.01) {
            const fx = Error(Equation, x);
            const fx1 = Error(Equation, x + 0.01);

            if (fx * fx1 < 0) {
                y = x;
                z = x + 0.01;
                break;
            }
        }

        while (y <= z && iter < MAX) {
            const fy = Error(Equation, y);
            const fyPlusEpsilon = Error(Equation, y + epsilon);

            if (fy * fyPlusEpsilon < 0) {
                break;
            }

            y += epsilon;
            iter++;

            obj.push({
                iteration: iter,
                Xl: xl,
                Xm: y,
                Xr: xr
            });
            datachartTemp.push({ x: iter, y: y });
        }

        setData(obj);
        // setDatachart([
        //     {
        //         label: 'Xm',
        //         data: obj.map(r => ({ i: r.iteration, v: r.Xm })),
        //     },
        // ])
        setX(y);
        setDatachart(datachartTemp);
    };

    const inputEquation = (event) => {
        setEquation(event.target.value);
    };

    const inputXL = (event) => {
        setXL(event.target.value);
    };

    const inputXR = (event) => {
        setXR(event.target.value);
    };



    const calculateRoot = () => {
        const xlnum = parseFloat(XL);
        const xrnum = parseFloat(XR);
        Calgrapical(xlnum, xrnum);
    }

    const chartData = {
        data: [
            {
                type: "scatter",
                mode: "markers+lines",
                x: datachart.map((point) => point.x),
                y: datachart.map((point) => point.y),
                marker: { color: "red" },
                line: { color: "black" },
                name: "Graphical Method",
            }
        ],
        layout: {
            title: "Graphical Method",
            xaxis: {
                title: "Iteration",
                zeroline: true,
            },
            yaxis: {
                title: "Root (Xm)",
                zeroline: true,
            },
        },
    };


    return (
        <>
            <NAvbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Grapical Method</h1>
                    </div>
                    <div className='inputEquationbi'>
                        <div className='P'>
                            <p>F(x): {Equation}</p>
                        </div>
                        <div className='input1'>
                            <input
                                type="text"
                                value={Equation} //x^3-12
                                onChange={inputEquation} // Equation setEquation
                                placeholder="43^x-1"
                            />
                        </div>
                        <div className='calbi'>
                            <button className="btn btn-neutral btn-s " onClick={fetchRandomEquation}>
                                random
                            </button>
                        </div>
                    </div>
                    <div className='inputxlbi'>
                        <div className='input-group'>
                            <div className='input-item'>
                                <label>X Start:</label>
                                <input
                                    type="number"
                                    value={XL}
                                    onChange={inputXL}
                                    placeholder="0"
                                />
                            </div>
                            <div className='input-item'>
                                <label>X End:</label>
                                <input
                                    type="number"
                                    value={XR}
                                    onChange={inputXR}
                                    placeholder="10"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='calbi'>
                        <button className="btn btn-neutral btn-sm" onClick={calculateRoot}>
                            Calculate
                        </button>
                    </div>
                    <div className='calbi'>
                        <p>Root: {x}</p>
                    </div>
                </div>
                <div className='grap'>
                    <div className='congrap'>
                        <div className='w-full h-[40vh] md:h-[400px] lg:h-[500px] flex items-center justify-center'>
                            <Plot
                                data={chartData.data}
                                layout={{
                                    ...chartData.layout,
                                    autosize: true,
                                }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {data.length > 0 && (
                        <div className='table-container'>
                            <table>
                                <thead>
                                    <tr>
                                        <th data-label="Iteration">Iteration</th>
                                        <th data-label="XL">XL</th>
                                        <th data-label="XM">XM</th>
                                        <th data-label="XR">XR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((element, index) => (
                                        <tr key={index}>
                                            <td data-label="Iteration">{element.iteration}</td>
                                            <td data-label="XL">{element.Xl}</td>
                                            <td data-label="XM">{element.Xm}</td>
                                            <td data-label="XR">{element.Xr}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Graphicalmethod;
