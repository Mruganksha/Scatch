import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [filterAvailability, setFilterAvailability] = useState(false);
  const [filterDiscount, setFilterDiscount] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/products');
        const formatted = res.data.map((p) => ({
          id: p._id,
          name: p.name,
          price: p.price,
          image: p.image,
          bgcolor: '#FDE68A',
          panelcolor: '#1E293B',
          textcolor: '#FFFFFF',
          isAvailable: true, // You can update this based on real data
          hasDiscount: false, // You can update this too
          dateAdded: p.createdAt || '2024-06-01',
        }));
        setProducts(formatted);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchProducts();
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
        return filtered;
    }
  };

  return (
    <>
      <Header />

      <div className="w-full min-h-screen flex flex-col lg:flex-row px-6 md:px-10 lg:px-20 py-10 gap-10">
        {/* Sidebar */}
        <div className="w-full lg:w-[25%] flex flex-col">
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
        <div className="w-full lg:w-[75%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredSortedProducts().map((product) => (
            <div key={product.id} className="w-full">
              <Link to={`/product/${product.id}`} className="w-full block">
                <div>
                  <div
                    className="w-full h-52 flex overflow-hidden rounded-md"
                    style={{ backgroundColor: product.bgcolor }}
                  >
                    <img
                      className="w-full h-full object-cover"
                       src={
    product.image
      ? `data:image/jpeg;base64,${product.image}`
      : "https://via.placeholder.com/150"
  }
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
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ShopPage;
