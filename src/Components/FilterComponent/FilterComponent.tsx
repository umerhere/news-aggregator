import React, { useState } from 'react';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Article } from '../../store/slices/newsDataSlice';
import { SelectChangeEvent } from '@mui/material/Select';

interface FilterComponentProps {
  authors: string[];
  sources: string[];
  newsData: Article[] | null;
  onFilter: (filteredData: Article[] | null) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ authors, sources, newsData, onFilter }) => {
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string>('Select');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);

  const handleAuthorChange = (event: React.SyntheticEvent<Element, Event>, value: string[]) => {
    setSelectedAuthors(value);
  };

  const handleSourceChange = (event: SelectChangeEvent<string>) => {
    setSelectedSources(event.target.value);
  };

  const handleDateChange = (value: Dayjs | null) => {
    setStartDate(value);
  };

  const compareDates = (date1: string, date2: string): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const isSameYear = d1.getFullYear() === d2.getFullYear();
    const isSameMonth = d1.getMonth() === d2.getMonth();
    const isSameDay = d1.getDate() === d2.getDate();

    return isSameYear && isSameMonth && isSameDay;
  };

  const handleFilter = () => {
    const filtered = newsData?.filter((news) => {
      const isSourceMatch = selectedSources === 'Select' || news.source.name === selectedSources;
      const isAuthorMatch = selectedAuthors.length === 0 || selectedAuthors.includes(news.author);
      const isDateMatch = !startDate || compareDates(news.publishedAt, startDate.toString());

      return isSourceMatch && isAuthorMatch && isDateMatch;
    });

    if (filtered && filtered.length > 0) {
        onFilter(filtered);
        return
    }
    onFilter(null);
  };

  const handleReset = () => {
    setSelectedSources('Select');
    setSelectedAuthors([]);
    setStartDate(null);
    onFilter(newsData);
  };

  function formatSource(source: string): string {
    return source.replace(/-/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase());
  }

  return (
    <Grid style={{padding: '30px'}} container spacing={2} alignItems="center">
      <Grid item xs={12} sm={3}>
        <Autocomplete
          fullWidth
          multiple
          options={authors}
          value={selectedAuthors}
          onChange={handleAuthorChange}
          getOptionLabel={(option) => option}
          disableCloseOnSelect
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Authors" placeholder="Select Authors" />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Source</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedSources}
            label="Source"
            onChange={handleSourceChange}
          >
            <MenuItem value="Select">Select</MenuItem>
            {sources.map((source, index) => (
              <MenuItem key={index} value={source}>
                {formatSource(source)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid  item xs={12} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
          sx={{ width: '100%' }}

            label="Select a date"
            value={startDate}
            onChange={(newValue) => handleDateChange(newValue)}
          />
        </LocalizationProvider>
      </Grid>

      <Grid style={{display: 'flex'}} item xs={12} sm={3}>
      <Grid style={{marginRight: '5px'}} item xs={12} sm={6}>
        <Button fullWidth variant="contained" color="primary" onClick={handleFilter}>
          Filter
        </Button>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Button fullWidth variant="contained" color="error" onClick={handleReset}>
          Reset
        </Button>
      </Grid>
</Grid>
    </Grid>
  );
};

export default FilterComponent;
