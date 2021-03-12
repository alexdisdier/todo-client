import React from 'react';

import './Input.css';

interface IProps {
    name: string;
    value: string;
    handleChange(event: React.FormEvent<HTMLInputElement>): void;
}

const input: React.FC<IProps> = (props: IProps) => {
    const { name, value, handleChange } = props;

    return (
        <input
            className="card-task"
            placeholder="type some text here"
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
        />
    );
};

export default input;
