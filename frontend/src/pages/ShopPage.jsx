import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ✅ Sample product data
const mockProducts = [
  {
    id: 1,
    name: 'Modern Chair',
    price: 1200,
    image: 'https://via.placeholder.com/150',
    bgcolor: '#FDE68A',
    panelcolor: '#1E293B',
    textcolor: '#FFFFFF',
    isAvailable: true,
    hasDiscount: false,
    dateAdded: '2024-06-01',
  },
  {
    id: 2,
    name: 'Wooden Table',
    price: 2200,
    image: 'https://via.placeholder.com/150',
    bgcolor: '#E0F2FE',
    panelcolor: '#334155',
    textcolor: '#FFFFFF',
    isAvailable: false,
    hasDiscount: true,
    dateAdded: '2024-06-12',
  },
  {
    id: 3,
    name: 'Desk Lamp',
    price: 500,
    image: 'https://via.placeholder.com/150',
    bgcolor: '#FEE2E2',
    panelcolor: '#1F2937',
    textcolor: '#FFFFFF',
    isAvailable: true,
    hasDiscount: true,
    dateAdded: '2024-05-22',
  },
  {
    id: 4,
    name: 'Office Sofa',
    price: 4800,
    image: 'https://www.pexels.com/photo/photo-of-white-couch-on-wooden-floor-3757055/',
    bgcolor: '#E0F7FA',
    panelcolor: '#263238',
    textcolor: '#FFFFFF',
    isAvailable: true,
    hasDiscount: false,
    dateAdded: '2024-04-10',
  },
  {
    id: 5,
    name: 'Minimal Shelf',
    price: 1400,
    image: 'https://via.placeholder.com/150',
    bgcolor: '#FFF3E0',
    panelcolor: '#3E2723',
    textcolor: '#FFFFFF',
    isAvailable: false,
    hasDiscount: false,
    dateAdded: '2024-06-10',
  },
  {
    id: 6,
    name: 'Bean Bag',
    price: 900,
    image: 'https://via.placeholder.com/150',
    bgcolor: '#E8F5E9',
    panelcolor: '#1B5E20',
    textcolor: '#FFFFFF',
    isAvailable: true,
    hasDiscount: true,
    dateAdded: '2024-06-13',
  },
];

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [filterAvailability, setFilterAvailability] = useState(false);
  const [filterDiscount, setFilterDiscount] = useState(false);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const getFilteredSortedProducts = () => {
    let filtered = [...products];

    if (filterAvailability) {
      filtered = filtered.filter((p) => p.isAvailable);
    }

    if (filterDiscount) {
      filtered = filtered.filter((p) => p.hasDiscount);
    }

    switch (sortBy) {
      case 'newest':
        return filtered.sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );
      case 'low-to-high':
        return filtered.sort((a, b) => a.price - b.price);
      case 'high-to-low':
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered; // popular (default order)
    }
  };

  return (
    <>
      <Header />

      <div className="w-full min-h-screen flex px-20 py-20 gap-10">
        {/* Sidebar */}
        <div className="w-[25%] flex flex-col">
          {/* Sort */}
          <div className="flex items-center gap-2 mb-6">
            <h3 className="font-semibold">Sort by</h3>
            <select
              className="border px-2 py-1 rounded"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-2 text-gray-700">
            <a href="#" className="hover:underline">New Collection</a>
            <a href="#" className="hover:underline">All Products</a>
            <a href="#" className="hover:underline">Discounted Products</a>
          </div>

          {/* Filters */}
          <div className="mt-10 space-y-2 text-gray-700">
            <h4 className="font-semibold">Filter by:</h4>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filterAvailability}
                onChange={() => setFilterAvailability(!filterAvailability)}
              />
              Availability
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filterDiscount}
                onChange={() => setFilterDiscount(!filterDiscount)}
              />
              Discount
            </label>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-[75%] grid grid-cols-3 gap-6">
          {getFilteredSortedProducts().map((product) => (
            <div key={product.id} className="w-full">
              <div
                className="w-full h-52 flex items-center justify-center rounded-md"
                style={{ backgroundColor: product.bgcolor }}
              >
                <img
                  className="h-40 object-contain"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div
                className="flex justify-between items-center px-4 py-4 rounded-b-md"
                style={{
                  backgroundColor: product.panelcolor,
                  color: product.textcolor,
                }}
              >
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <h4>₹ {product.price}</h4>
                </div>
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-black">
                  <i className="ri-add-line"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ShopPage;
