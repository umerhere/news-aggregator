// src/components/SettingsPage.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSettings } from 'store/slices/settingsSlice'; // Adjust this import path
import { RootState } from 'store/index'; // Adjust this import path
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { CONSTANTS } from 'core/constants'; // Importing constants

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const currentSettings = useSelector((state: RootState) => state.settingsSlice);
  
  const [preferredAuthor, setPreferredAuthor] = useState(currentSettings.preferredAuthor);
  const [preferredCategory, setPreferredCategory] = useState(currentSettings.preferredCategory);
  const [preferredSource, setPreferredSource] = useState(currentSettings.preferredSource);

  useEffect(() => {
    setPreferredAuthor(currentSettings.preferredAuthor);
    setPreferredCategory(currentSettings.preferredCategory);
    setPreferredSource(currentSettings.preferredSource);
  }, [currentSettings]);

  const handleSaveSettings = () => {
    const newSettings = {
      preferredAuthor,
      preferredCategory,
      preferredSource,
    };
    dispatch(updateUserSettings(newSettings)); // Dispatch action to update Redux store
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        User Settings
      </Typography>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Preferred Author"
          value={preferredAuthor}
          onChange={(e) => setPreferredAuthor(e.target.value)}
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Preferred Category</InputLabel>
        <Select
          labelId="category-label"
          value={preferredCategory}
          onChange={(e) => setPreferredCategory(e.target.value)}
          variant="outlined"
        >
          {CONSTANTS.CATEGORIES.map((category: string) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="source-label">Preferred Source</InputLabel>
        <Select
          labelId="source-label"
          value={preferredSource}
          onChange={(e) => setPreferredSource(e.target.value)}
          variant="outlined"
        >
          {CONSTANTS.SOURCES.map((source: string) => (
            <MenuItem key={source} value={source}>
              {source}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveSettings}
        fullWidth
      >
        Save Settings
      </Button>
    </Container>
  );
};

export default SettingsPage;
