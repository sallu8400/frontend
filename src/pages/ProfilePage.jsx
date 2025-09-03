// src/pages/ProfilePage.jsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Avatar, Upload, Tabs, Card, message } from 'antd';
import { User, Mail, Phone, MapPin, Camera, Package, Heart, CreditCard } from 'lucide-react';
import { Addadress, deleteAddress, getCurrentUser, updateAddress, updateUserProfile } from '../store/slices/authSlice';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';
import AddressEditModal from './AddressEditModal.jsx'; // 👈 सुनिश्चित करें कि यह .jsx है
import { FetchAddress } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {

    const navigate = useNavigate();
  const { isDarkMode } = useTheme();
   const [loading, setLoading] = useState(false);
  
  // --- मॉडल के लिए स्टेट्स ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressType, setAddressType] = useState('');
  const dispatch = useDispatch();
  const { isLoggedIn,user ,addresses} = useSelector((state) => state.auth);
console.log(addresses,"profilepage")
 
  
  // --- पतों के लिए स्टेट्स ---
  const [shippingAddress, setShippingAddress] = useState({
    line1: '123 Fashion Avenue',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
  });

  const [billingAddress, setBillingAddress] = useState({
    line1: '123 Billing Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
  });


    useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]); 

  if (isLoggedIn === false) {
    // Auth state abhi load ho raha hai
    return      <>
      <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Loading products...</p>
        </div>
      
    </>
  }

  useEffect(() => {
 dispatch(FetchAddress())
  }, [dispatch]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      // const { data } = await axios.get('https://backend-2-rngp.onrender.com/api/auth/me', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
    };
    fetchProfile();
  }, [dispatch]);

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(updateUserProfile(values));
      message.success('Profile updated successfully!');
      setLoading(false);
    }, 1000);
  };

  const handleFileChange = async (info) => {
    try {
      const token = localStorage.getItem('authToken');
      const file = info.file;
      const formdata = new FormData();
      formdata.append("pic", file);
      const { data } = await axios.post("https://backend-2-rngp.onrender.com/api/storage/upload-pic", formdata);
      await axios.put(
        "https://backend-2-rngp.onrender.com/api/auth/profileUpload",
        { avatar: data.location },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      dispatch(getCurrentUser());
      message.success('image updated successfully!');
    } catch (error) {
      console.log(error);
      message.error('image Upload failed !');
    }
  };

  // --- मॉडल हैंडलर्स ---
  const handleOpenModal = (type) => {
    setAddressType(type);
    setEditingAddress(type === 'shipping' ? shippingAddress : billingAddress);
    setIsModalOpen(true);
  };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setEditingAddress(null);
  // };


  const handleDelete = (id) => {
  dispatch(deleteAddress(id))
    .unwrap()
    .then(() => {
      dispatch(FetchAddress()); // refetch after delete
      message.success('Address deleted');
    })
    .catch((err) => {
      message.error(err || 'Delete failed');
    });
};


// For Add
const handleAddNew = () => {
  setEditingAddress(null);
  setIsModalOpen(true);
};

// For Edit
const handleEdit = (address) => {
  setEditingAddress(address);
  setIsModalOpen(true);
};


 const handleSaveAddress = async (data) => {
  try {
    if (data._id) {
      // 🛠️ EDIT MODE
      await dispatch(updateAddress(data)).unwrap();
      message.success('Address updated');
    } else {
      // ➕ ADD MODE
      await dispatch(Addadress(data)).unwrap();
      await dispatch(FetchAddress()); // ✅ Refresh list after add
      message.success('Address added');
      setIsModalOpen(false);
    }
  } catch (error) {
    message.error(data._id ? 'Update failed' : 'Add failed');
  }
};




const handleMakeDefault = (id) => {
  const selectedAddress = addresses.find(addr => addr._id === id);

  if (selectedAddress) {
    const updatedAddress = {
      ...selectedAddress,
      isDefault: true,
    };

    dispatch(updateAddress(updatedAddress)) // 👈 same update thunk
      .unwrap()
      .then(() => {
        message.success("Address set as default");
        dispatch(FetchAddress()); // Refresh
      })
      .catch(() => {
        message.error("Failed to set default");
      });
  }
};


  // const handleSaveAddress = (newAddress) => {
  //   if (addressType === 'shipping') {
  //     setShippingAddress(newAddress);
  //   } else {
  //     setBillingAddress(newAddress);
  //   }
  //   handleCloseModal();
  // };
  
  // --- आपके मूल टैब कंटेंट ---
  const profileForm = (
    <Card title="Personal Information" className={`mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
      <Form layout="vertical" initialValues={user} onFinish={handleUpdateProfile} className="max-w-md">
        <div className="flex items-center space-x-6 mb-6">
          <Avatar size={80} src={user?.avatar}>{user?.name?.charAt(0).toUpperCase()}</Avatar>
          <div>
            <Upload showUploadList={false} beforeUpload={() => false} onChange={handleFileChange}>
              <Button icon={<Camera className="w-4 h-4" />}>Change Photo</Button>
            </Upload>
            <p className={`text-sm mt-2 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>JPG, PNG up to 5MB</p>
          </div>
        </div>
        <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input prefix={<User className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />} />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}>
          <Input prefix={<Mail className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />} />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number">
          <Input prefix={<Phone className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />} />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input.TextArea rows={3} placeholder="Enter your address" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className={isDarkMode ? 'bg-amber-600 hover:bg-amber-700 border-amber-600' : 'bg-slate-800 hover:bg-slate-900 border-slate-800'}>Update Profile</Button>
        </Form.Item>
      </Form>
    </Card>
  );

  // --- ऑर्डर्स टैब (आपके मूल कोड के अनुसार) ---
  const ordersTab = (
    <div className="space-y-4">
      <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-semibold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Order #12345</h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Placed on March 15, 2024</p>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Total: $299.00</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Delivered</span>
          </div>
        </div>
      </Card>
      <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-semibold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Order #12344</h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Placed on March 10, 2024</p>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Total: $189.00</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Shipped</span>
          </div>
        </div>
      </Card>
    </div>
  );

  // --- एड्रेस टैब (मॉडल कार्यक्षमता के साथ) ---
  const addressesTab = (
    <>

<div>
  <Button type="primary" className='my-2' onClick={() => handleAddNew ()}>
    Add New Address
  </Button>
</div>
    <div className="space-y-4">
      <Card title="Shipping Address" extra={<Button type="link" onClick={() => handleOpenModal('shipping')}>Edit</Button>} className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
        <div className="flex items-start space-x-3">
          <MapPin className={`w-5 h-5 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />
          <div>
            <p className={`font-medium transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user?.name}</p>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>{shippingAddress.line1}</p>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>{`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}`}</p>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>{shippingAddress.country}</p>
          </div>
        </div>
      </Card>
      <Card title="Billing Address" extra={<Button type="link" onClick={() => handleOpenModal('billing')}>Edit</Button>} className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
        <div className="flex items-start space-x-3">
          <MapPin className={`w-5 h-5 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />
          <div>
            <p className={`font-medium transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user?.name}</p>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>{billingAddress.line1}</p>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>{`${billingAddress.city}, ${billingAddress.state} ${billingAddress.zip}`}</p>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>{billingAddress.country}</p>
          </div>
        </div>
      </Card>

{addresses && addresses.map((address, index) => (
  <Card
    key={address?._id || index}
    title={`Address ${index + 1}`}
    extra={
      <div className="flex gap-2">
        <Button type="link" onClick={() => handleEdit(address)}>Edit</Button>
        <Button danger type="link" onClick={() => handleDelete(address?._id)}>Delete</Button>
        {!address?.isDefault && (
          <Button type="link" onClick={() => handleMakeDefault(address?._id)}>
            Make Default
          </Button>
        )}
      </div>
    }
    className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
  >
    <div className="flex items-start space-x-3">
      <MapPin className={`w-5 h-5 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />
      <div>
        <p className={`font-medium transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {user?.name || 'No Name'}
        </p>
        <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
          {address?.street || 'No street'}
        </p>
        <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
          {`${address?.city || 'No city'}, ${address?.state || 'No state'} ${address?.zipCode || ''}`}
        </p>
        <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
          {address?.country || 'No country'}
        </p>

        {address?.isDefault && (
          <span className="inline-block mt-2 text-xs text-green-500 font-semibold">(Default)</span>
        )}
      </div>
    </div>
  </Card>
))}





      
    </div>
    </>
  );


  const paymentTab = (
    <div className="space-y-4">
      <Card title="Payment Methods" extra={<Button type="primary">Add New</Button>} className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
        <div className="space-y-4">
          <div className={`flex items-center justify-between p-4 border rounded-lg ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <CreditCard className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />
              <div>
                <p className={`font-medium transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>•••• •••• •••• 4242</p>
                <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>Expires 12/25</p>
              </div>
            </div>
            <Button type="link" danger>Remove</Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const tabItems = [
    { key: 'profile', label: <span className="flex items-center space-x-2"><User className="w-4 h-4" /><span>Profile</span></span>, children: profileForm },
    { key: 'orders', label: <span className="flex items-center space-x-2"><Package className="w-4 h-4" /><span>Orders</span></span>, children: ordersTab },
    { key: 'addresses', label: <span className="flex items-center space-x-2"><MapPin className="w-4 h-4" /><span>Addresses</span></span>, children: addressesTab },
    { key: 'payment', label: <span className="flex items-center space-x-2"><CreditCard className="w-4 h-4" /><span>Payment</span></span>, children: paymentTab },
  ];

  return (
<>

    <div className={`min-h-screen py-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-2xl shadow-lg p-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="mb-8">
            <h1 className={`text-3xl font-bold mb-2 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>My Account</h1>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Manage your account settings and preferences</p>
          </div>
          <Tabs items={tabItems} size="large" />
        </div>
      </div>
      
      <AddressEditModal isOpen={isModalOpen}   onClose={() => setIsModalOpen(false)} address={editingAddress} onSave={handleSaveAddress} />
    </div>

</>

  );


}

export default ProfilePage;