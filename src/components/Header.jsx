import { Link, useLocation } from 'react-router-dom';
import SearchInput from './SearchInput';

const Header = () => {
    return (
        <header className="header">
        <nav className="main-navbar container">
            <div className="logo">
                <Link to={"/"}>Car<span>Finder</span></Link>
            </div>
            <ul>
                {
                useLocation().pathname !== "/" && <li><Link to={'/'}>Home</Link></li>
                }
                <SearchInput />
            </ul>
        </nav>
        </header>
    )
}

export default Header
