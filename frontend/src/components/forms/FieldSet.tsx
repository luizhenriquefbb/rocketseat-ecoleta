import React from "react";


interface IFieldSet {
    legend: string;
    description:string;
}

const FieldSet: React.FC<IFieldSet> = (props) => {
    return (
        <fieldset>
            <legend>
                <h2>{props.legend}</h2>
                <span>{props.description}</span>
            </legend>

           {props.children}
        </fieldset>
    );
}

export default FieldSet;