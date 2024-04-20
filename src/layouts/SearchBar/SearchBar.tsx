import React, {useState} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

interface SearchBarProps {
    setSearchedValue: (value: string) => void
  }
  
const SearchBar = ({setSearchedValue}: SearchBarProps) => {
const [value, setValue] = useState('')
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        setSearchedValue(value)
        setValue('')
    }
  }
  return (
    <Box
      component="form"
      sx={{
          borderColor: 'red',
          background: 'white',
          
        '& > :not(style)': { m: 1, width: '25ch' },
        '& fieldset': { 
            borderColor: 'white',
            '&:hover': {
                borderColor: 'white',
            },
            '&:focus': {
                borderColor: 'white',
            },
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        onChange={(e) => setValue(e.target.value)}
        value={value}
        id="outlined-basic"
        label="Search"
        variant="outlined"  
        onKeyDown={(e) => handleSearch(e)}
      />
    </Box>
  )
}
export default SearchBar