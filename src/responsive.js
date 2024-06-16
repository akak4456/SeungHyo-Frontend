import React from 'react';
import {useMediaQuery} from 'react-responsive';

export const isMobileQuery = "(max-width:768px)";

export const Mobile = ({children}) => {
    const isMobile = useMediaQuery({
        query : isMobileQuery
    });

    return <>{isMobile && children}</>
}

export const PC = ({children}) => {
    const isPc = useMediaQuery({
        query : "(min-width:769px)"
    });

    return <>{isPc && children}</>
}