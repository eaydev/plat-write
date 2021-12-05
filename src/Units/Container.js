import React from 'react';
import styled from 'styled-components';
import {device} from '../Utility/Device.js';

const baseContainer = ({className, children, list, darkMode})=>{
    return (
        <React.Fragment>
            {list ? <div className={className}>{children}</div> : <div className={darkMode ? 'skeleton-container full-span page-container rounded bg-lightgrey' : ' full-span page-container rounded bg-lightergrey skeleton-container'}>{children}</div>}
        </React.Fragment>        
    )
}

export const PageContainer = styled(baseContainer)`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:center;
    media ${device.tablet}{
        flex-direction: column;
    }
`