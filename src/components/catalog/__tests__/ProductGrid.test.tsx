import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductGrid from '../ProductGrid';
import { Product } from '../../../types/product';

// Mock the child components
jest.mock('../ProductCard', () => ({ 
  __esModule: true, 
  default: ({ product, onClick }: { product: Product, onClick?: (product: Product) => void }) => (
    <div 
      data-testid={`product-card-${product.id}`}
      onClick={() => onClick && onClick(product)}
    >
      {product.name}
    </div>
  )
}));

jest.mock('../../common/Loading', () => ({ 
  __esModule: true, 
  default: ({ text }: { text: string, size?: string }) => <div data-testid="loading">{text}</div>
}));

jest.mock('../../common/Error', () => ({ 
  __esModule: true, 
  default: ({ message, retryAction }: { message: string, retryAction?: () => void, retryText?: string }) => (
    <div data-testid="error">
      {message}
      {retryAction && <button onClick={retryAction} data-testid="retry-button">Retry</button>}
    </div>
  )
}));

jest.mock('../../common/Pagination', () => ({ 
  __esModule: true, 
  default: ({ currentPage, totalPages, onPageChange }: { 
    currentPage: number, 
    totalPages: number, 
    onPageChange: (page: number) => void 
  }) => (
    <div data-testid="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
      <span data-testid="current-page">{currentPage}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
    </div>
  )
}));

jest.mock('../../../hooks/useInfiniteScroll', () => ({
  __esModule: true,
  default: (loadMore: () => Promise<void>) => ({
    sentinelRef: { current: document.createElement('div') },
    loading: false
  })
}));

describe('ProductGrid Component', () => {
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

  const mockPagination = {
    currentPage: 1,
    totalPages: 3,
    totalItems: 30,
    itemsPerPage: 10
  };

  test('renders loading state correctly', () => {
    render(<ProductGrid products={[]} loading={true} error={null} />);
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  test('renders error state correctly', () => {
    const mockError = 'Failed to load products';
    const mockRetry = jest.fn();
    
    render(
      <ProductGrid 
        products={[]} 
        loading={false} 
        error={mockError} 
        onRetry={mockRetry} 
      />
    );
    
    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByText(mockError)).toBeInTheDocument();
    
    // Test retry button
    const retryButton = screen.getByTestId('retry-button');
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  test('renders empty state correctly', () => {
    render(<ProductGrid products={[]} loading={false} error={null} />);
    
    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting your search or filter criteria/)).toBeInTheDocument();
  });

  test('renders products correctly', () => {
    render(<ProductGrid products={mockProducts} loading={false} error={null} />);
    
    expect(screen.getByTestId(`product-card-${mockProducts[0].id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`product-card-${mockProducts[1].id}`)).toBeInTheDocument();
    expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockProducts[1].name)).toBeInTheDocument();
  });

  test('handles product click correctly', () => {
    const mockProductClick = jest.fn();
    
    render(
      <ProductGrid 
        products={mockProducts} 
        loading={false} 
        error={null} 
        onProductClick={mockProductClick} 
      />
    );
    
    const productCard = screen.getByTestId(`product-card-${mockProducts[0].id}`);
    fireEvent.click(productCard);
    
    expect(mockProductClick).toHaveBeenCalledTimes(1);
    expect(mockProductClick).toHaveBeenCalledWith(mockProducts[0]);
  });

  test('renders pagination correctly', () => {
    const mockPageChange = jest.fn();
    
    render(
      <ProductGrid 
        products={mockProducts} 
        loading={false} 
        error={null} 
        pagination={mockPagination}
        onPageChange={mockPageChange}
      />
    );
    
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('current-page')).toHaveTextContent('1');
    
    // Test page change
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(mockPageChange).toHaveBeenCalledTimes(1);
    expect(mockPageChange).toHaveBeenCalledWith(2);
  });

  test('renders infinite scroll correctly', () => {
    const mockLoadMore = jest.fn().mockResolvedValue(undefined);
    
    render(
      <ProductGrid 
        products={mockProducts} 
        loading={false} 
        error={null} 
        infiniteScroll={true}
        loadMore={mockLoadMore}
        hasMore={true}
      />
    );
    
    // Pagination should not be rendered when infinite scroll is enabled
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });
});