import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSearchAutoComplete, fetchTracks } from './searchAPI';

const initialState = {
  term: '',
  album: [],
  suggestions: [],
  result: [],
  status: 'idle'
};

export const searchAutoComplete = createAsyncThunk(
  'search/autoComplete',
  async (term) => {
    const response = await fetchSearchAutoComplete(term);
    const json = await response.json();
    return json.data;
  }
);

export const fetchTracksByAlbum = createAsyncThunk(
  'search/tracksByAlbum',
  async (id) => {
    const response = await fetchTracks(id);
    const json = await response.json();
    return json;
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchByArtist: (state, action) => {
      state.term = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchAutoComplete.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchAutoComplete.fulfilled, (state, action) => {
        state.status = 'idle';
        state.suggestions = action.payload;
      })
      .addCase(fetchTracksByAlbum.fulfilled, (state, action) => {
        state.album = action.payload;
      });
  }
});

export const { searchByArtist } = searchSlice.actions;
export const selectSearchSuggestions = (state) => state.search.suggestions;
export const selectSearchTerm = (state) => state.search.term;
export const selectAlbum = (state) => state.search.album;

export default searchSlice.reducer;
