import React, { Fragment } from "react";
import Checkbox from "../checkbox";
import styled from 'styled-components';

import line from '../../images/ezgif.com-gif-maker2.png'
import plus from '../../images/ezgif.com-gif-maker1.png'

export default class ExpandableFilter extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isExpanded: false,
      checked: ''
    };
  }

  signChecked = (value) => {
    if (this.state.checked === value) {
      this.setState({checked: ''})
    } else {
      this.setState({checked: value})
    }
    
  }

  render() {

    const { arry, label, onChange } = this.props

    const { isExpanded, checked } = this.state


    return (
      <Fragment>

        <Title style={ isExpanded ? {} : {marginBottom: 0} }>
          <div onClick={() => this.setState({ isExpanded: !isExpanded })}><span style={{ marginRight: '16px' }}>{isExpanded ? <img src={line} className="checkImg" alt="line" /> : <img className="checkImg" src={plus} alt="plus" />}</span><span>{label}</span></div> 
        </Title>
        <CheckboxesCont>
        {
          isExpanded && arry.map((element, index) => <Checkbox key={index} id={element.id} checked={checked === element.id} signChecked={this.signChecked} name={element.name} label={element.name} onChange={onChange} attr={label} />)
        }
        </CheckboxesCont>
      </Fragment>
    )

  }

}
const CheckboxesCont = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3.5px;
  width: 100%;
`
const Title = styled.h4`
  display: block;
  font-size: 1.2em;
  margin: 0.55em 0;
  cursor: pointer;
`