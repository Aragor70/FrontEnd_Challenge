import React from "react";
import styled from 'styled-components';

import * as colors from "../../colors";

export default function SearchBar ({ icon, id, type, placeholder, onChange }) {
  return (
    <InputWrapper className="search_bar_wrapper">
      <img src={icon.src} alt={icon.alt} htmlFor={id} width="25" />
      <input type={type} id={id} onChange={e => onChange(e.target)} placeholder={placeholder} />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 2px solid;
  color: ${colors.primaryColor};
  width: 100%;

  input {
    width: 100%;
    border: 0;
    outline: none;
    color: ${colors.primaryColor};
    font-size: 1em;
    margin-left: 10px;
    font-weight: 900;

    &::placeholder {
      opacity: .8;
      color: ${colors.primaryColor};
      font-weight: 300;
    }
    img {
      width: 35px;
      height: 35px;
    }

  }
`