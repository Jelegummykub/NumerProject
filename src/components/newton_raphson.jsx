import { derivative, evaluate } from 'mathjs';
import React, { useMemo, useState } from 'react';
import { Chart } from 'react-charts';
import './component.css';
import NAvbar from './Navbar';

const Sample = () => {
    const [datachart, setDatachart] = useState([
        {
            label: "Xm",
            data: [{ i: 0, v: 0 }],

        }
    ]);
    const [data, setData] = useState([]);
    const [x, setX] = useState(0)
    const [Equation, setEquation] = useState("");
    const [XL, setXL] = useState(0)

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
    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const Calonepoint = (xl) => {
        let xm = xl, fxm, ea, fxmprime;
        let iter = 0;
        const MAX = 50;
        const e = 0.000001;
        let obj = [];

        const Function = (x1) => evaluate(Equation, { x: x1 });
        const Derivative = (x1) => evaluate(derivative(Equation, 'x').toString(), { x: x1 });

        do {
            fxm = Function(xm)
            fxmprime = Derivative(xm)

            if (fxmprime === 0) {
                console.error("ดิฟแล้วมันได้ 0 Eโง่");
                return;
            }

            const xmNew = xm - fxm / fxmprime;

            ea = error(xm, xmNew);
            xm = xmNew;

            iter++;
            obj.push({
                iteration: iter,
                Xm: xm,
                Xl: xl
            });
        } while (ea > e && iter < MAX);


        setData(obj);
        setDatachart([
            {
                label: 'Xm',
                data: obj.map(r => ({ i: r.iteration, v: r.Xm })),
            },
        ])
        setX(xm);
    };

    const inputEquation = (event) => {
        setEquation(event.target.value);
    };

    const inputXL = (event) => {
        setXL(event.target.value);
    };


    const calculateRoot = () => {
        const xlnum = parseFloat(XL);
        Calonepoint(xlnum);
    };

    return (
        <>
            <NAvbar />
            <div>
                <div className='container1'>
                    <div className='headbi'>
                        <h1>Newton-Raphson Method</h1>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((element, index) => (
                                        <tr key={index}>
                                            <td data-label="Iteration">{element.iteration}</td>
                                            <td data-label="XL">{element.Xl}</td>
                                            <td data-label="XM">{element.Xm}</td>
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
