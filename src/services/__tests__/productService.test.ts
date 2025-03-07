import productService from '../productService';
import api from '../api';
import { Product, ProductResponse } from '../../types/product';

// Mock the api module
jest.mock('../api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('Product Service', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test description',
    price: 99.99,
    images: ['image1.jpg', 'image2.jpg'],
    thumbnail: 'thumbnail.jpg',
    category: 'Test Category',
    brand: 'Test Brand',
    rating: 4.5,
    reviewCount: 10,
    inStock: true,
    attributes: { color: 'red', size: 'M' },
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  };

  const mockProducts: Product[] = [
    mockProduct,
    {
      ...mockProduct,
      id: '2',
      name: 'Test Product 2',
      price: 149.99
    }
  ];

  const mockProductResponse: ProductResponse = {
    products: mockProducts,
    pagination: {
      currentPage: 1,
      totalPages: 3,
      totalItems: 30,
      itemsPerPage: 10
    }
  };

  describe('getProducts', () => {
    test('should fetch products with query parameters', async () => {
      // Setup mock response
      mockedApi.get.mockResolvedValueOnce({ data: mockProductResponse });

      // Define query parameters
      const params = {
        page: 1,
        limit: 10,
        search: 'test',
        category: 'electronics'
      };

      // Call the service method
      const result = await productService.getProducts(params);

      // Assertions
      expect(mockedApi.get).toHaveBeenCalledWith('/products', { params });
      expect(result).toEqual(mockProductResponse);
      expect(result.products).toHaveLength(2);
      expect(result.pagination.currentPage).toBe(1);
    });

    test('should handle API errors', async () => {
      // Setup mock error response
      const errorMessage = 'Network Error';
      mockedApi.get.mockRejectedValueOnce(new Error(errorMessage));

      // Call the service method and expect it to throw
      await expect(productService.getProducts({})).rejects.toThrow(errorMessage);
      expect(mockedApi.get).toHaveBeenCalledWith('/products', { params: {} });
    });
  });

  describe('getProductById', () => {
    test('should fetch a product by ID', async () => {
      // Setup mock response
      mockedApi.get.mockResolvedValueOnce({ data: mockProduct });

      // Call the service method
      const result = await productService.getProductById('1');

      // Assertions
      expect(mockedApi.get).toHaveBeenCalledWith('/products/1');
      expect(result).toEqual(mockProduct);
      expect(result.id).toBe('1');
    });

    test('should handle API errors', async () => {
      // Setup mock error response
      const errorMessage = 'Product not found';
      mockedApi.get.mockRejectedValueOnce(new Error(errorMessage));

      // Call the service method and expect it to throw
      await expect(productService.getProductById('999')).rejects.toThrow(errorMessage);
      expect(mockedApi.get).toHaveBeenCalledWith('/products/999');
    });
  });

  describe('getRelatedProducts', () => {
    test('should fetch related products for a product ID', async () => {
      // Setup mock response
      mockedApi.get.mockResolvedValueOnce({ data: mockProducts });

      // Call the service method
      const result = await productService.getRelatedProducts('1');

      // Assertions
      expect(mockedApi.get).toHaveBeenCalledWith('/products/1/related');
      expect(result).toEqual(mockProducts);
      expect(result).toHaveLength(2);
    });
  });

  describe('getCategories', () => {
    test('should fetch all categories', async () => {
      // Setup mock response
      const mockCategories = ['Electronics', 'Clothing', 'Home & Garden'];
      mockedApi.get.mockResolvedValueOnce({ data: mockCategories });

      // Call the service method
      const result = await productService.getCategories();

      // Assertions
      expect(mockedApi.get).toHaveBeenCalledWith('/categories');
      expect(result).toEqual(mockCategories);
      expect(result).toHaveLength(3);
    });
  });

  describe('getBrands', () => {
    test('should fetch all brands', async () => {
      // Setup mock response
      const mockBrands = ['Apple', 'Samsung', 'Sony'];
      mockedApi.get.mockResolvedValueOnce({ data: mockBrands });

      // Call the service method
      const result = await productService.getBrands();

      // Assertions
      expect(mockedApi.get).toHaveBeenCalledWith('/brands');
      expect(result).toEqual(mockBrands);
      expect(result).toHaveLength(3);
    });
  });
});