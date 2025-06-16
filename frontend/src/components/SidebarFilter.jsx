import React from "react";

function SidebarFilter({ onClose }) {
  return (
    <div className="w-full md:w-64 bg-white p-6 rounded-xl shadow-md h-fit">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 text-sm"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
            <option>All</option>
            <option>Clothing</option>
            <option>Electronics</option>
            <option>Books</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <input type="range" min="0" max="10000" className="w-full mt-1" />
        </div>

        {/* Sort By Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sort By</label>
          <select className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SidebarFilter;
