import { Button, Form, Modal, Input, Radio  } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'

import { UserOutlined } from '@ant-design/icons';


import Title from 'antd/es/typography/Title';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const UserManagement = () => {

  const [getUser, setGetUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const getUsers= async ()=>{
    try {
      const data = await axios.get("http://localhost:8000/api/admin/get-users");
      if(data.status == 200) setGetUser(data.data);

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

    Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then(async(result) => {

  if (result.isConfirmed) {
    if(data.status === 200){
      console.log("datasupp", data);
      Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
     await getUsers();
    }
   
  }
});


  } catch (error) {
    console.log(error)
  }
}

const handleUpdate =async()=>{

  try {
   await axios.put("http://localhost:8000/api/admin/get-users/" + 3,{
    //  data
    name: name,
    email: email,
    status:role
    }).then(async(item)=>{
      if(item.status === 200){
        console.log('itemUpdate', item);
        setName('');
        setEmail('');
        setRole('');
        setOpenModal(false);
        toast(item.data.message);
        await getUsers();

      }
    });
  
  } catch (error) {
    console.log('error', error);
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


      return (
    <>
      {/* <Header className='text-white'>
        <Title level={3} type='success' className=" uppercase font-semibold flex my-auto ">user management</Title> 
      </Header> */}

      {/* <Table columns={columns} dataSource={data} />; */}
      <table className="min-w-full">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col" className='px-4 py-2'>Name</th>
      <th scope="col" className='px-4 py-2'>Email</th>
      <th scope="col" className='px-4 py-2'>Status</th>
      <th colSpan={3} className='px-4 py-2'>action</th>
    </tr>
  </thead>
  <tbody className="table-group-divider">
  {getUser?.map((item)=>(
    <tr key={item.id} className=' align-baseline'>
      <th scope="row">{item.id}</th>
      <td className='border-2 px-4 py-2'>{item.name}</td>
      <td className='border-2 px-4 py-2'>{item.email}</td>
      <td className='border-2 px-4 py-2 text-center font-bold'>{item.status}</td>
      <td className='border-2 px-4 py-2 text-center font-bold'>
        <span onClick={showModal} className='text-[#fff] bg-blue-700 cursor-pointer mx-3 p-2 rounded-md'>update</span>
        <span className='text-[#fff] bg-red-700 cursor-pointer p-2 rounded-md' onClick={(e)=>deleteUser(item.id, e)}>delete</span>
      </td>
    </tr>
  ))}
    
  </tbody>
</table>
<Modal
        open={openModal}
        title="update"
        className='border-3 border-green-800 shadow-md rounded-md p-3'
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
        <Input placeholder="Name" name='name' value={name} onChange={(e)=> setName(e.target.value)}  className='border-sm border-green-600 rounded-md'/>
      </Form.Item>
      <Form.Item label="Email">
        <Input placeholder="email" name='email' value={email} onChange={(e)=> setEmail(e.target.value)} type='email'  className='border-sm border-green-600 rounded-md'/>
      </Form.Item>
      <Form.Item label="Status">
          <Radio.Group name='status'>
            <Radio value="client" onChange={(e)=>setRole(e.target.value)} className='font-bold'> Client </Radio>
            <Radio value="admin" onChange={(e)=>setRole(e.target.value)} className='font-bold'> Admin </Radio>
          </Radio.Group>
        </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="submit" onClick={handleUpdate} className='bg-blue-800 text-white'>Submit</Button>
      </Form.Item>

    </Form>
</Modal>

    </>
  )
}

export default UserManagement