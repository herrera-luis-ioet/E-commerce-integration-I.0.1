import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterPanel from '../FilterPanel';

// Mock the child components
jest.mock('../SearchBar', () => ({ 
  __esModule: true, 
  default: () => <div data-testid="search-bar">Search Bar</div>
}));

jest.mock('../CategoryFilter', () => ({ 
  __esModule: true, 
  default: ({ categories }: { categories: string[] }) => (
    <div data-testid="category-filter">
      {categories.map(category => (
        <div key={category} data-testid={`category-${category}`}>{category}</div>
      ))}
    </div>
  )
}));

jest.mock('../PriceRangeFilter', () => ({ 
  __esModule: true, 
  default: ({ minPrice, maxPrice }: { minPrice: number, maxPrice: number }) => (
    <div data-testid="price-range-filter">
      Price Range: {minPrice} - {maxPrice}
    </div>
  )
}));

jest.mock('../../common/Loading', () => ({ 
  __esModule: true, 
  default: ({ text }: { text: string }) => <div data-testid="loading">{text}</div>
}));

jest.mock('../../common/Error', () => ({ 
  __esModule: true, 
  default: ({ message }: { message: string }) => <div data-testid="error">{message}</div>
}));

// Mock the useFilters hook
jest.mock('../../../hooks/useFilters', () => ({
  __esModule: true,
  default: () => ({
    clearAllFilters: jest.fn(),
    applyFilters: jest.fn()
  })
}));

// Mock window.innerWidth for testing mobile view
const originalInnerWidth = window.innerWidth;
const setWindowInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width
  });
};

describe('FilterPanel Component', () => {
  const mockCategories = ['Electronics', 'Clothing', 'Home & Garden'];
  
  // Reset window.innerWidth after each test
  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth
    });
  });

  test('renders loading state correctly', () => {
    render(<FilterPanel categories={[]} loading={true} />);
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading filters...')).toBeInTheDocument();
  });

  test('renders error state correctly', () => {
    const mockError = 'Failed to load filters';
    
    render(<FilterPanel categories={[]} error={mockError} />);
    
    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByText(mockError)).toBeInTheDocument();
  });

  test('renders filter components correctly', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        minPrice={10} 
        maxPrice={1000} 
      />
    );
    
    // Check if all filter components are rendered
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('price-range-filter')).toBeInTheDocument();
    
    // Check if categories are passed correctly
    mockCategories.forEach(category => {
      expect(screen.getByTestId(`category-${category}`)).toBeInTheDocument();
    });
    
    // Check if price range is passed correctly
    expect(screen.getByText('Price Range: 10 - 1000')).toBeInTheDocument();
  });

  test('renders filter action buttons correctly', () => {
    render(<FilterPanel categories={mockCategories} />);
    
    expect(screen.getByText('Apply Filters')).toBeInTheDocument();
    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });

  test('calls onApplyFilters when Apply Filters button is clicked', () => {
    const mockApplyFilters = jest.fn();
    
    render(
      <FilterPanel 
        categories={mockCategories} 
        onApplyFilters={mockApplyFilters} 
      />
    );
    
    const applyButton = screen.getByText('Apply Filters');
    fireEvent.click(applyButton);
    
    expect(mockApplyFilters).toHaveBeenCalledTimes(1);
  });

  test('toggles filter panel on mobile view', () => {
    // Set window.innerWidth to simulate mobile view
    setWindowInnerWidth(500);
    
    render(<FilterPanel categories={mockCategories} />);
    
    // Filter panel should be hidden initially on mobile
    const filterToggleButton = screen.getByText('Filters');
    expect(filterToggleButton).toBeInTheDocument();
    
    // Filter panel content should be hidden initially
    const filterPanelContent = screen.getByTestId('filter-panel');
    expect(filterPanelContent).toHaveClass('hidden');
    
    // Click the toggle button to show the filter panel
    fireEvent.click(filterToggleButton);
    
    // Filter panel content should be visible now
    expect(filterPanelContent).not.toHaveClass('hidden');
    
    // Click the toggle button again to hide the filter panel
    fireEvent.click(filterToggleButton);
    
    // Filter panel content should be hidden again
    expect(filterPanelContent).toHaveClass('hidden');
  });

  test('collapses filter panel on mobile after applying filters', () => {
    // Set window.innerWidth to simulate mobile view
    setWindowInnerWidth(500);
    
    render(<FilterPanel categories={mockCategories} />);
    
    // Show the filter panel
    const filterToggleButton = screen.getByText('Filters');
    fireEvent.click(filterToggleButton);
    
    // Filter panel content should be visible
    const filterPanelContent = screen.getByTestId('filter-panel');
    expect(filterPanelContent).not.toHaveClass('hidden');
    
    // Click the Apply Filters button
    const applyButton = screen.getByText('Apply Filters');
    fireEvent.click(applyButton);
    
    // Filter panel content should be hidden after applying filters on mobile
    expect(filterPanelContent).toHaveClass('hidden');
  });
});