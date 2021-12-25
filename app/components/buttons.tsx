import React from 'react';

interface Props {
    children?: React.ReactNode;
    onClick: () => void;
    type: 'primary' | 'secondary' | 'plain';
}

export const Button: React.FC<Props> = ({ children, onClick, type }) => {
    return <button className={`btn btn-${type}`} onClick={onClick}>{children}</button>
}

