import { evaluate } from 'mathjs';
import React, { useMemo, useState } from 'react';
import { Chart } from 'react-charts';
import './component.css';
import NAvbar from './Navbar';

const Graphicalmethod = () => {
    const [datachart, setDatachart] = useState([
        {
            label: "Xm",
            data: [{ i: 0, v: 0 }],

        }
    ])

    const [data, setData] = useState([]);
    const [x, setX] = useState(0)
    const [Equation, setEquation] = useState("");
    const [XL, setXL] = useState(0)
    const [XR, setXR] = useState(0)

    const epsilon = 0.000001;
    const Error = (eq, xValue) => {
        if (eq && !isNaN(xValue)) {
            const scope = { x: xValue };
            return evaluate(eq, scope);
        }
    };

    const primaryAxis = useMemo(
        () => ({
            getValue: datum => datum.i,
        }),
        [],
    )

    const secondaryAxes = useMemo(
        () => [{
            getValue: datum => datum.v,
        }],
        [],
    )

    const Calgrapical = (xl, xr) => { // y x
        let y = xl, z = xr;
        let obj = [];
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
        }

        setData(obj);
        setDatachart([
            {
                label: 'Xm',
                data: obj.map(r => ({ i: r.iteration, v: r.Xm })),
            },
        ])
        setX(y);
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
                        <div className='h-[400px] w-[400px]'>
                            <Chart
                                options={{
                                    data: datachart,
                                    primaryAxis,
                                    secondaryAxes,
                                }}
                            />
                            {/* sizechart */}
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
