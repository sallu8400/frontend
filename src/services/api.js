// Dummy API service using JSONPlaceholder and mock data
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Mock product data for our fashion store
const mockProducts = [
  {
    id: 1,
    name: 'Classic Wool Coat',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040882/pexels-photo-1040882.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.8,
    reviews: 124,
    badge: 'Sale',
    category: 'men',
    description: 'Premium wool coat crafted with finest materials. Perfect for winter season with elegant design and superior comfort.',
    features: ['100% Wool', 'Water Resistant', 'Dry Clean Only', 'Classic Fit'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Grey', 'Brown'],
    inStock: true
  },
  {
    id: 2,
    name: 'Designer Silk Dress',
    price: 189,
    image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1487088/pexels-photo-1487088.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.9,
    reviews: 89,
    category: 'women',
    description: 'Elegant silk dress perfect for special occasions. Features beautiful draping and luxurious feel.',
    features: ['100% Silk', 'Hand Wash', 'Elegant Design', 'Comfortable Fit'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Red', 'Black', 'Navy', 'Emerald'],
    inStock: true
  },
  {
    id: 3,
    name: 'Premium Leather Jacket',
    price: 449,
    image: 'https://images.pexels.com/photos/1040882/pexels-photo-1040882.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1040882/pexels-photo-1040882.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.7,
    reviews: 156,
    badge: 'New',
    category: 'men',
    description: 'Genuine leather jacket with modern styling. Durable construction with attention to detail.',
    features: ['Genuine Leather', 'Multiple Pockets', 'YKK Zippers', 'Slim Fit'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true
  },
  {
    id: 4,
    name: 'Cashmere Sweater',
    price: 159,
    originalPrice: 199,
    image: 'https://images.pexels.com/photos/1766678/pexels-photo-1766678.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1766678/pexels-photo-1766678.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.6,
    reviews: 93,
    badge: 'Sale',
    category: 'women',
    description: 'Luxurious cashmere sweater for ultimate comfort and style. Perfect for layering or wearing alone.',
    features: ['100% Cashmere', 'Machine Washable', 'Soft Touch', 'Regular Fit'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Pink', 'Grey', 'Black'],
    inStock: true
  },
  {
    id: 5,
    name: 'Designer Handbag',
    price: 299,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.8,
    reviews: 67,
    badge: 'Trending',
    category: 'accessories',
    description: 'Premium designer handbag with elegant design. Perfect for daily use or special occasions.',
    features: ['Genuine Leather', 'Multiple Compartments', 'Adjustable Strap', 'Gold Hardware'],
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Tan', 'Red'],
    inStock: true
  },
  {
    id: 6,
    name: 'Tailored Blazer',
    price: 229,
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.8,
    reviews: 112,
    category: 'men',
    description: 'Professional tailored blazer perfect for business meetings and formal events.',
    features: ['Wool Blend', 'Tailored Fit', 'Two Button', 'Dry Clean Only'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Black', 'Grey', 'Charcoal'],
    inStock: true
  },
  {
    id: 7,
    name: 'Summer Floral Dress',
    price: 129,
    image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.5,
    reviews: 78,
    badge: 'New',
    category: 'women',
    description: 'Light and breezy summer dress with beautiful floral patterns.',
    features: ['Cotton Blend', 'Machine Washable', 'Floral Print', 'A-Line Cut'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral Blue', 'Floral Pink', 'Floral Yellow'],
    inStock: true
  },
  {
    id: 8,
    name: 'Casual Denim Jacket',
    price: 89,
    originalPrice: 120,
    image: 'https://images.pexels.com/photos/1040882/pexels-photo-1040882.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1040882/pexels-photo-1040882.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.4,
    reviews: 95,
    badge: 'Sale',
    category: 'men',
    description: 'Classic denim jacket perfect for casual outings and layering.',
    features: ['100% Cotton Denim', 'Classic Fit', 'Button Closure', 'Multiple Pockets'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Light Blue', 'Dark Blue', 'Black'],
    inStock: true
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const apiService = {
  // Get all products
  async getProducts() {
    await delay(800); // Simulate network delay
    return {
      data: mockProducts,
      status: 200,
      message: 'Products fetched successfully'
    };
  },

  // Get products by category
  async getProductsByCategory(category) {
    await delay(600);
    const filteredProducts = mockProducts.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
    return {
      data: filteredProducts,
      status: 200,
      message: `${category} products fetched successfully`
    };
  },

  // Get single product by ID
  async getProductById(id) {
    await delay(500);
    const product = mockProducts.find(p => p.id === parseInt(id));
    if (product) {
      return {
        data: product,
        status: 200,
        message: 'Product fetched successfully'
      };
    } else {
      return {
        data: null,
        status: 404,
        message: 'Product not found'
      };
    }
  },

  // Search products
  async searchProducts(query) {
    await delay(400);
    const searchResults = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    return {
      data: searchResults,
      status: 200,
      message: `Search results for "${query}"`
    };
  },



  // Get user profile
  async getUserProfile(userId) {
    await delay(600);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      const userData = await response.json();
      
      return {
        data: userData,
        status: 200,
        message: 'Profile fetched successfully'
      };
    } catch (error) {
      return {
        data: null,
        status: 404,
        message: 'User not found'
      };
    }
  },

  // Update user profile
  async updateUserProfile(userId, profileData) {
    await delay(800);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      const updatedUser = await response.json();
      
      return {
        data: updatedUser,
        status: 200,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      return {
        data: null,
        status: 400,
        message: 'Profile update failed'
      };
    }
  },

  // Get user orders (mock data)
  async getUserOrders(userId) {
    await delay(700);
    const mockOrders = [
      {
        id: 12345,
        date: '2024-03-15',
        total: 299.00,
        status: 'Delivered',
        items: [
          { id: 1, name: 'Classic Wool Coat', quantity: 1, price: 299 }
        ]
      },
      {
        id: 12344,
        date: '2024-03-10',
        total: 189.00,
        status: 'Shipped',
        items: [
          { id: 2, name: 'Designer Silk Dress', quantity: 1, price: 189 }
        ]
      }
    ];
    
    return {
      data: mockOrders,
      status: 200,
      message: 'Orders fetched successfully'
    };
  }
};

export default apiService;