import React from 'react';
import Header from './header';
import Footer from './footer';
import { useAxiosInterceptor } from '../api/Common';

const Layout = ({ children }) => {
	useAxiosInterceptor();
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
