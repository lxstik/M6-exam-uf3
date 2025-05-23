import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#343a40' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to="/" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.5rem' }}>
                        Yehor
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/camareros" style={{ fontFamily: 'Arial, sans-serif' }}>
                                    Camareros
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/usuarios" style={{ fontFamily: 'Arial, sans-serif' }}>
                                    Usuarios
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    );
};

export default Header;