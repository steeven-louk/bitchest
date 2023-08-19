import { Button, Form, Modal, Input, Radio  } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'

import { UserOutlined } from '@ant-design/icons';


import Title from 'antd/es/typography/Title';
import axios from 'axios';

const UserManagement = () => {

  const [getUser, setGetUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  // const columns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //     render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: 'Age',
  //     dataIndex: 'age',
  //     key: 'age',
  //   },
  //   {
  //     title: 'Address',
  //     dataIndex: 'address',
  //     key: 'address',
  //   },
  //   {
  //     title: 'Tags',
  //     key: 'tags',
  //     dataIndex: 'tags',
  //     render: (_, { tags }) => (
  //       <>
  //         {tags.map((tag) => {
  //           let color = tag.length > 5 ? 'geekblue' : 'green';
  //           if (tag === 'loser') {
  //             color = 'volcano';
  //           }
  //           return (
  //             <Tag color={color} key={tag}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
  //   {
  //     title: 'Action',
  //     key: 'action',
  //     render: (_, record) => (
  //       <Space size="middle">
  //         <a> <Switch checkedChildren="user" unCheckedChildren="admin" defaultChecked className='bg-gray-800'/></a>
  //         <a className='text-[#ff0000]'>Delete</a>
  //       </Space>
  //     ),
  //   },
  // ];
  // const data = [
  //   {
  //     key: getUser.id,
  //     name: getUser.name,
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //     tags: ['loser'],
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];

  const getUsers= async ()=>{
    try {
      const data = await axios.get("http://localhost:8000/api/admin/get-users");
      if(data.status == 200) setGetUser(data.data);
      console.log('use',data)
    } catch (error) {
      console.log(error)
    }
  
   }
useEffect(() => {
 getUsers();
}, []);

const showModal = () => {
  setOpenModal(true);
};
const handleCancel = () => {
  setOpenModal(false);
};

const deleteUser = async(id,e)=>{
  e.preventDefault();
  try {
    const data = await axios.delete("http://localhost:8000/api/admin/get-users/" + id);
    if(data.status == 200){
      console.log("datasupp", data);
     await getUsers();
    }
  } catch (error) {
    console.log(error)
  }
}

const handleUpdate =async()=>{
  try {
    const data = await axios.put("http://localhost:8000/api/admin/get-users/" + id,{
      name: name,
      email: email,
      role:role
    })
    console.log(data);
  } catch (error) {
    console.log('error', error)
  }
}

const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;

console.log(role)
return (
    <>
      <Header className='text-white'>
        <Title level={3} type='success' className=" uppercase font-semibold my-auto block">user management</Title> 
      </Header>

      {/* <Table columns={columns} dataSource={data} />; */}
      <table className="table w-[100%]">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Status</th>
      <th colSpan={3}>action</th>
    </tr>
  </thead>
  <tbody className="table-group-divider">
  {getUser?.map((item)=>(
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.status}</td>
      <td>
        <span className='text-blue-700 cursor-pointer '>view</span>
        <span onClick={showModal} className='text-green-700 cursor-pointer mx-3'>update</span>
        <span className='text-[#ff0000] cursor-pointer' onClick={(e)=>deleteUser(item.id, e)}>delete</span>
      </td>
    </tr>
  ))}
    
  </tbody>
</table>
<Modal
        open={openModal}
        title="update user"
        // onOk={()=>{}}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
        ]}
      >
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
      onValuesChange={onFormLayoutChange}
      style={{
        maxWidth: formLayout === 'inline' ? 'none' : 600,
      }}
    >

      <Form.Item label="Name">
        <Input placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}  className='border-sm border-green-600 rounded-md'/>
      </Form.Item>
      <Form.Item label="Email">
        <Input placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)} type='email'  className='border-sm border-green-600 rounded-md'/>
      </Form.Item>
      <Form.Item label="Status">
          <Radio.Group>
            <Radio value="client" onChange={(e)=>setRole(e.target.value)} className='font-bold'> Client </Radio>
            <Radio value="admin" onChange={(e)=>setRole(e.target.value)} className='font-bold'> Admin </Radio>
          </Radio.Group>
        </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="submit" onClick={handleUpdate()} className='bg-blue-800 text-white'>Submit</Button>
      </Form.Item>

    </Form>
</Modal>

    </>
  )
}

export default UserManagement