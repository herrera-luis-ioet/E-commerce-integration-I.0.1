import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchQuery: string;
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  appliedFilters: {
    [key: string]: any;
  };
}

const initialState: FilterState = {
  searchQuery: '',
  categories: [],
  priceRange: {
    min: 0,
    max: 1000,
  },
  sortBy: 'price',
  sortOrder: 'asc',
  appliedFilters: {},
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setAppliedFilters: (state, action: PayloadAction<{ [key: string]: any }>) => {
      state.appliedFilters = action.payload;
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const {
  setSearchQuery,
  setCategories,
  setPriceRange,
  setSortBy,
  setSortOrder,
  setAppliedFilters,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;