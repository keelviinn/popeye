import styles from 'styled-components/macro';
import Select from 'react-select';

export const FormContainer = styles.form`
  width: 350px;

  background: #ffffff;
  border: 1px solid #d3e2e5;
  border-radius: 30px;

  padding: 10px 10px;

  position: absolute;
  top: 40px;
  right: 20px;

  z-index: 1;
`;

export const FieldSet = styles.fieldset`
  border: 0;
`;

export const Legend = styles.legend`
  width: 100%;

  font-size: 28px;
  line-height: 34px;
  color: #5c8599;
  font-weight: 700;

  border-bottom: 1px solid #d3e2e5;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

export const InputWrapper = styles.div`
  margin-bottom: 24px;
`;

export const Label = styles.label`
  display: flex;
  color: #8fa7b3;
  margin-bottom: 8px;
  margin-left: 10px;
  line-height: 24px;
`;

export const InputSelect = styles(Select)` 
  width: 100%;
  background: #f5f8fa;
  border: 1px solid #d3e2e5;
  border-radius: 20px;
  outline: none;
  color: #5c8599;

  input {
    height: 36px;
    padding: 0 16px;
  }

  .filter__control {
    border-radius: 20px !important;
  
    width: 100% !important;
    background: #f5f8fa !important;
    border: 1px solid #d3e2e5 !important;
    border-radius: 20px !important;
    outline: none !important;
    color: #5c8599 !important;
  }
  
  .filter__option {
    background: #f5f8fa !important;
    color: #5c8599 !important;
  }
  
  .filter__option--is-focused {
    background: #d3e2e5 !important;
    color: #010101 !important;
  }
`;

export const Button = styles.button`
  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background-color: #4254f5;
  border-radius: 20px;
  color: #ffffff;
  font-weight: 800;

  transition: background-color 0.2s;
  
  &:hover {
    background-color: #6c79f5;
  }
`;