import { NavLink, type NavLinkProps } from "react-router";
import { useLocation } from "react-router";
import './style.css'
import 'react'


function HighlightedNavLink(props: NavLinkProps){
    const location = useLocation().pathname
    const highlighted = location == props.to

    return (
        <NavLink to={props.to}>
            <div
                style={{
                    color: highlighted ? '#838383' : 'unset'
                }}
            >
                {props.children as React.ReactNode}
            </div>
        </NavLink>
    )
}

export default function Navbar() {
    const location = useLocation().pathname
    let codeElement
    if (!['/', '/join', '/create', '/docs'].includes(location)){
        codeElement = <div className='code'>
            <p>{location.replaceAll('/', '').toUpperCase()}</p>
        </div>
    }

    return (
        <nav className='navbar'>
            <HighlightedNavLink to='/' end>
                <img src='/favicon.ico' className='navbar-icon'/>
            </HighlightedNavLink>
            <HighlightedNavLink to='/join' end>
                Join
            </HighlightedNavLink>
            <HighlightedNavLink to='/create' end>
                Create
            </HighlightedNavLink>
            <HighlightedNavLink to='/docs' end>
                Docs
            </HighlightedNavLink>
            {codeElement}
        </nav>
    );
}