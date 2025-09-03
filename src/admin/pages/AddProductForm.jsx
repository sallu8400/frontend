
// import React, { useEffect, useState } from 'react';
// import {
//   Form,
//   Input,
//   Button,
//   Select,
//   InputNumber,
//   Switch,
//   Upload,
//   Row,
//   Checkbox,
//   Col,
//   Card,
//   Space,
//   message
// } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import ProductList from '../compoents/common/ProductList';

// const { Option } = Select;
// const { TextArea } = Input;
// const BASE_URL = "https://backend-2-rngp.onrender.com/api/products";
// const UPLOAD_URL = "https://backend-2-rngp.onrender.com/api/storage/upload-product";
//  const getAuthToken = () => {
//   return localStorage.getItem("authToken");
// };

//  const getAuthHeaders = () => {
//   const token = getAuthToken();
//   return {
//     'Content-Type': 'multipart/form-data',
//     'Authorization': `Bearer ${token}`,
//   };
// };
// const formItemLayout = {
//   labelCol: { span: 24 },
//   wrapperCol: { span: 24 },
// };

// const AddProductForm = () => {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState([]);
//  const [product,setproduct]=useState([]);

//   const onFinish = async (values) => {
//     const token = getAuthToken()
//     if (!token) {
//         message.error("Authentication token not found. Please log in again.");
//         return;
//     }

//     // ** YAHAN SABSE BADA BADLAV HAI **
//     // Ab hum fileList se objects ka ek naya array banayenge jo schema se match karega.
//     const finalImageObjects = fileList.map((file, index) => {
//       // Sirf unhi files ko process karein jo successfully upload ho chuki hain
//       if (file.status === 'done' && file.response) {
//         return {
//           // 'location' key se URL lein, jaisa humne pehle fix kiya tha
//           url: file.response.location, 
          
//           // Alt text ke liye product ka naam istemal karein, yeh SEO ke liye achha hai
//           alt: values.name || 'Product Image', 
          
//           // Pehli image ko primary (default) image bana dein
//           isPrimary: index === 0 
//         };
//       }
//       return null;
//     }).filter(img => img !== null); // Agar koi file fail hui ho to use hata dein

//     // Check karein ki kam se kam ek image upload hui hai ya nahi
//     if (finalImageObjects.length === 0) {
//       message.error('Please upload at least one image!');
//       return;
//     }

//     // Ab dataToSend me image URLs ke bajaye image objects ka array bhejenge
//     const dataToSend = {
//       ...values,
//       images: finalImageObjects, 
//     };

//     try {
//       // Console me check karein ki data sahi format me jaa raha hai
//       console.log("Form Data to Send (Correct Format):", dataToSend); 

//       const response = await axios.post(BASE_URL, dataToSend, {
//         headers: getAuthHeaders()
//       });

//       console.log("Product Added Successfully:", response.data);
//       message.success("Product added successfully!");
//       form.resetFields();
//       setFileList([]);
//     } catch (error) {
//       console.error("Error adding product:", error.response ? error.response.data : error.message);
//       if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//           message.error("You are not authorized to perform this action.");
//       } else {
//           // Backend se aa raha validation error bhi dikha sakte hain
//           const errorMsg = error.response && error.response.data && error.response.data.message
//               ? error.response.data.message
//               : "Failed to add product. Please check console.";
//           message.error(errorMsg);
//       }
//     }
//   };

// const customUploadRequest = async ({ file, onSuccess, onError }) => {
//   const token = getAuthToken();
//   if (!token) {
//     message.error("Authentication token not found.");
//     onError(new Error("Auth token not found"));
//     return;
//   }

//   const formData = new FormData();
//   formData.append('product', file);

//   try {
//     const response = await axios.post(UPLOAD_URL, formData, {
//       headers: getAuthHeaders()
//     });

//     const newImageUrl = response.data.location;

//     if (newImageUrl) {
//       onSuccess(response.data, file);
//       message.success(`${file.name} file uploaded successfully.`);
//     } else {
//       console.error("Location/URL not found in server response:", response.data);
//       message.error("Upload succeeded but URL was not returned from server.");
//       onError(new Error("URL not found in response"));
//     }
//   } catch (error) {
//     onError(error);
//     console.error("Image upload error:", error);
//     message.error(`${file.name} file upload failed.`);
//   }
// };

  
//   const handleFileChange = ({ fileList: newFileList }) => {
//   console.log("onChange triggered 🚀");
//   console.log("New File List:", newFileList); // Yeh check karega ki fileList me kya aa raha hai
//   setFileList(newFileList);
//   console.log(fileList)
// };
// const handleDelete = async (id) => {
//   try {
//     const response = await axios.delete(`${BASE_URL}/${id}`, {
//       headers: getAuthHeaders(),
//     });
//     setproduct((prev) => prev.filter((item) => item._id !== id));
//     if (response.status === 200) {
//       message.success("Product deleted successfully.");
//       // Optionally: update UI, refetch products, etc.
//     } else {
//       message.warning("Delete request completed, but unexpected response.");
//     }
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     message.error("Failed to delete the product.");
//   }
// };

//   // fetch product
//   useEffect(()=>{

//     const fetchData=async()=>{
//      const {data}=await axios.get(BASE_URL)
// setproduct(data.data)
//      console.log(data)
//     }
// fetchData()


//   },[])

//   return (
// <>
//       <div className="bg-gray-100 p-4">
//       <Card title="Add New Product" className="shadow-lg">
//         <Form
//           form={form}
//           {...formItemLayout}
//           onFinish={onFinish}
//           layout="vertical"
//           initialValues={{ inStock: true, isActive: true, sizes: [], colors: [], features: [] }}
//         >
//           {/* Baaki ka form waisa hi rahega */}
//           <Row gutter={24}>
//             {/* Left Column */}
//             <Col xs={24} md={12}>
//               <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please input the product name!' }, { max: 100 }]}>
//                 <Input placeholder="e.g., Men's Casual T-Shirt" />
//               </Form.Item>
//               <Form.Item name="sku" label="SKU (Stock Keeping Unit)" rules={[{ required: true, message: 'SKU is required!' }]}>
//                 <Input placeholder="e.g., M-TSHIRT-BLK-01" />
//               </Form.Item>
//               <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]}>
//                 <Select placeholder="Select a category">
//                   <Option value="men">Men</Option>
//                   <Option value="women">Women</Option>
//                   <Option value="kids">Kids</Option>
//                   <Option value="accessories">Accessories</Option>
//                 </Select>
//               </Form.Item>
//               <Form.Item name="badge" label="Badge">
//                 <Select placeholder="Select a badge (optional)">
//                   <Option value="New">New</Option>
//                   <Option value="Sale">Sale</Option>
//                   <Option value="Trending">Trending</Option>
//                   <Option value="Limited">Limited</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             {/* Right Column */}
//             <Col xs={24} md={12}>
//               <Space align="baseline" className="w-full">
//                 <Form.Item name="price" label="Selling Price ($)" rules={[{ required: true, message: 'Price is required!' }]} className="w-full">
//                   <InputNumber min={0} className="w-full" />
//                 </Form.Item>
//                 <Form.Item name="originalPrice" label="Original Price ($) (Optional)" className="w-full">
//                   <InputNumber min={0} className="w-full" />
//                 </Form.Item>
//               </Space>
//               <Form.Item name="sizes" label="Available Sizes">
//                 <Checkbox.Group options={['XS', 'S', 'M', 'L', 'XL', 'XXL']} />
//               </Form.Item>
//               <Row>
//                   <Col span={12}>
//                       <Form.Item name="inStock" label="In Stock" valuePropName="checked">
//                         <Switch checkedChildren="Yes" unCheckedChildren="No" />
//                       </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                       <Form.Item name="isActive" label="Is Active" valuePropName="checked">
//                          <Switch checkedChildren="Yes" unCheckedChildren="No" />
//                       </Form.Item>
//                   </Col>
//               </Row>
//             </Col>
//           </Row>
//           <Row gutter={24}>
//             <Col span={24}>
//               <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please add a description!' }, {max: 2000}]}>
//                 <TextArea rows={4} placeholder="Detailed product description" />
//               </Form.Item>
//               <Form.Item name="colors" label="Colors">
//                 <Select mode="tags" placeholder="Type and press enter to add colors" />
//               </Form.Item>
//               <Form.Item name="features" label="Features">
//                 <Select mode="tags" placeholder="Type and press enter to add features" />
//               </Form.Item>
//               <Form.Item label="Product Images">
//                 <Upload
//                     customRequest={customUploadRequest}
//                     listType="picture"
//                     fileList={fileList}
//                     onChange={handleFileChange}
//                     multiple
//                 >
//                   <Button icon={<UploadOutlined />}>Click to Upload</Button>
//                 </Upload>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" size="large" className="w-fit">
//               Add Product
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>


// <ProductList  product={product} onDelete={handleDelete} />
// </>
//   );
// };

// export default AddProductForm;
import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button, Select, InputNumber, Switch, Upload, Row, Checkbox, Col, Card, Space, message, Typography
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
// ProductList component ko import karna zaroori hai
import ProductList from '../compoents/common/ProductList';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchPaginatedProducts } from '../../store/slices/paginationSlice';


const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

// --- URLs and Auth (Thoda sa change kiya gaya hai) ---
const BASE_URL = "https://backend-2-rngp.onrender.com/api/products";
const UPLOAD_URL = "https://backend-2-rngp.onrender.com/api/storage/upload-product";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// ** BADLAV YAHAN **: Is function ko thoda flexible banaya hai.
// Jab hum JSON data (form details) bhejenge, to 'Content-Type' 'application/json' hoga.
// Jab hum file (image) bhejenge, to yeh 'multipart/form-data' hoga.
const getAuthHeaders = (isMultipart = false) => {
  const token = getAuthToken();
  return {
    'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const AddProductForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  // State variable ka naam 'product' se 'products' kar diya, kyunki yeh ek list hai.
const [products, setProducts] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
      const {
    data: currentProducts,
    loading,
    error,
    total,
  } = useSelector((state) => state.pagination);


  const dispatch=useDispatch()

  // ** STEP 1: EDITING KO MANAGE KARNE KE LIYE NAYI STATE **
  // Yeh state track karegi ki hum kaun sa product edit kar rahe hain.
  // `null` ka matlab hai "Add Mode", data hone ka matlab hai "Edit Mode".
  const [editingProduct, setEditingProduct] = useState(null);

  // ** STEP 2: FORM KO EDITING DATA SE BHARNE KE LIYE useEffect **
  // Yeh hook tab chalega jab bhi `editingProduct` state badlegi.
  useEffect(() => {
    if (editingProduct) {
      // Antd ka 'setFieldsValue' form ke fields ko data se bhar dega.
      form.setFieldsValue({
        ...editingProduct,
        // Ensure switches get boolean values
        inStock: editingProduct.inStock ?? true,
        isActive: editingProduct.isActive ?? true,
      });

      // Purani images ko fileList me set karna taaki wo UI me dikhein.
      const imageFileList = editingProduct.images.map((img, index) => ({
        uid: img._id || `_id_${index}`, // Har file ka unique ID zaroori hai
        name: `Image ${index + 1}`,
        status: 'done', // Status 'done' dikhana hai
        url: img.url,   // Yeh URL image dikhane ke liye use hoga
        response: { location: img.url } // Yeh response object `onFinish` me kaam aayega
      }));
      setFileList(imageFileList);
    } else {
      // Agar `editingProduct` null hai (yaani edit cancel hua), to form reset kar do.
      form.resetFields();
      setFileList([]);
    }
  }, [editingProduct, form]);

  // --- Data Fetching (No big change) ---
  useEffect(() => {
    const fetchData = async () => {
      try {

        dispatch(fetchPaginatedProducts(2,6))
        const { data } = await axios.get(BASE_URL);
        setProducts(data.data);
      } catch (error) {
        message.error("Failed to fetch products.");
      }
    };
    fetchData();
  }, []);

  // ** STEP 3: onFinish FUNCTION KO ADD AUR UPDATE, DONO KE LIYE TAIYAR KARNA **
  const onFinish = async (values) => {
    const token = getAuthToken();
    if (!token) {
        message.error("Authentication token not found.");
        return;
    }

    // Image processing logic waisa hi rahega
    const finalImageObjects = fileList.map((file, index) => {
      // Agar file pehle se uploaded hai (edit mode me), to uska URL use karo
      const imageUrl = file.response?.location || file.url;
      if (file.status === 'done' && imageUrl) {
        return {
          url: imageUrl,
          alt: values.name || 'Product Image',
          isPrimary: index === 0
        };
      }
      return null;
    }).filter(img => img !== null);

    if (finalImageObjects.length === 0) {
      message.error('Please upload at least one image!');
      return;
    }

    const dataToSend = { ...values, images: finalImageObjects };

    try {
      if (editingProduct) {
        // ============== UPDATE LOGIC ==============
        // Agar `editingProduct` state me data hai, to PUT request bhejenge.
        const response = await axios.put(`${BASE_URL}/${editingProduct._id}`, dataToSend, {
          headers: getAuthHeaders(false) // JSON data ke liye `false`
        });
        
        message.success("Product updated successfully!");
        
        // Product list ko locally update karo, taaki UI turant refresh ho.
        setProducts(products.map(p => p._id === editingProduct._id ? response.data.data : p));

        // Edit mode se bahar aao.
        setEditingProduct(null);

      } else {
        // ============== ADD LOGIC (Pehle jaisa hi) ==============
        const response = await axios.post(BASE_URL, dataToSend, {
          headers: getAuthHeaders(false) // JSON data ke liye `false`
        });
        
        message.success("Product added successfully!");
        // Naye product ko list me add karo.
        setProducts(prevProducts => [...prevProducts, response.data.data]);
      }

      // Dono cases me form reset karo.
      form.resetFields();
      setFileList([]);

    } catch (error) {
      const errorMsg = error.response?.data?.message || `Failed to ${editingProduct ? 'update' : 'add'} product.`;
      message.error(errorMsg);
    }
  };

  // ** STEP 4: EDIT BUTTON KE LIYE HANDLER FUNCTION **
  // Yeh function `ProductList` se call hoga.
  const handleEdit = (productToEdit) => {
    // Product ko state me set karo taaki "Edit Mode" activate ho jaye.
    setEditingProduct(productToEdit);
    // User ko form tak scroll karwa do taaki use form dikhe.
    window.scrollTo({ top: 0, behavior: 'smooth' });
    message.info(`Now editing: ${productToEdit.name}`);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null); // State ko null karke Edit mode cancel kar do.
  };

  // --- Delete Function (No big change) ---
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
      setProducts(products.filter((item) => item._id !== id));
      message.success("Product deleted successfully.");
    } catch (error) {
      message.error("Failed to delete the product.");
    }
  };

  // --- Upload Handlers (No big change) ---
  const customUploadRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('product', file);
    try {
      const response = await axios.post(UPLOAD_URL, formData, { 
        headers: getAuthHeaders(true) // File upload ke liye `true`
      });
      onSuccess(response.data, file);
      message.success(`${file.name} file uploaded successfully.`);
    } catch (error) {
      onError(error);
      message.error(`${file.name} file upload failed.`);
    }
  };
  
  const handleFileChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <>
      <div className="bg-gray-100 p-4">
        {/* ** STEP 5: UI KO DYNAMIC BANANA ** */}
        <Card
          // Title ko state ke hisaab se badlo.
          title={<Title level={3}>{editingProduct ? `Edit Product` : 'Add New Product'}</Title>}
          className="shadow-lg"
          // Edit mode me 'Cancel' button dikhao.
          extra={editingProduct && <Button onClick={handleCancelEdit}>Cancel Edit</Button>}
        >
          <Form form={form} {...formItemLayout} onFinish={onFinish} layout="vertical" initialValues={{ inStock: true, isActive: true, sizes: [], colors: [], features: [] }}>
            {/* Form ka baaki structure waisa hi rahega */}
            {/* Form Fields... */}
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
                  <Input placeholder="e.g., Men's Casual T-Shirt" />
                </Form.Item>
                <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
                  <Input placeholder="e.g., M-TSHIRT-BLK-01" />
                </Form.Item>
                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                  <Select placeholder="Select a category">
                    <Option value="men">Men</Option>
                    <Option value="women">Women</Option>
                    <Option value="kids">Kids</Option>
                    <Option value="accessories">Accessories</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="badge" label="Badge">
                  <Select placeholder="Select a badge (optional)">
                    <Option value="New">New</Option>
                    <Option value="Sale">Sale</Option>
                    <Option value="Trending">Trending</Option>
                    <Option value="Limited">Limited</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Space align="baseline" className="w-full">
                  <Form.Item name="price" label="Selling Price ($)" rules={[{ required: true }]} className="w-full">
                    <InputNumber min={0} className="w-full" />
                  </Form.Item>
                  <Form.Item name="originalPrice" label="Original Price ($)" className="w-full">
                    <InputNumber min={0} className="w-full" />
                  </Form.Item>
                </Space>
                <Form.Item name="sizes" label="Available Sizes">
                  <Checkbox.Group options={['XS', 'S', 'M', 'L', 'XL', 'XXL']} />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item name="inStock" label="In Stock" valuePropName="checked">
                          <Switch checkedChildren="Yes" unCheckedChildren="No" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="isActive" label="Is Active" valuePropName="checked">
                          <Switch checkedChildren="Yes" unCheckedChildren="No" />
                        </Form.Item>
                    </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                  <TextArea rows={4} placeholder="Detailed product description" />
                </Form.Item>
                <Form.Item name="colors" label="Colors">
                  <Select mode="tags" placeholder="Type and press enter to add colors" />
                </Form.Item>
                <Form.Item name="features" label="Features">
                  <Select mode="tags" placeholder="Type and press enter to add features" />
                </Form.Item>
                <Form.Item label="Product Images">
                  <Upload customRequest={customUploadRequest} listType="picture" fileList={fileList} onChange={handleFileChange} multiple>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" className="w-fit">
                {/* Button ka text bhi state ke hisaab se badlo */}
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>


      {/* ** STEP 6: `onEdit` HANDLER KO `ProductList` ME PASS KARNA ** */}
      <ProductList product={products} onDelete={handleDelete} onEdit={handleEdit} />
    </>
  );
};

export default AddProductForm;