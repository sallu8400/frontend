

      // import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";
// import { StatsCard } from "../ui/StatsCard";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// const salesData = [
//   { name: 'Jan', sales: 4000, orders: 240 },
//   { name: 'Feb', sales: 3000, orders: 190 },
//   { name: 'Mar', sales: 5000, orders: 330 },
//   { name: 'Apr', sales: 4500, orders: 280 },
//   { name: 'May', sales: 6000, orders: 420 },
//   { name: 'Jun', sales: 5500, orders: 380 },
// ];

// const recentOrders = [
//   { id: "#3001", customer: "John Doe", amount: "$129.99", status: "completed" },
//   { id: "#3002", customer: "Jane Smith", amount: "$89.50", status: "pending" },
//   { id: "#3003", customer: "Bob Johnson", amount: "$249.99", status: "processing" },
//   { id: "#3004", customer: "Alice Brown", amount: "$59.99", status: "completed" },
//   { id: "#3005", customer: "Charlie Wilson", amount: "$199.99", status: "shipped" },
// ];

// export default function Dashboard() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Dashboard</h1>
//         <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <StatsCard
//           title="Total Revenue"
//           value="$45,231"
//           change="+20.1% from last month"
//           changeType="positive"
//           icon={DollarSign}
//         />
//         <StatsCard
//           title="Total Orders"
//           value="1,234"
//           change="+15% from last month"
//           changeType="positive"
//           icon={ShoppingCart}
//         />
//         <StatsCard
//           title="Total Customers"
//           value="2,350"
//           change="+8.2% from last month"
//           changeType="positive"
//           icon={Users}
//         />
//         <StatsCard
//           title="Growth Rate"
//           value="12.5%"
//           change="-2.1% from last month"
//           changeType="negative"
//           icon={TrendingUp}
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid gap-4 lg:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Sales Overview</CardTitle>
//             <CardDescription>Monthly sales performance</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <AreaChart data={salesData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
//               </AreaChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Order Trends</CardTitle>
//             <CardDescription>Monthly order volume</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={salesData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="orders" fill="hsl(var(--accent))" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Orders */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Orders</CardTitle>
//           <CardDescription>Latest orders from your customers</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {recentOrders.map((order) => (
//               <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
//                 <div className="flex items-center gap-4">
//                   <div>
//                     <p className="font-medium">{order.id}</p>
//                     <p className="text-sm text-muted-foreground">{order.customer}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium">{order.amount}</p>
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     order.status === 'completed' ? 'bg-success/10 text-success' :
//                     order.status === 'pending' ? 'bg-warning/10 text-warning' :
//                     order.status === 'processing' ? 'bg-accent/10 text-accent' :
//                     'bg-primary/10 text-primary'
//                   }`}>
//                     {order.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// import { Layout, Row, Tag, Col, Card, Statistic, Table, List, Avatar, Button, Dropdown, Menu } from 'antd';
// import { DollarOutlined, ShoppingCartOutlined, ShoppingOutlined, ArrowUpOutlined } from '@ant-design/icons';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
// } from 'recharts';
// import 'antd/dist/reset.css';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { fetchAdminOrders } from '../../store/slices/paginationSlice';
// import { useDispatch,useSelector} from 'react-redux';

// const { Content } = Layout;

// // --- DATA MOCKS --- (Static data remains the same)
// const earningData = [
//   { name: 'Jan', Earning: 1200 }, { name: 'Feb', Earning: 2100 },
//   { name: 'Mar', Earning: 800 }, { name: 'Apr', Earning: 1600 },
//   { name: 'May', Earning: 900 }, { name: 'Jun', Earning: 2500 },
//   { name: 'Jul', Earning: 1800 }, { name: 'Aug', Earning: 3812.19 },
//   { name: 'Sep', Earning: 2900 }, { name: 'Oct', Earning: 3200 },
//   { name: 'Nov', Earning: 3500 }, { name: 'Dec', Earning: 4000 },
// ];

// const topSellingProducts = [
//   { key: '1', product: 'Nike Revolution 3', price: 250, orders: 47, stock: 23, amount: 12560, img: 'https://via.placeholder.com/40/87CEFA/FFFFFF?Text=Nike' },
//   { key: '2', product: 'Green Plain T-shirt', price: 79, orders: 98, stock: 7, amount: 2368, img: 'https://via.placeholder.com/40/228B22/FFFFFF?Text=Tee' },
//   { key: '3', product: 'Nike Dunk Shoes', price: 579, orders: 26, stock: 3, amount: 36987, img: 'https://via.placeholder.com/40/32CD32/FFFFFF?Text=Dunk' },
// ];

// const orderColumns = [
//     { title: 'Order Number', dataIndex: 'orderNumber', key: 'orderNumber', render: (text) => <strong>{text}</strong> },
//     { title: 'Customer ID', dataIndex: 'user', key: 'user' },
//     { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amount) => `₹${amount ? amount.toFixed(2) : '0.00'}` },
//     { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => {
//         let color = status === 'success' ? 'green' : 'volcano';
//         return <Tag color={color}>{status ? status.toUpperCase() : 'N/A'}</Tag>;
//       }
//     },
//     { title: 'Date', dataIndex: 'createdAt', key: 'createdAt', render: (date) => new Date(date).toLocaleDateString() },
// ];

// const modeOfOrderData = [{ name: 'Online', value: 70 }, { name: 'Store', value: 30 }];
// const PIE_CHART_COLORS = ['#87CEFA', '#333333'];

// const menu = (
//   <Menu>
//     <Menu.Item key="1">Today</Menu.Item>
//     <Menu.Item key="2">This Week</Menu.Item>
//     <Menu.Item key="3">This Month</Menu.Item>
//   </Menu>
// );

// const HomeAdmin = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(''); // Error state
//   const {
//   data: pagination,
//   total,
//   currentPage,
//   loading,
  
// } = useSelector
// ((state) => state.pagination);

// // Console log full orders slice
// console.log('Redux orders state:', useSelector((state) => state.pagination),pagination,"kk");

// const dispatch=useDispatch()
//   const productColumns = [
//     { title: 'PRODUCT', dataIndex: 'product', key: 'product', render: (text, record) => (
//         <div className="flex items-center">
//           <Avatar src={record.img} shape="square" size="large" />
//           <span className="ml-4 font-medium">{text}</span>
//         </div>
//       )
//     },
//     { title: 'PRICE', dataIndex: 'price', key: 'price', render: (price) => `$${price}` },
//     { title: 'ORDERS', dataIndex: 'orders', key: 'orders' },
//     { title: 'STOCK', dataIndex: 'stock', key: 'stock' },
//     { title: 'AMOUNT', dataIndex: 'amount', key: 'amount', render: (amount) => `$${amount.toLocaleString()}` },
//   ];

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const authToken = localStorage.getItem('authToken');
//         if (!authToken) {
//           setError('Authentication token not found. Please log in.');
//           return;
//         }
//         const config = { headers: { 'Authorization': `Bearer ${authToken}` } };
//         const response = await axios.get('https://backend-2-rngp.onrender.com/api/payment/fetch', config);
//         setOrders(response.data.orders);
//       } catch (err) {
//         let errorMessage = 'An unexpected error occurred.';
//         if (err.response) {
//           errorMessage = `Error: ${err.response.status} - ${err.response.data.message || 'Server error'}`;
//         } else if (err.request) {
//           errorMessage = 'Network error. Please check your connection.';
//         }
//         setError(errorMessage);
//       }
//     };
//     fetchPayments();
//   }, []);

//     useEffect(() => {
//     dispatch(fetchAdminOrders({ page: 1, pageSize: 10 }));
//   }, [dispatch]);

//   return (
//     <Layout className="min-h-screen bg-gray-100">
//       <Content className="p-4 sm:p-6 lg:p-8">
//         <Row gutter={[24, 24]}>
//           {/* Top Summary Cards */}
//           <Col xs={24} sm={8}><Card className="bg-blue-50 border-blue-200"><Statistic title={<span className="text-gray-600">TOTAL SALES</span>} value={9568.19} precision={2} prefix={<DollarOutlined />} valueStyle={{ color: '#3f83f8', fontWeight: 'bold' }} suffix={<ArrowUpOutlined />} /></Card></Col>
//           <Col xs={24} sm={8}><Card className="bg-yellow-50 border-yellow-200"><Statistic title={<span className="text-gray-600">TOTAL EARNINGS</span>} value={4593.36} precision={2} prefix={<DollarOutlined />} valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }} suffix={<ArrowUpOutlined />} /></Card></Col>
//           <Col xs={24} sm={8}><Card className="bg-purple-50 border-purple-200"><Statistic title={<span className="text-gray-600">TOTAL ORDERS</span>} value={orders.length} prefix={<ShoppingCartOutlined />} valueStyle={{ color: '#8b5cf6', fontWeight: 'bold' }} suffix={<ArrowUpOutlined />} /></Card></Col>

//           {/* Main Content & Sidebar Row */}
//           <Col xs={24} lg={16}>
//             <Row gutter={[24, 24]}>
//               {/* Earning Analytics */}
//               <Col span={24}><Card title="Earning Analytics" extra={<Button>Monthly</Button>}><div style={{ height: 300 }}><ResponsiveContainer width="100%" height="100%"><LineChart data={earningData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000}k`} /><Tooltip /><Line type="monotone" dataKey="Earning" stroke="#82ca9d" strokeWidth={3} activeDot={{ r: 8 }} /></LineChart></ResponsiveContainer></div></Card></Col>
//               {/* Top Selling Products */}
//               <Col span={24}><Card title="Top Selling Products" extra={<Dropdown overlay={menu} trigger={['click']}><Button>This Week</Button></Dropdown>}><Table columns={productColumns} dataSource={topSellingProducts} pagination={false} className="overflow-x-auto" /></Card></Col>
//             </Row>
//           </Col>

//           {/* Right Sidebar */}
//           <Col xs={24} lg={8}>
//             <Row gutter={[24, 24]}>
//               {/* Mode of Order */}
//               <Col span={24}>
//                 <Card title="Mode of Order">
//                   <div className="relative" style={{ height: 200 }}>
//                     <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={modeOfOrderData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={2} dataKey="value" startAngle={90} endAngle={450}>{modeOfOrderData.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />))}</Pie></PieChart></ResponsiveContainer>
//                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><p className="text-3xl font-bold text-gray-800">30%</p></div>
//                   </div>
//                   <div className="flex justify-center items-center mt-4 space-x-6 text-sm">
//                     <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-300 mr-2"></span>Online orders</div>
//                     <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-gray-800 mr-2"></span>Store orders</div>
//                   </div>
//                 </Card>
//               </Col>
//               {/* SIDEBAR SE RECENT ORDERS LIST HATA DIYA GAYA HAI */}
//             </Row>
//           </Col>
//         </Row>
        
//         {/* ✅ Nayi Row, Full Width Recent Orders Table ke liye */}
//         <Row gutter={[24, 24]} className="mt-6">
//            <Col span={24}>
//              <Card title="Recent Orders">
//                <Table
//                  columns={orderColumns}
//                  dataSource={orders}
//                  pagination={false}
//                  className="overflow-x-auto"
//                  rowKey="_id" 
//                />
//              </Card>
//            </Col>
//         </Row>

//       </Content>
//     </Layout>
//   );
// };

// export default HomeAdmin;
import { Layout, Row, Tag, Col, Card, Statistic, Table, Alert, Button, Dropdown, Menu, Avatar } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import 'antd/dist/reset.css';
import React, { useEffect, useState } from 'react';
// ✅ अपने Redux थंक को सही पाथ से इम्पोर्ट करें
import { fetchAdminOrders } from '../../store/slices/paginationSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const { Content } = Layout;

// --- STATIC DATA AND CONFIGS --- (इनमें कोई बदलाव नहीं)
// मान लीजिए यह आपका असली ऑर्डर डेटा है






/*
यह `earningData` को इस तरह बनाएगा:
[
  { name: 'Jan', Earning: 1200 },
  { name: 'Feb', Earning: 2100 },
  { name: 'Mar', Earning: 800 },
  ...
]
*/
const orderColumns = [ { title: 'Order Number', dataIndex: 'orderNumber', key: 'orderNumber', render: (text) => <strong>{text}</strong> }, { title: 'Customer ID', dataIndex: 'user', key: 'user' }, { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amount) => `₹${amount ? amount.toFixed(2) : '0.00'}` }, { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => { let color = status === 'success' ? 'green' : 'volcano'; return <Tag color={color}>{status ? status.toUpperCase() : 'N/A'}</Tag>; } }, { title: 'Date', dataIndex: 'createdAt', key: 'createdAt', render: (date) => new Date(date).toLocaleDateString() }, ];
const modeOfOrderData = [{ name: 'Online', value: 70 }, { name: 'Store', value: 30 }];
const PIE_CHART_COLORS = ['#87CEFA', '#333333'];
const menu = ( <Menu> <Menu.Item key="1">Today</Menu.Item> <Menu.Item key="2">This Week</Menu.Item> <Menu.Item key="3">This Month</Menu.Item> </Menu> );


const HomeAdmin = () => {
  // ✅ STEP 1: लोकल स्टेट को हटाएं, हम Redux का उपयोग करेंगे
  // const [orders, setOrders] = useState([]);
  // const [error, setError] = useState('');

  const dispatch = useDispatch();
  const [payments, setPayments] = useState(null); 
  
  const [earningData1, setEarningData1] = useState([]);
    const [loading1, setLoading1] = useState(true);
  // ✅ STEP 2: Redux स्टेट को सही तरीके से चुनें
  const {
    data: orders, // data प्रॉपर्टी को 'orders' नाम दें ताकि यह समझने में आसान हो
    total,
    currentPage,
    loading,
    error,
  } = useSelector((state) => state.pagination);

  // ✅ STEP 3: टेबल के पेज बदलने के लिए हैंडलर बनाएं
  const handleTableChange = (pagination) => {
    dispatch(fetchAdminOrders({ page: pagination.current, pageSize: pagination.pageSize }));
  };

  // ✅ STEP 4: Ant Design Table के लिए Pagination कॉन्फ़िगरेशन बनाएं
  const paginationConfig = {
    current: currentPage,
    total: total,
    pageSize: 5, // यह आपके API की लिमिट से मेल खाना चाहिए
  };

  const productColumns = [ { title: 'PRODUCT', dataIndex: 'product', key: 'product', render: (text, record) => ( <div className="flex items-center"> <Avatar src={record.img} shape="square" size="large" /> <span className="ml-4 font-medium">{text}</span> </div> ) }, { title: 'PRICE', dataIndex: 'price', key: 'price', render: (price) => `$${price}` }, { title: 'ORDERS', dataIndex: 'orders', key: 'orders' }, { title: 'STOCK', dataIndex: 'stock', key: 'stock' }, { title: 'AMOUNT', dataIndex: 'amount', key: 'amount', render: (amount) => `$${amount.toLocaleString()}` }, ];

  // ✅ STEP 5: सिर्फ एक useEffect रखें जो Redux एक्शन को dispatch करे
  useEffect(() => {
    dispatch(fetchAdminOrders({ page: 1, pageSize: 5 }));
  }, [dispatch]);




useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://backend-2-rngp.onrender.com/api/payment/fetchAdmin', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // API से मिले डेटा को स्टेट में सेव करें
        setPayments(response.data);
        console.log("Fetched Data:", response.data); // डेटा को यहाँ लॉग करें

        // --- डेटा प्रोसेसिंग का लॉजिक अब यहाँ है ---
        // सुनिश्चित करें कि response.data.orders मौजूद है
        if (response.data && response.data.orders) {
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const monthlyTotals = {};

          response.data.orders.forEach(order => {
            if (order.status === 'success') {
              const orderDate = new Date(order.createdAt);
              const monthIndex = orderDate.getMonth();
              const monthName = monthNames[monthIndex];

              if (monthlyTotals[monthName]) {
                monthlyTotals[monthName] += order.amount;
              } else {
                monthlyTotals[monthName] = order.amount;
              }
            }
          });

          const processedData = monthNames.map(month => ({
            name: month,
            Earning: monthlyTotals[month] || 0
          }));
          
          // चार्ट के लिए तैयार डेटा को उसकी स्टेट में सेव करें
          setEarningData1(processedData);
        }

        console.log(earningData1,"e")

      } catch (err) {
        console.error("Failed to fetch payments:", err);
      } finally {
        setLoading1(false); // डेटा लोड हो गया या एरर आया, लोडिंग बंद करें
      }
    };

    fetchPayments();
  }, []); // [

  if (loading1) {
    return <div>Loading analytics...</div>;
  }
  // 1. महीनों के नाम का ऐरे ताकि X-axis पर क्रम सही रहे

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-4 sm:p-6 lg:p-8">
        <Row gutter={[24, 24]}>
          {/* Top Summary Cards */}
          <Col xs={24} sm={8}><Card className="bg-blue-50 border-blue-200"><Statistic title={<span className="text-gray-600">TOTAL SALES</span>} value={9568.19} precision={2} prefix={<DollarOutlined />} valueStyle={{ color: '#3f83f8', fontWeight: 'bold' }} suffix={<ArrowUpOutlined />} /></Card></Col>
          <Col xs={24} sm={8}><Card className="bg-yellow-50 border-yellow-200"><Statistic title={<span className="text-gray-600">TOTAL EARNINGS</span>} value={4593.36} precision={2} prefix={<DollarOutlined />} valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }} suffix={<ArrowUpOutlined />} /></Card></Col>
          {/* ✅ 'TOTAL ORDERS' को Redux के 'total' से लिंक करें */}
          <Col xs={24} sm={8}><Card className="bg-purple-50 border-purple-200"><Statistic title={<span className="text-gray-600">TOTAL ORDERS</span>} value={total} prefix={<ShoppingCartOutlined />} valueStyle={{ color: '#8b5cf6', fontWeight: 'bold' }} /></Card></Col>

          {/* ... बाकी का UI ... */}
 <Col xs={24} lg={16}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="Earning Analytics" extra={<Button>Monthly</Button>}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={earningData1} // अब यहाँ earningData स्टेट का इस्तेमाल करें
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Earning" stroke="#82ca9d" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        {/* ... आपका बाकी का कोड */}
      </Row>
    </Col>
          <Col xs={24} lg={8}><Row gutter={[24, 24]}><Col span={24}><Card title="Mode of Order"><div className="relative" style={{ height: 200 }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={modeOfOrderData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={2} dataKey="value" startAngle={90} endAngle={450}>{modeOfOrderData.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />))}</Pie></PieChart></ResponsiveContainer><div className="absolute inset-0 flex items-center justify-center pointer-events-none"><p className="text-3xl font-bold text-gray-800">30%</p></div></div><div className="flex justify-center items-center mt-4 space-x-6 text-sm"><div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-300 mr-2"></span>Online orders</div><div className="flex items-center"><span className="w-3 h-3 rounded-full bg-gray-800 mr-2"></span>Store orders</div></div></Card></Col></Row></Col>
        </Row>
        
        {/* ✅ फुल विड्थ रीसेंट ऑर्डर्स टेबल को अपडेट करें */}
        <Row gutter={[24, 24]} className="mt-6">
           <Col span={24}>
             <Card title="Recent Orders">
               {/* एरर हैंडलिंग */}
               {error && <Alert message={`Error: ${error}`} type="error" closable className="mb-4" />}

               <Table
                 columns={orderColumns}
                 // ✅ dataSource को Redux से मिले 'orders' से लिंक करें
                 dataSource={orders}
                 rowKey="_id"
                 // ✅ pagination को अपने बनाए कॉन्फ़िगरेशन से लिंक करें
                 pagination={paginationConfig}
                 // ✅ loading स्टेट को लिंक करें
                 loading={loading}
                 // ✅ onChange हैंडलर को लिंक करें
                 onChange={handleTableChange}
                 className="overflow-x-auto"
               />
             </Card>
           </Col>
        </Row>

      </Content>
    </Layout>
  );
};

export default HomeAdmin;