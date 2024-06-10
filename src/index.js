import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import Header from './header/header.js';

class Root extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Header />
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);