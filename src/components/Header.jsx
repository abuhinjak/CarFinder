import { Link, useLocation } from 'react-router-dom';

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
                <input className='search' type="text" name="Search" id="search" placeholder='Search' />
            </ul>
        </nav>
        </header>
    )
}

export default Header
