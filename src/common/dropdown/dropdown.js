import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './dropdown.module.css';
import { CaretDownFill, Search } from 'react-bootstrap-icons';
import classNames from 'classnames';
import InputBox from '../input-box/input-box';

const Dropdown = props => {
    const [curText, setCurText] = useState(props.dropDownText[0]);
    const [isOpen, setIsOpen] = useState(false);
    const changeText = (text) => {
        setCurText(text);
        setIsOpen(false);
        if(props.onDropDownTextChange != null) {
            props.onDropDownTextChange(text);
        }
    }
    const listItem = props.dropDownText.map((text) => {
        return <li 
        className={classNames(
            {[styles.DropDownSelected]: curText == text}, 
            {[styles.DropDownUnselected]: curText != text}
        )} onClick={() => changeText(text)}>{text}</li>
    });
    return (
        <div className={styles.DropdownContainer}>
            <div className={styles.DropDownHeader} onClick={() => {setIsOpen(!isOpen);}}>
                <p className={styles.DropdownCurText}>{curText}</p>
                <CaretDownFill className={classNames(styles.DropdownDownFill, {[styles.DropdownDownFillRotate] : isOpen})}></CaretDownFill>
            </div>
            <div className={styles.DropDownContent} style ={{opacity: isOpen ? 1 : 0, visibility: isOpen ? 'visible' : 'collapse'}}>
                {props.isSearchIncluded && <div className={styles.DropDownSearchForm}>
                    <InputBox type="text" placeholder="검색"></InputBox>
                    <div>
                        <Search
                            size={16}
                            color='white'/>
                    </div>
                </div>}
                <ul className={styles.DropDownList}>
                    {listItem}
                </ul>
            </div>
        </div>
    )
}

export default Dropdown;