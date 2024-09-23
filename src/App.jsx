import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cramer from './components/cramer';
import Elimination from './components/elimination';
import FalsePosition from './components/false_position';
import Graphical from './components/Grapical';
import Home from './components/home';
import Newton from './components/newton_raphson';
import Onepiont from './components/onepoint_iteration';
import Secant from './components/secant';
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
            </Routes>
        </Router>
    );
}

export default App;
