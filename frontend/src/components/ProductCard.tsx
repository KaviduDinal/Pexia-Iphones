import React from 'react';
import { Star, MapPin, ShoppingCart, Eye } from 'lucide-react';
import { iPhone } from '../types';
import { useApp } from '../contexts/AppContext';

interface ProductCardProps {
  iphone: iPhone;
  onView?: (iphone: iPhone) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ iphone, onView }) => {
  const { addToCart } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(iphone);
  };

  const handleView = () => {
    onView?.(iphone);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-square">
        <img
          src={iphone.images[0]}
          alt={`${iphone.model} ${iphone.color}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            iphone.condition === 'New' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {iphone.condition}
          </span>
        </div>

        {/* Discount Badge */}
        {iphone.originalPrice && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
              Save ₹{iphone.originalPrice - iphone.price}
            </span>
          </div>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <button
            onClick={handleView}
            className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors duration-200 transform hover:scale-110"
          >
            <Eye className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200 transform hover:scale-110"
          >
            <ShoppingCart className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Model & Storage */}
        <div>
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {iphone.model}
          </h3>
          <p className="text-sm text-gray-600">
            {iphone.storage} • {iphone.color}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">
            ₹{iphone.price.toLocaleString()}
          </span>
          {iphone.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              ₹{iphone.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Shop Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{iphone.shopLocation}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-gray-600">4.8</span>
          </div>
        </div>

        {/* Shop Name */}
        <div className="text-sm">
          <span className="text-gray-500">Sold by </span>
          <span className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
            {iphone.shopName}
          </span>
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${
            iphone.availability > 5 ? 'text-green-600' : 
            iphone.availability > 0 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {iphone.availability > 0 ? `${iphone.availability} in stock` : 'Out of stock'}
          </span>
          
          {iphone.availability > 0 && (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;