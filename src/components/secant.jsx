import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import Plot from "react-plotly.js";
import './component.css';
import NAvbar from './Navbar';

const Sample = () => {
    const [datachart, setDatachart] = useState([]);
    const [data, setData] = useState([]);
    const [x, setX] = useState(0)
    const [Equation, setEquation] = useState("");
    const [XL, setXL] = useState(0)
    const [XR, setXR] = useState(0)
    const [Error, seterror] = useState(0.000001)
    

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const Calsecant = (xl, xr) => { // xl = x0 , xr = x0
        let xm, fxm, fxr, fxl, ea, scope;
        let iter = 0;
        const MAX = 50;
        const e = 0.000001;
        let obj = [];
        let datachartTemp = [];

        do {
            scope = { x: xl };
            fxl = evaluate(Equation, scope)
            scope = { x: xr }
            fxr = evaluate(Equation, scope)

            xm = xr - (fxr * (xr - xl)) / (fxr - fxl)

            ea = error(xr, xm)
            iter++;

            obj.push({
                iteration: iter,
                Xl: xl,
                Xm: xm,
                Xr: xr
            });

            xl = xr;
            xr = xm;
            datachartTemp.push({ x: iter, y: xm });
        } while (ea > e && iter < MAX);

        setData(obj);
        setDatachart(datachartTemp);
        setX(xm);
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
        Calsecant(xlnum, xrnum);
    };

    const chartData = {
        data: [
            {
                type: "scatter",
                mode: "markers+lines",
                x: datachart.map((point) => point.x),
                y: datachart.map((point) => point.y),
                marker: { color: "red" },
                line: { color: "black" },
                name: "Secant Method",
            }
        ],
        layout: {
            title: "Secant Method",
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
                        <h1>Secant Method</h1>
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
                                    value={XL}
                                    onChange={inputXL}
                                    placeholder="Enter an X Start"
                                />
                            </div>
                            <div className='input-item'>
                                <label>X End:</label>
                                <input
                                    type="number"
                                    value={XR}
                                    onChange={inputXR}
                                    placeholder="Enter an X End"
                                />
                            </div>
                            {/* <div className='input-item'>
                                <label>Error:</label>
                                <input
                                    type="number"
                                    value={Error}
                                    onChange={inputerror}
                                    placeholder="Enter an X End"
                                />
                            </div> */}
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

export default Sample;
