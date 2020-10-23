import React from 'react';
import './Input.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    touched?: boolean;
    error?: string;
    label?: string;
    wrapperType?: string;
    disabled?: boolean;
}

const Input: React.FunctionComponent<Props> = ({
                                                   type,
                                                   className,
                                                   error,
                                                   touched,
                                                   name,
                                                   onChange,
                                                   onBlur,
                                                   label,
                                                   placeholder,
                                                   value,
                                                   required,
                                                   disabled,
                                               }) => {
    return (
        <div className={`input__wrapper`}>
            <label className="input__label">
                {label}
                {required && <span className="text--red">*</span>}
            </label>
            <input
                className={`input ${className} ${
                    touched && error ? 'input--error' : ''
                }`}
                type={type}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
            />
            {touched && error && <p className="input__error">{error}</p>}
        </div>
    );
};

export default Input;
