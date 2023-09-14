import React, { useState } from 'react';
import { FloatLabelDiv } from './style';

const FloatingLabelComponent = props => {
    const [focus, setFocus] = useState(false);
    const { children, label, value } = props;

    const labelClass = focus || (value && value.length !== 0) ? "label label-float" : "label";
    return (
       <FloatLabelDiv className='float-label' onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
          {children}
          <label className={labelClass}>{label}</label>
       </FloatLabelDiv>
    );
};

export default FloatingLabelComponent;
