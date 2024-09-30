import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
import Newton from './components/newton_raphson';
import Onepiont from './components/onepoint_iteration';
import Secant from './components/secant';
import Seidel from './components/seidel';
import TargetPage from './components/test';

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
            </Routes>
        </Router>
    );
}

export default App;
