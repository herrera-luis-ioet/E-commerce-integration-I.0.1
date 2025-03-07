import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Product Detail page component
 * Displays detailed information about a specific product
 */
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Placeholder product data
  const product = {
    id,
    name: `Product ${id}`,
    price: 99.99,
    rating: 4.5,
    reviewCount: 42,
    description: 'This is a detailed description of the product. It includes information about the product features, materials, and usage instructions.',
    features: [
      'High-quality materials',
      'Durable construction',
      'Easy to use',
      'Versatile application'
    ],
    specifications: {
      'Dimensions': '10 x 8 x 2 inches',
      'Weight': '1.5 pounds',
      'Material': 'Premium grade',
      'Warranty': '1 year limited'
    },
    images: Array.from({ length: 4 }, (_, i) => ({ 
      id: i, 
      src: `https://via.placeholder.com/600x400?text=Product+Image+${i+1}`,
      alt: `Product ${id} - Image ${i+1}`
    }))
  };

  // Placeholder for quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

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
            <Link to="/category/all">All Products</Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-primary">{product.name}</li>
        </ol>
      </nav>

      {/* Product Detail Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <div>
            <div className="mb-4 aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={product.images[activeImage].src} 
                alt={product.images[activeImage].alt} 
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button 
                  key={image.id} 
                  className={`border-2 rounded-md overflow-hidden ${activeImage === index ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-center object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="text-yellow-400">★★★★☆</div>
              <span className="text-gray-600 text-sm ml-1">({product.reviewCount} reviews)</span>
            </div>
            
            <div className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
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
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                  ))}
                </select>
              </div>
              
              <button className="flex-grow bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors">
                Add to Cart
              </button>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-2">Specifications:</h3>
              <div className="grid grid-cols-2 gap-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="font-medium mr-2">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="border-b mb-6">
          <nav className="flex space-x-8">
            <button className="border-b-2 border-primary text-primary font-medium py-2">Description</button>
            <button className="text-gray-500 hover:text-gray-700 py-2">Reviews</button>
            <button className="text-gray-500 hover:text-gray-700 py-2">Shipping</button>
          </nav>
        </div>
        
        <div>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
          </p>
          <p>
            Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-medium">Related Product {index + 1}</h3>
                <div className="flex items-center mt-1">
                  <div className="text-yellow-400">★★★★☆</div>
                  <span className="text-gray-600 text-sm ml-1">(24)</span>
                </div>
                <div className="mt-2 font-semibold">${(29.99 + index * 10).toFixed(2)}</div>
                <button className="mt-3 w-full bg-primary text-white py-1 rounded hover:bg-primary-dark transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;