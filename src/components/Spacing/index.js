import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';
const Spacing = ({ size, type }) => {
    let newClassname = styles.middle;
    if (classnames(size) === 'small') {
        newClassname = styles.small;
    } else if (classnames(size) === 'large') {
        newClassname = styles.large;
    }
    return <div className={newClassname} />;
};
export default Spacing;
