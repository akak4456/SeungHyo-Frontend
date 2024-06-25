import React from 'react';
import ReactDOM from 'react-dom';
import styles from './tag.module.css';
import classNames from 'classnames';
const Tag = (props) => {
    return (
        <div className={classNames(styles.TagRoot)} style={
            {backgroundColor: props.backgroundColor,
                marginLeft: props.marginLeft
            }
            }>
            {props.text}
        </div>
    )
};
export default Tag;