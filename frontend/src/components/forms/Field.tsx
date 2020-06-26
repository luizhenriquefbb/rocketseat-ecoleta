import React from 'react';

interface IField <valueFormat = string>{
    fieldName:string;
    fieldId: string;
    fieldType: "text";
    value: valueFormat;
    onChange: React.Dispatch<React.SetStateAction<valueFormat>>;
}

const InputFieldText: React.FC<IField> = (props) => {

    return (
        <div className="field">
            <label htmlFor="name"> {props.fieldName} </label>
            <input
                type="text"
                name={props.fieldId}
                id={props.fieldId}
                value={props.value}
                onChange={(evt) => props.onChange(evt.target.value) }
            />
        </div>
    );
}

export default InputFieldText;
