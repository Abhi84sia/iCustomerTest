import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Button,
  List,
  Spin,
  message,
} from "antd";

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${API_URL}/api/auth/searchProducts?productId=${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.json();
        setProduct(data.data[0]); // Assuming API returns an array with the product details
      } catch (err) {
        setError(err.message || "Something went wrong");
        message.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (loading) {
    return (
      <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
    );
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!product) {
    return (
      <p style={{ textAlign: "center", color: "gray" }}>Product not found</p>
    );
  }

  // Helper function to safely format the price
  const formatPrice = (price) => {
    return price && !isNaN(price) ? price.toLocaleString() : "N/A";
  };

  // Handle button click for Add to Cart and Buy Now
  const handleButtonClick = (action) => {
    if (action === "addToCart") {
      message.success("Product added to cart!");
    } else if (action === "buyNow") {
      message.success("Proceeding to checkout...");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Row gutter={[16, 16]}>
        {/* Left Column - Image and Gallery */}
        <Col xs={24} md={8}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxHeight: "400px",
              overflow: "hidden",
            }}
          >
            <img
              alt={product.title}
              src={
                Array.isArray(product.images)
                  ? product.images[0]
                  : product.images
              }
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "8px",
                border: "1px solid #ddd",
                transition: "transform 0.3s ease", // Smooth zoom transition
              }}
              className="zoomable-image" // Add a class for hover zoom effect
            />
          </div>
          {/* Thumbnails (if available) */}
        </Col>

        {/* Right Column - Details */}
        <Col xs={24} md={16}>
          <Card bordered={false} style={{ textAlign: "left" }}>
            <Title level={3}>{product.title}</Title>
            <Text type="secondary">{product.description}</Text>
            <Divider />
            <Title level={4} style={{ color: "#28a745" }}>
              ₹{formatPrice(product.listedPrice ?? 299)}{" "}
              {/* Set listedPrice to 299 if it's NA */}
            </Title>
            <Text delete style={{ marginRight: 10 }}>
              ₹{formatPrice((product.listedPrice ?? 299) + 98)}{" "}
              {/* Same for calculating price with 98 added */}
            </Text>
            {Math.round(
              (((product.listedPrice ?? 299) +
                98 -
                (product.listedPrice ?? 299)) /
                (product.listedPrice ?? 299)) *
                100
            )}
            % off
            <Divider />
            {/* Offers Section */}
            <Title level={5}>Available Offers HDFC Cards</Title>
            <ul>
              {product.offers &&
                product.offers.map((offer, index) => (
                  <li key={index}>
                    <Text>{offer}</Text>
                  </li>
                ))}
            </ul>
            <Divider />
            {/* Buttons */}
            <Row gutter={16}>
              <Col>
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={() => handleButtonClick("addToCart")}
                >
                  Add to Cart
                </Button>
              </Col>
              <Col>
                <Button
                  type="danger"
                  size="large"
                  block
                  onClick={() => handleButtonClick("buyNow")}
                >
                  Buy Now
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
