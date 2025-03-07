import productReducer, {
  setLoading,
  setError,
  setProducts,
  setSelectedProduct,
  setPagination
} from '../productSlice';
import { Product } from '../../../types/product';

describe('Product Slice', () => {
  const initialState = {
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

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Test Product 1',
      description: 'Test description 1',
      price: 99.99,
      images: ['image1.jpg'],
      thumbnail: 'thumbnail1.jpg',
      category: 'Test Category',
      brand: 'Test Brand',
      rating: 4.5,
      reviewCount: 10,
      inStock: true,
      attributes: { color: 'red' },
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: '2',
      name: 'Test Product 2',
      description: 'Test description 2',
      price: 149.99,
      images: ['image2.jpg'],
      thumbnail: 'thumbnail2.jpg',
      category: 'Test Category',
      brand: 'Test Brand',
      rating: 4.0,
      reviewCount: 5,
      inStock: true,
      attributes: { color: 'blue' },
      createdAt: '2023-01-02',
      updatedAt: '2023-01-02'
    }
  ];

  test('should return the initial state', () => {
    expect(productReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('should handle setLoading', () => {
    const loadingState = productReducer(initialState, setLoading(true));
    expect(loadingState.loading).toBe(true);

    const notLoadingState = productReducer(loadingState, setLoading(false));
    expect(notLoadingState.loading).toBe(false);
  });

  test('should handle setError', () => {
    const errorState = productReducer(initialState, setError('An error occurred'));
    expect(errorState.error).toBe('An error occurred');

    const clearedErrorState = productReducer(errorState, setError(null));
    expect(clearedErrorState.error).toBe(null);
  });

  test('should handle setProducts', () => {
    const newState = productReducer(initialState, setProducts(mockProducts));
    expect(newState.items).toEqual(mockProducts);
    expect(newState.items).toHaveLength(2);
    expect(newState.items[0].id).toBe('1');
    expect(newState.items[1].id).toBe('2');
  });

  test('should handle setSelectedProduct', () => {
    const selectedProductState = productReducer(
      initialState, 
      setSelectedProduct(mockProducts[0])
    );
    expect(selectedProductState.selectedProduct).toEqual(mockProducts[0]);

    const clearedSelectedProductState = productReducer(
      selectedProductState, 
      setSelectedProduct(null)
    );
    expect(clearedSelectedProductState.selectedProduct).toBe(null);
  });

  test('should handle setPagination', () => {
    const newPagination = {
      currentPage: 2,
      totalPages: 5,
      totalItems: 50,
      itemsPerPage: 10
    };

    const newState = productReducer(initialState, setPagination(newPagination));
    expect(newState.pagination).toEqual(newPagination);

    // Test partial update
    const partialUpdate = {
      currentPage: 3,
      totalPages: 6
    };

    const updatedState = productReducer(newState, setPagination(partialUpdate));
    expect(updatedState.pagination).toEqual({
      ...newPagination,
      ...partialUpdate
    });
  });

  test('should not modify state for unknown action types', () => {
    const state = {
      ...initialState,
      items: mockProducts,
      loading: true
    };
    
    const newState = productReducer(state, { type: 'unknown' });
    expect(newState).toEqual(state);
  });
});