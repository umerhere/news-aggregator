import React, { useState, useEffect, ChangeEvent } from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
import {CONSTANTS} from '../../core/constants'

export default function Settings() {
  const [selectedKeywords, setSelectedKeywords] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedSource, setSelectedSource] = useState('');

  useEffect(() => {
    // Load settings from local storage
    const savedName = localStorage.getItem('name');
    const savedKeywords = localStorage.getItem('selectedKeywords');
    const savedAuthor = localStorage.getItem('selectedAuthor');
    const savedSource = localStorage.getItem('selectedSource');

    if (savedKeywords) setSelectedKeywords(savedKeywords);
    if (savedAuthor) setSelectedAuthor(savedAuthor);
    if (savedSource) setSelectedSource(savedSource);
  }, []);

  const handleSave = () => {
    // Save settings to local storage
    localStorage.setItem('selectedKeywords', selectedKeywords);
    localStorage.setItem('selectedAuthor', selectedAuthor);
    localStorage.setItem('selectedSource', selectedSource);
  };

  return (
    <CenteredContainer>
      <FormControl defaultValue="" required>
        <Dropdown
          label="Category"
          value={selectedKeywords}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedKeywords(e.target.value)}
          options={CONSTANTS.INITIAL_KEYWORDS}
        />
        <Dropdown
          label="Authors"
          value={selectedAuthor}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedAuthor(e.target.value)}
          options={CONSTANTS.AUTHORS}
        />
        <Dropdown
          label="Sources"
          value={selectedSource}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedSource(e.target.value)}
          options={CONSTANTS.SOURCES}
        />
        <HelperText />
        <StyledButton onClick={handleSave}>Save</StyledButton>
      </FormControl>
    </CenteredContainer>
  );
}

const Dropdown = ({ label, value, onChange, options }: { 
  label: string; 
  value: string; 
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void; 
  options: string[] 
}) => {
  return (
    <DropdownContainer>
      <Label>{label}</Label>
      <select value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </DropdownContainer>
  );
};

const CenteredContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DropdownContainer = styled('div')`
  margin-bottom: 10px;
`;

const StyledInput = styled(Input)(
  ({ theme }) => `
  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  }
`,
);

const Label = styled(
  ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);

    if (formControlContext === undefined) {
      return <p>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
      <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
        {children}
        {required ? ' *' : ''}
      </p>
    );
  },
)`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props: {}) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const StyledButton = styled('button')`
  background-color: ${blue[500]};
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${blue[600]};
  }
`;



const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};
