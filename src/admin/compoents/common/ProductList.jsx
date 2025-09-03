

import React, { useState, useEffect } from 'react';
// Humne 'Input' component ko import kiya hai
import { Table, Tag, Space, Button, Card, Avatar, Typography, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchPaginatedProducts } from '../../../store/slices/paginationSlice';
import { useDispatch ,useSelector} from 'react-redux';

const { Title, Text } = Typography;
const { Search } = Input; // Search component ko alag se nikal liya

// ** YEH HAI SABSE SAHI TARIKA **
const ProductList = ({ product = [], onDelete, onEdit }) => { // Props yahan receive ho gaye
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5); // pageSizeOptions में से एक डिफ़ॉल्ट मान
  const dispatch = useDispatch();

  // ✅ pagination slice से डेटा चुनें
  const {
    data: currentProducts,
    loading,
    error,
    total,
  } = useSelector((state) => state.pagination);
  // जब currentPage या productsPerPage बदलता है तो डेटा फिर से प्राप्त करें
  useEffect(() => {
    dispatch(fetchPaginatedProducts({ page: currentPage, limit: productsPerPage }));
  }, [currentPage, productsPerPage, dispatch]);
  const handleTableChange = (pagination) => {

    setCurrentPage(pagination.current);
    setProductsPerPage(pagination.pageSize);
  };


    // ** `columns` array ko component ke andar le aaye **
    // Ab isko `onDelete` aur `onEdit` ka seedha access hai
    const columns = [
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'image',
            render: (images) => {
              if (!Array.isArray(images) || images.length === 0) {
                return <Avatar shape="square" size={64}>No Img</Avatar>;
              }
              const primaryImage = images.find(img => img && img.isPrimary) || images.find(img => img);
              return primaryImage ? <Avatar shape="square" size={64} src={primaryImage.url} /> : <Avatar shape="square" size={64}>No Img</Avatar>;
            },
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>
                    <Text strong>{record.name}</Text><br />
                    <Text type="secondary">SKU: {record.sku}</Text>
                </div>
            ),
        },
        // ... baaki columns ...
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: category => category ? <Tag color="blue">{category.toUpperCase()}</Tag> : null
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price, record) => (
              <div>
                <Text strong>${price ? price.toFixed(2) : '0.00'}</Text><br />
                {record.originalPrice && <Text delete type="secondary">${record.originalPrice.toFixed(2)}</Text>}
              </div>
            )
        },
        {
            title: 'Status',
            key: 'status',
            render: (text, record) => (
              <Space direction="vertical">
                {record.inStock ? <Tag color="green">In Stock</Tag> : <Tag color="red">Out of Stock</Tag>}
                {record.isActive ? <Tag color="cyan">Active</Tag> : <Tag color="gray">Inactive</Tag>}
              </Space>
            ),
        },
        {
            title: 'Date Added',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: date => date ? new Date(date).toLocaleDateString() : 'N/A',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => ( // 'record' me poora product object hai
                <Space size="middle">
                    <Button 
                        type="primary" 
                        icon={<EditOutlined />}
                        // Ab yeh bilkul sahi se kaam karega
                        onClick={() => onEdit(record)}
                    >
                        Edit
                    </Button>
                    <Button 
                        type="primary" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => onDelete(record._id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        setFilteredData(
            !searchText
            ? product
            : product.filter(item =>
                item.name && item.name.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [searchText, product]);

    return (
        <div className="bg-gray-100 p-4">
            <Card
                title={<Title level={3}>Product List</Title>}
                extra={
                    <Search
                        placeholder="Search by product name"
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                }
                className="shadow-lg"
            >
     <Table
      columns={columns}
      dataSource={currentProducts} // Redux स्टोर से आए डेटा का उपयोग करें
      rowKey="_id"
      scroll={{ x: true }}
      loading={loading} // लोडिंग स्थिति को टेबल पर लागू करें
      pagination={{
        current: currentPage,
        pageSize: productsPerPage,
        total: total, // कुल आइटम की संख्या Redux स्टोर से आएगी
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} products`,
      }}
      onChange={handleTableChange} // पेज बदलने या पेज का आकार बदलने को हैंडल करें
    />
            </Card>
        </div>
    );
};

export default ProductList;