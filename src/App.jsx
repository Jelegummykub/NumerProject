import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Composite from './components/Composite';
import Compositesim from './components/Compositesim';
import Cramer from './components/cramer';
import Elimination from './components/elimination';
import FalsePosition from './components/false_position';
import Gradient from './components/gradient';
import Graphical from './components/Grapical';
import Home from './components/home';
import Inversion from './components/inversion';
import Jacobi from './components/jacobi';
import Jordan from './components/jordan';
import Lagrane from './components/Lagrane';
import Ludecomposition from './components/ludecomposition';
import Multiple from './components/Multiple';
import NewtonDD from './components/Newton';
import Newton from './components/newton_raphson';
import Onepiont from './components/onepoint_iteration';
import Regression from './components/regression';
import Secant from './components/secant';
import Seidel from './components/seidel';
import Simpson from './components/Simpson';
import Spline from './components/spline';
import TargetPage from './components/test';
import Trapezoidal from './components/Trapezoidal';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/target-page" element={<TargetPage />} />
                <Route path="/Grapical" element={<Graphical />}/>
                <Route path="/False-Position" element={<FalsePosition />}/>
                <Route path="/Onepoint-Iteration" element={<Onepiont />}/>
                <Route path="/Newton-Raphson" element={<Newton />}/>
                <Route path="/Secant" element={<Secant />}/>
                <Route path="/Cramer" element={<Cramer />}/>
                <Route path="/Elimination" element={<Elimination />}/>
                <Route path="/Jordan" element={<Jordan />}/>
                <Route path="/Inversion" element={<Inversion />}/>
                <Route path="/Ludecomposition" element={<Ludecomposition />}/>
                <Route path="/Jacobi" element={<Jacobi />}/>
                <Route path="/Seidel" element={<Seidel />}/>
                <Route path="/Gradient" element={<Gradient />}/>
                <Route path="/Lagrange" element={<Lagrane />}/>
                <Route path="/Newton" element={<NewtonDD />}/>
                <Route path="/Spline" element={<Spline />}/>
                <Route path="/Regression" element={<Regression />}/>
                <Route path="/Multiple" element={<Multiple />}/>
                <Route path="/Trapezoidal" element={<Trapezoidal />}/>
                <Route path="/Composite" element={<Composite />}/>
                <Route path="/Simpson" element={<Simpson />}/>
                <Route path="/Compositesim" element={<Compositesim />}/>
            </Routes>
        </Router>
    );
}

export default App;
