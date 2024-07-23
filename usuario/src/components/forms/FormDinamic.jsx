import React, { useState } from 'react'
import './styles/formDinamic.css'

export const FormDinamic = ({ field, className }) => {
    const handleChange = (e, fieldName) => {
        const { value } = e.target;
        field.find(field => field.name === fieldName)?.setFieldValue(value);
    };

    return (
        <div className={className}>
            {field.map((field, index) => (
                //<label htmlFor={field.name}>{field.label}</label>*/
                < input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    value={field.value}
                    placeholder={field.label}
                    onChange={(e) => handleChange(e, field.name)}
                    required
                />
            ))}
        </div>
    )
}
