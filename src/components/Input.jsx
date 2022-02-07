import React, { Component } from "react";
import propTypes from "prop-types";

class Input extends Component {
  render() {
    const { name, value, callback, type, testid, dica } = this.props;
    return (
      <label htmlFor={name}>
        {name}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          data-testid={testid}
          onChange={callback}
          placeholder={dica}
        />
      </label>
    );
  }
}

Input.propTypes = {
  name: propTypes.string,
  value: propTypes.string,
  handleinputChange: propTypes.func,
  type: propTypes.string,
  dica: propTypes.string,
}.isRequired;

export default Input;
