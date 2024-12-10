import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, Spin, message } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/reset.css';

const { Meta } = Card;
const { Option } = Select;

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const ProductList = () => {
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); // 

  // Load selected category from localStorage (if any)
  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      setCategory(savedCategory);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/auth/searchProducts`);

        if (!response.ok) {
          throw new Error('No products found');
        }

        const data = await response.json();
        setProducts(data.data || []); // Use the `data` property to set products
      } catch (err) {
        setError(err.message); // Set error message
        message.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle category change
  const handleCategoryChange = (value) => {
    setCategory(value);
    localStorage.setItem('selectedCategory', value); // Save selected category to localStorage
  };

  // Filter products based on category
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category ? product.categoryName === category : true;
    return matchesCategory;
  });

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        {/* Category Select */}
        <Col xs={24} sm={24} md={8} lg={6}>
          <Select
            placeholder="Select Category"
            style={{ width: '100%' }}
            onChange={handleCategoryChange}
            value={category} // Set the value of Select based on the state
          >
            <Option value="">All Categories</Option>
            <Option value="Shirts">Shirts</Option>
            <Option value="Running & Sports Shoes">Running & Sports Shoes</Option>
            <Option value="Jeans">Jeans</Option>
            <Option value="T-Shirts">T-Shirts</Option>
          </Select>
        </Col>
      </Row>

      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: '0 auto' }} />
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredProducts.map((product) => (
            <Col xs={12} sm={12} md={8} lg={6} key={product.productId}>
              <Link to={`/product/${product.productId}`}>
                <Card
                  hoverable
                  cover={<img alt={product.name} src={product.images} />}
                  style={{ textAlign: 'center' }}
                >
                  <Meta title={product.name} description={product.title} />
                  <p style={{ marginTop: '10px' }}><strong>₹{product.listedPrice || 299}</strong></p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductList;
