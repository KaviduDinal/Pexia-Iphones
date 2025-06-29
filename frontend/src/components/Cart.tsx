import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Cart: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, setCurrentPage } = useApp();

  const totalAmount = cart.reduce((sum, item) => sum + (item.iphone.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Discover amazing iPhones and add them to your cart</p>
            <button
              onClick={() => setCurrentPage('products')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('products')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600">{totalItems} items in your cart</p>
            </div>
          </div>
          
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.iphone.images[0]}
                      alt={item.iphone.model}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-gray-900">
                      {item.iphone.model}
                    </h3>
                    <p className="text-gray-600">
                      {item.iphone.storage} • {item.iphone.color}
                    </p>
                    <p className="text-sm text-gray-500">
                      Sold by {item.iphone.shopName}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      ₹{item.iphone.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    
                    <span className="text-lg font-semibold min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">₹{Math.round(totalAmount * 0.18).toLocaleString()}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{Math.round(totalAmount * 1.18).toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 mb-4">
                Proceed to Checkout
              </button>

              <button
                onClick={() => setCurrentPage('products')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;