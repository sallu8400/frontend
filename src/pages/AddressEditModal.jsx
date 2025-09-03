// src/components/AddressEditModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useTheme } from '../contexts/ThemeContext'; // यदि आप चाहते हैं कि मॉडल में भी थीम हो
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const AddressEditModal = ({ isOpen, onClose, address, onSave }) => {

  const [form] = Form.useForm();
  const { isDarkMode } = useTheme();

 const dispatch= useDispatch()

  // जब भी 'address' प्रॉप बदलता है तो फ़ॉर्म फ़ील्ड को रीसेट करें
  useEffect(() => {
    if (address) {
      form.setFieldsValue(address);
    } else {
      form.resetFields();
    }
  }, [address, form]);

  const handleFinish = (values) => {
try {
    const finalValues = address ? { ...values, _id: address._id } : values;
  onSave(finalValues);  // parent component will decide what to do
    onClose(); 


} catch (error) {
  
}
    // message.success('Address updated successfully!');
  
  };

  return (
    <Modal
title={address ? 'Edit Address' : 'Add New Address'}
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      className={isDarkMode ? 'dark-modal' : ''}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={address}>
        <Form.Item
          name="street"
          label="Address Line 1"
          rules={[{ required: true, message: 'Please enter the first line of your address' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="city"
          label="city"
          rules={[{ required: true, message: 'Please enter your city' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="state"
          label="State / Province"
          rules={[{ required: true, message: 'Please enter your state' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="zipCode"
          label="ZIP / Postal Code"
          rules={[{ required: true, message: 'Please enter your ZIP code' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: 'Please enter your country' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="text-right">
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save Address
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressEditModal;