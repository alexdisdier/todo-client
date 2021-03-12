import React from 'react';

interface IProps {
    title: string;
}

const header: React.FC<IProps> = (props: IProps) => {
    const { title } = props;
    return (
        <header>
            <h1 className="wrapper">{title}</h1>
        </header>
    );
};

export default header;
