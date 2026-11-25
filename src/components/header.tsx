import { Link } from 'react-router'
import './header.css';

function Header() {
    return (
        <header className="header">
            <div className="header__brand">Movie App</div>
            <nav className="header__nav">
                <Link to="/">Home / Elenco</Link>
            </nav>
        </header>
    );
}

export default Header