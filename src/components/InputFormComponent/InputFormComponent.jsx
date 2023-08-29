import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import React, { useState } from 'react';

const InputFormComponent = (props) => {
    const [valueInput, setValueInput] = useState('')
    const { placeholder = 'Nhập text', prefix, suffix, style, ...rests } = props
    return (
       <Input 
            placeholder={placeholder} 
            prefix={prefix}
            suffix={suffix} 
            valueInput={valueInput}
            style={style}
            {...rests}
        /> 
    )
};

export default InputFormComponent
