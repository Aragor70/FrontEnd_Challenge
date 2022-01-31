import React from "react";
import styled from 'styled-components';


export default function Checkbox ({ id, label, checked, onChange, attr, signChecked }) {
  // TODO: Style the component and checkmark to look like the mockup provided

  const handleChange = (e) => {
    
    signChecked(id)
    
    onChange(id, e.target.checked, attr)

  }

  return (
    <CheckboxCont>
      <input type="checkbox" id={id} checked={checked} name={attr} onChange={e => handleChange(e)}></input>
      <label htmlFor={id}>{label}</label>
    </CheckboxCont>
  )

}

const CheckboxCont = styled.div`
  position: relative;
  font-size: 1.2em;

  input {
    cursor: pointer
  }

  label {
    cursor: pointer
  }
`