import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import useLazyLoad from '../../hooks/useLazyLoad';

// PUBLIC_INTERFACE
/**
 * ProductCard component for displaying product information in a card format
 * @param product - The product to display
 * @param onClick - Optional click handler for the card
 * @param layout - Layout style: 'grid' or 'list'
 */
interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  layout?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onClick,
  layout = 'grid'
}) => {
  const { 
    id, 
    name, 
    price, 
    discountedPrice, 
    thumbnail, 
    rating, 
    reviewCount, 
    brand,
    inStock 
  } = product;

  // Handle click on the card
  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-${i}`} className="text-yellow-400">★</span>
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <span key="half-star" className="text-yellow-400">★</span>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      );
    }
    
    return stars;
  };

  // Calculate discount percentage if applicable
  const discountPercentage = discountedPrice 
    ? Math.round(((price - discountedPrice) / price) * 100) 
    : 0;

  // Grid layout
  if (layout === 'grid') {
    return (
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        onClick={handleClick}
      >
        {/* Product image with lazy loading */}
        <div className="relative h-48 overflow-hidden">
          <Link to={`/product/${id}`}>
            {(() => {
              const imgRef = useRef<HTMLImageElement>(null);
              const { currentSrc, isLoaded } = useLazyLoad(imgRef, thumbnail);
              return (
                <img 
                  ref={imgRef}
                  src={currentSrc}
                  alt={name} 
                  className={`w-full h-full object-cover transition-transform hover:scale-105 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transition: 'opacity 0.3s ease-in-out' }}
                  onLoad={() => imgRef.current?.classList.add('opacity-100')}
                />
              );
            })()}
          </Link>
          
          {/* Discount badge */}
          {discountedPrice && (
            <div className="absolute top-2 right-2 bg-error text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}
          
          {/* Out of stock overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        {/* Product details */}
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{brand}</div>
          <Link to={`/product/${id}`} className="hover:text-primary">
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 h-12">{name}</h3>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center mt-1">
            <div className="flex">{renderStars()}</div>
            <span className="text-gray-600 text-xs ml-1">({reviewCount})</span>
          </div>
          
          {/* Price */}
          <div className="mt-2 flex items-center">
            {discountedPrice ? (
              <>
                <span className="font-semibold text-gray-900">${discountedPrice.toFixed(2)}</span>
                <span className="text-gray-500 text-sm line-through ml-2">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-semibold text-gray-900">${price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Add to cart button */}
          <button 
            className={`mt-3 w-full py-1.5 px-4 rounded text-sm font-medium transition-colors ${
              inStock 
                ? 'bg-primary text-white hover:bg-primary-dark' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!inStock}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    );
  }
  
  // List layout
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex"
      onClick={handleClick}
    >
      {/* Product image with lazy loading */}
      <div className="relative w-32 sm:w-48 flex-shrink-0">
        <Link to={`/product/${id}`}>
          {(() => {
            const imgRef = useRef<HTMLImageElement>(null);
            const { currentSrc, isLoaded } = useLazyLoad(imgRef, thumbnail);
            return (
              <img 
                ref={imgRef}
                src={currentSrc}
                alt={name} 
                className={`w-full h-full object-cover ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ height: '100%', transition: 'opacity 0.3s ease-in-out' }}
                onLoad={() => imgRef.current?.classList.add('opacity-100')}
              />
            );
          })()}
        </Link>
        
        {/* Discount badge */}
        {discountedPrice && (
          <div className="absolute top-2 right-2 bg-error text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </div>
        )}
        
        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      {/* Product details */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="text-xs text-gray-500 mb-1">{brand}</div>
          <Link to={`/product/${id}`} className="hover:text-primary">
            <h3 className="font-medium text-gray-900 mb-2">{name}</h3>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex">{renderStars()}</div>
            <span className="text-gray-600 text-xs ml-1">({reviewCount})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center">
            {discountedPrice ? (
              <>
                <span className="font-semibold text-gray-900">${discountedPrice.toFixed(2)}</span>
                <span className="text-gray-500 text-sm line-through ml-2">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-semibold text-gray-900">${price.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        {/* Add to cart button */}
        <div className="mt-3 flex justify-end">
          <button 
            className={`py-1.5 px-4 rounded text-sm font-medium transition-colors ${
              inStock 
                ? 'bg-primary text-white hover:bg-primary-dark' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!inStock}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
