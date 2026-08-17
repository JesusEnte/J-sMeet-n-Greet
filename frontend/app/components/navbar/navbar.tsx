import { NavLink, type NavLinkProps } from "react-router";
import { useLocation } from "react-router";
import './style.css'
import 'react'


function HighlightedNavLink(props: NavLinkProps){
    let location = useLocation().pathname
    let highlighted = location == props.to

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
        </nav>
    );
}