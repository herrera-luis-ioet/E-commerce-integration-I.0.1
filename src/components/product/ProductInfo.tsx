import React, { useState } from 'react';
import { Product } from '../../types/product';

interface ProductInfoProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
}

// PUBLIC_INTERFACE
/**
 * ProductInfo component for displaying detailed product information
 * Shows name, price, description, specifications, variants, and add to cart functionality
 * @param product - The product to display information for
 * @param onAddToCart - Optional callback function when adding product to cart
 */
const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  
  // Get available variants from product attributes
  const getVariants = () => {
    const variants: string[] = [];
    
    // Check if product has color or size attributes
    if (product.attributes) {
      if (product.attributes.color) {
        variants.push(...(Array.isArray(product.attributes.color) 
          ? product.attributes.color 
          : [product.attributes.color as string]));
      }
      
      if (product.attributes.size) {
        variants.push(...(Array.isArray(product.attributes.size) 
          ? product.attributes.size 
          : [product.attributes.size as string]));
      }
    }
    
    return variants;
  };
  
  const variants = getVariants();
  
  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };
  
  // Handle variant selection
  const handleVariantChange = (variant: string) => {
    setSelectedVariant(variant);
  };
  
  // Handle add to cart button click
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
  };
  
  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    
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
  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
    : 0;
  
  return (
    <div className="product-info">
      {/* Product Title and Brand */}
      <div className="mb-2">
        <span className="text-sm text-gray-500">{product.brand}</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      
      {/* Rating */}
      <div className="flex items-center mb-4">
        <div className="flex">{renderStars()}</div>
        <span className="text-gray-600 text-sm ml-1">({product.reviewCount} reviews)</span>
      </div>
      
      {/* Price */}
      <div className="mb-6">
        {product.discountedPrice ? (
          <div className="flex items-center">
            <span className="text-2xl font-semibold">${product.discountedPrice.toFixed(2)}</span>
            <span className="text-gray-500 text-lg line-through ml-2">${product.price.toFixed(2)}</span>
            <span className="ml-2 bg-error text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          </div>
        ) : (
          <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
        )}
        
        {/* Stock Status */}
        <div className="mt-2">
          {product.inStock ? (
            <span className="text-green-600 text-sm font-medium">In Stock</span>
          ) : (
            <span className="text-red-600 text-sm font-medium">Out of Stock</span>
          )}
        </div>
      </div>
      
      {/* Description */}
      <div className="mb-6">
        <p className="text-gray-700">{product.description}</p>
      </div>
      
      {/* Variants */}
      {variants.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Variants:</h3>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant}
                className={`px-3 py-1 border rounded-md ${
                  selectedVariant === variant
                    ? 'border-primary bg-primary bg-opacity-10'
                    : 'border-gray-300 hover:border-primary'
                }`}
                onClick={() => handleVariantChange(variant)}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Quantity and Add to Cart */}
      <div className="flex items-center space-x-4 mb-6">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <select 
            id="quantity" 
            value={quantity} 
            onChange={handleQuantityChange}
            className="border rounded-md py-1.5 px-3"
            disabled={!product.inStock}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
        </div>
        
        <button 
          className={`flex-grow py-2 px-6 rounded-md transition-colors ${
            product.inStock
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
      
      {/* Product Attributes/Specifications */}
      {product.attributes && Object.keys(product.attributes).length > 0 && (
        <div className="border-t pt-6">
          <h3 className="font-semibold mb-2">Specifications:</h3>
          <div className="grid grid-cols-2 gap-y-2">
            {Object.entries(product.attributes).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="font-medium mr-2 capitalize">{key}:</span>
                <span className="text-gray-600">{value.toString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;