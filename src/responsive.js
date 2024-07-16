/*
responsive.js 는
hooks/media-query.js 에 의해 삭제될 예정임
기존에 사용하던 코드는 대체하도록 하고
이 파일은 삭제할 것
*/
import React from 'react';
import { useMediaQuery } from 'react-responsive';
export const isTabletQuery = '(max-width:961px)';
export const isMobileQuery = '(max-width:768px)';

export const Mobile = ({ children }) => {
	const isMobile = useMediaQuery({
		query: isMobileQuery,
	});

	return <>{isMobile && children}</>;
};

export const PC = ({ children }) => {
	const isPc = useMediaQuery({
		query: '(min-width:769px)',
	});

	return <>{isPc && children}</>;
};
