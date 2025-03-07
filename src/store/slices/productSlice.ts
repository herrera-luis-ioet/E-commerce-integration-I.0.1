import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 12,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setPagination: (state, action: PayloadAction<Partial<ProductState['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
});

export const { setLoading, setError, setProducts, setSelectedProduct, setPagination } = productSlice.actions;

export default productSlice.reducer;