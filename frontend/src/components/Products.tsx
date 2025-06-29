import React, { useState } from 'react';
import { Filter, Grid3X3, List, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import ProductCard from './ProductCard';

const Products: React.FC = () => {
  const { iphones } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [sortBy, setSortBy] = useState('price-low');

  const models = [...new Set(iphones.map(phone => phone.model))];
  const conditions = [...new Set(iphones.map(phone => phone.condition))];

  const filteredAndSortedPhones = iphones
    .filter(phone => {
      const matchesSearch = phone.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          phone.color.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesModel = !selectedModel || phone.model === selectedModel;
      const matchesCondition = !selectedCondition || phone.condition === selectedCondition;
      
      return matchesSearch && matchesModel && matchesCondition;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.model.localeCompare(b.model);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse iPhones
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect iPhone from our extensive collection
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search iPhones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Model Filter */}
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Models</option>
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>

            {/* Condition Filter */}
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Conditions</option>
              {conditions.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>

            {/* View Mode */}
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 p-2 flex items-center justify-center ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                } transition-colors duration-200`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 p-2 flex items-center justify-center ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                } transition-colors duration-200`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredAndSortedPhones.length} of {iphones.length} iPhones
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredAndSortedPhones.map((iphone) => (
            <ProductCard
              key={iphone.id}
              iphone={iphone}
              onView={(phone) => console.log('View', phone)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedPhones.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Filter className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No iPhones found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;