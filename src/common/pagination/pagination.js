import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './pagination.module.css';
import { NavLink } from 'react-router-dom';
const Pagination = ({minVal, maxVal, isPrevInclude, isNextInclude, goToLink, prevLink, nextLink}) => {
    const numbers = Array.from({length: maxVal - minVal + 1}, (_, i) => minVal + i);
    return (
        <div className={styles.PaginationRoot}>
            {isPrevInclude && <NavLink to={prevLink}>이전 페이지</NavLink>}
            {numbers.map((num) => (
                <NavLink key={num} to={goToLink(num)}>{num}</NavLink>
            ))
            }
            {isNextInclude && <NavLink to={nextLink}>다음 페이지</NavLink>}
        </div>
    )
}
export default Pagination;