import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NAvbar from './Navbar';
import './component.css';

function Home() {
    const [select1, setSelect1] = useState("");
    const [select2, setSelect2] = useState("");
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (select1 && select2) {
            if (select1 === "Root44" && select2 === "Option 1-1") {
                navigate('/Grapical')
            } else if (select1 === "Root44" && select2 === "Option 1-2") {
                navigate('/target-page')
            } else if (select1 === "Root44" && select2 === "Option 1-3") {
                navigate('/False-Position')
            } else if (select1 === "Root44" && select2 === "Option 1-4") {
                navigate('/Onepoint-Iteration')
            } else if (select1 === "Root44" && select2 === "Option 1-5") {
                navigate('/Newton-Raphson')
            } else if (select1 === "Root44" && select2 === "Option 1-6") {
                navigate('/Secant')
            } else if (select1 === "Linear" && select2 === "Cramer") {
                navigate('/Cramer')
            } else if (select1 === "Linear" && select2 === "Elimination") {
                navigate('/Elimination')
            } else if (select1 === "Linear" && select2 === "Jordan") {
                navigate('/Jordan')
            } else if (select1 === "Linear" && select2 === "Inversion") {
                navigate('/Inversion')
            } else if (select1 === "Linear" && select2 === "Ludecomposition") {
                navigate('/Ludecomposition')
            } else if (select1 === "Linear" && select2 === "Jacobi") {
                navigate('/Jacobi')
            } else if (select1 === "Linear" && select2 === "Seidel") {
                navigate('/Seidel')
            } else if (select1 === "Linear" && select2 === "Gradient") {
                navigate('/Gradient')
            } else if (select1 === "Interpolation" && select2 === "Lagrange") {
                navigate('/Lagrange')
            } else if (select1 === "Interpolation" && select2 === "Newton") {
                navigate('/Newton')
            } else if (select1 === "Interpolation" && select2 === "Spline") {
                navigate('/Spline')
            } else if (select1 === "Extrapolation" && select2 === "Regression") {
                navigate('/Regression')
            } else if (select1 === "Extrapolation" && select2 === "Multiple") {
                navigate('/Multiple')
            } else if (select1 === "Integration" && select2 === "Trapezoidal") {
                navigate('/Trapezoidal')
            }else if (select1 === "Integration" && select2 === "Composite") {
                navigate('/Composite')
            }else if (select1 === "Integration" && select2 === "Simpson") {
                navigate('/Simpson')
            }else if (select1 === "Integration" && select2 === "Compositesim") {
                navigate('/Compositesim')
            }else if (select1 === "Differentiation" && select2 === "Differentiation") {
                navigate('/Differentiation')
            }else if (select1 === "Extrapolation" && select2 === "Polyregression") {
                navigate('/Polyregression')
            }
            
            
        }
    }, [select1, select2, navigate]);

    const handleSelect1Change = (event) => {
        const value = event.target.value;
        setSelect1(value);
        if (value === "Root44") {
            setOptions([
                { value: "Option 1-1", label: "Graphical Method" },
                { value: "Option 1-2", label: "Bisection Method" },
                { value: "Option 1-3", label: "Flase-position Method" },
                { value: "Option 1-4", label: "One-point Iteration Method" },
                { value: "Option 1-5", label: "Newton-Rapson Method" },
                { value: "Option 1-6", label: "Secant Method" },
            ]);
        } else if (value === "Linear") {
            setOptions([
                { value: "Cramer", label: "Cramer's Rule" },
                { value: "Elimination", label: "Gauss Elimination" },
                { value: "Jordan", label: "Gauss Jordan" },
                { value: "Inversion", label: "Mathix Inversion" },
                { value: "Ludecomposition", label: "Lu Decomposition" },
                { value: "Jacobi", label: "Jacobi Iteration Medthod" },
                { value: "Seidel", label: "Gauss Seidel Medthod" },
                { value: "Gradient", label: "Conjugate Gradient Medthod" },
            ]);
        } else if (value === "Interpolation") {
            setOptions([
                { value: "Newton", label: "Newton's Divided Difference" },
                { value: "Lagrange", label: "Lagrange Interpolation" },
                { value: "Spline", label: "Spline interpolation" },
            ]);
        } else if (value === "Extrapolation") {
            setOptions([
                { value: "Regression", label: "Simple Regression extrapolation" },
                { value: "Polyregression", label: "Polynomial Regression extrapolation" },
                { value: "Multiple", label: "Multiple Regression extrapolation" },

            ]);
        } else if (value === "Integration") {
            setOptions([
                { value: "Trapezoidal", label: "Single Trapezoidal Rule" },
                { value: "Composite", label: "Composite Trapezoidal Rule" },
                { value: "Simpson", label: " Single Simpson's Rule" },
                { value: "Compositesim", label: " Composite Simpson's Rule" },

            ]);
        } else if (value === "Differentiation") {
            setOptions([
                { value: "Differentiation", label: "Differentiation" },
            ]);
        } else {
            setOptions([]);
        }
        
       

    };

    const handleSelect2Change = (event) => {
        setSelect2(event.target.value);
    };

    return (
        <>
            <NAvbar />
            <div className='head'>
                <h1>Project Of Numerical Methods</h1>
                <div className="container">
                    <div className='select-container'>
                        <div className="select-row">
                            <label htmlFor="comboBox1">Choose Type of Problem</label>
                            <select id="comboBox1" value={select1} onChange={handleSelect1Change}>
                                <option value="">Select Problem</option>
                                <option value="Root44">Root of Equation</option>
                                <option value="Linear">Linear Algebra Equation</option>
                                <option value="Interpolation">Interpolation</option>
                                <option value="Extrapolation">Extrapolation</option>
                                <option value="Integration">Integration</option>
                                <option value="Differentiation">Differentiation</option>
                            </select>
                        </div>
                    </div>

                    {options.length > 0 && (
                        <div className='select-container'>
                            <div className="select-row">
                                <label htmlFor="comboBox2">Solution</label>
                                <select id="comboBox2" value={select2} onChange={handleSelect2Change}>
                                    <option value="">Select an option</option>
                                    {options.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;
