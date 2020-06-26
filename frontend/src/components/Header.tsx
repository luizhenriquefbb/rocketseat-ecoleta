import React from "react";
import logo from '../assets/logo.svg';
import { Link } from "react-router-dom";
import { IconType } from "react-icons/lib";


interface BackLinkInterface {
    text : string;
    link : string;
    icon : IconType;
}

interface HeaderProps {
    backLink ?: BackLinkInterface;
}


const Header: React.FC<HeaderProps> = (props) => {

    return (
        <header >
            <Link to='/'>
                <img src={logo} alt="Ecoleta"/>
            </Link>

            {
                props.backLink &&
                <Link to={props.backLink.link}>
                    {props.backLink?.icon({})}
                    {props.backLink.text}
                </Link>
            }
        </header>
    )
};



export default Header;