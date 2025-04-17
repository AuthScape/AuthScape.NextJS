import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { FieldLabel } from '@measured/puck';

export const ColorPickerField = ({ field, value, onChange }) => {
    const [color, setColor] = useState(value || '#000');

    // alert("test")

    const handleColorChange = (color) => {
        setColor(color.hex);
        onChange(color.hex);
    };

    return (
        <FieldLabel label={field.label}>
            <SketchPicker color={color} onChangeComplete={handleColorChange} />
        </FieldLabel>
    );
};