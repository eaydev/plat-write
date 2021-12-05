import styled from 'styled-components';
import {device} from '../Utility/Device.js';

const baseButton = ({className, children, clickhandler, disabled})=>{
    return (
        <button className={className} onClick={clickhandler} disabled={disabled ? true : false}>{children}</button>
    )
}

export const Button = styled(baseButton)`
    cursor: pointer;
    margin: 0;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-basis: 0;
    border: ${props=> props.darkMode ? "1px solid #d63031" : "1px solid black"};
    background: ${props=> props.darkMode ? "#d63031" : "#b2bec3"};
    color: ${props=> props.darkMode ? "white" : "black"};
    padding: 10px 20px;
    margin: 10px;
    box-sizing:border-box;
    border-radius: 10px;
    text-align: center;
`