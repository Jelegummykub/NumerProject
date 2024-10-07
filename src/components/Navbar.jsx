import { Link } from 'react-router-dom';
import './component.css';

function Navbar() {

    return (
        <>
            <div className="navbar bg-base-100 ">
                <div className="flex-1">
                    <Link to='/'>
                        <a className="btn btn-ghost text-xl">Nummerical Method</a>
                    </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>

                        {/* <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    <li><a>Link 1</a></li>
                                    <li><a>Link 2</a></li>
                                </ul>
                            </details>
                        </li> */}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar
