import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useProductDetail from '../../hooks/useProductDetail';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';
import Loading from '../common/Loading';
import Error from '../common/Error';
import { Product } from '../../types/product';

// PUBLIC_INTERFACE
/**
 * ProductDetail component that combines ProductGallery, ProductInfo, and RelatedProducts
 * Serves as the container component for the product detail page
 */
const ProductDetail: React.FC = () => {
  const { product, relatedProducts, loading, error, fetchProduct } = useProductDetail();
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');
  
  // Handle add to cart functionality
  const handleAddToCart = (product: Product, quantity: number) => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // Here you would typically dispatch an action to add the product to the cart
  };
  
  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="py-12">
        <Loading text="Loading product details..." />
      </div>
    );
  }
  
  // If error, show error message with retry button
  if (error) {
    return (
      <div className="py-12">
        <Error 
          message={error} 
          retryAction={() => product?.id && fetchProduct(product.id)}
          retryText="Retry Loading Product"
        />
      </div>
    );
  }
  
  // If no product, show message
  if (!product) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/products" 
          className="inline-block bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="pb-12">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6">
        <ol className="flex text-gray-600 text-sm">
          <li className="hover:text-primary">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-2">/</li>
          <li className="hover:text-primary">
            <Link to="/products">Products</Link>
          </li>
          <li className="mx-2">/</li>
          <li className="hover:text-primary">
            <Link to={`/products?category=${product.category}`}>{product.category}</Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-primary">{product.name}</li>
        </ol>
      </nav>

      {/* Product Detail Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <ProductGallery images={product.images} alt={product.name} />

          {/* Product Information */}
          <ProductInfo product={product} onAddToCart={handleAddToCart} />
        </div>
      </div>

      {/* Product Tabs */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="border-b mb-6">
          <nav className="flex space-x-8">
            <button 
              className={`py-2 font-medium ${
                activeTab === 'description' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`py-2 font-medium ${
                activeTab === 'reviews' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button 
              className={`py-2 font-medium ${
                activeTab === 'shipping' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping
            </button>
          </nav>
        </div>
        
        <div>
          {activeTab === 'description' && (
            <div>
              <p className="mb-4">{product.description}</p>
              {/* Additional description content would go here */}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center mb-4">
                <div className="text-3xl font-bold mr-2">{product.rating.toFixed(1)}</div>
                <div>
                  <div className="text-yellow-400 text-lg">{'★'.repeat(Math.round(product.rating))}{
                    '☆'.repeat(5 - Math.round(product.rating))}</div>
                  <div className="text-gray-500">{product.reviewCount} reviews</div>
                </div>
              </div>
              
              {/* Placeholder for reviews - would be replaced with actual reviews */}
              <p className="text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
          
          {activeTab === 'shipping' && (
            <div>
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              <p className="mb-4">
                We offer free standard shipping on all orders over $50. Orders typically ship within 
                1-2 business days and arrive within 3-5 business days.
              </p>
              <h3 className="font-semibold mb-2">Return Policy</h3>
              <p>
                If you're not completely satisfied with your purchase, you can return it within 
                30 days for a full refund. Items must be in original condition with tags attached.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetail;