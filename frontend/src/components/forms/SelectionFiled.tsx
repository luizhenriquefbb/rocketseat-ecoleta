import React from 'react';

interface IMySelect {
    fieldName: string,
    fieldId: string,
    optionCaption : string,
    onChange : ((event: React.ChangeEvent<HTMLSelectElement>) => void) | undefined,
}

interface ISelectionField<option> extends IMySelect{
    options : option[],
}

interface IOption {
    name :string
}

interface UFOption extends IOption{
    sigla: string
}

interface CityOption extends IOption{ }

const MySelect:React.FC<IMySelect> = (props) => {
    return <div className="field">
                <label htmlFor={props.fieldId}></label>
                <select
                    name={props.fieldId}
                    id={props.fieldId}
                    onChange={props.onChange}
                    defaultValue=""
                >
                    <option disabled value="" > {props.optionCaption} </option>

                    {props.children}

                </select>
            </div>
}

export const SelectionCityField :React.FC<ISelectionField<CityOption>> = (props) => {
    return <MySelect {...props} >
                {props.options.map((option, index) => {
                    return <option value={option.name} key={index}> {option.name} </option>
                })}
            </MySelect>
}

export const SelectionUFField :React.FC<ISelectionField<UFOption>> = (props) => {
    return  <MySelect {...props} >
                {props.options.map((option, index) => {
                    return <option value={option.sigla} key={index}> {option.name} </option>
                })}
            </MySelect>
}