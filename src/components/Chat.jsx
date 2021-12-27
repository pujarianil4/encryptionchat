import axios from 'axios';
import { Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button,Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import CryptoJS from 'crypto-js'
import './Chat.css';
const Chat = () => {
    const [chat, setChat]= useState([])
    const [name, setname] = useState('')
    const [input, setInput]= useState('')
    const [key, setkey] = useState('')
   const [session, setSession] = useState(false)
   const [error, setError] = useState(false)
   const url = 'http://localhost:8000'
    const {id} = useParams()
    const getSessionName = window.sessionStorage.getItem("name")
    const getSessionkey = window.sessionStorage.getItem("key")

   const headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }

    const handleGetRequest =()=>{
        //axios.get(`https://4ve50.sse.codesandbox.io/chat/${id}`, {headers} )
        axios({
            method: 'get',
            url: `${url}/chat/${id}`,
            headers: headers,
            withCredentials: false

        })
        .then((res)=>{
            setChat(res.data.chat)
            console.log(res.data.chat);
        }).catch((error)=>{
            setError(true)
        })
    }

    const handlePostReq = ()=>{
        //axios.patch(`https://4ve50.sse.codesandbox.io/chat/${id}`,
        axios({
            method: 'patch',
            url: `${url}/chat/${id}`,
            data:  {
                chat: chat
            },
            headers: headers,
            withCredentials: false

        })
        .then((res)=>{
               console.log(res);
        })
    }
const handleChat = ()=> {
    //var ciphertext = CryptoJS.AES.encrypt( value, getSessionkey).toString();
   const obj = {
       msg: input,
       name: getSessionName ,
       time: new Date().toLocaleTimeString()
   }
   var cipherData = CryptoJS.AES.encrypt(JSON.stringify(obj), getSessionkey).toString();
   setChat([...chat,cipherData])
}
    useEffect(()=>{
        if(session){
        
            handleGetRequest()
            setError(false)
        }
        
    },[session])

    useEffect(()=> {
    console.log(getSessionName, getSessionkey);
    if(getSessionName, getSessionkey){
        setSession({name: getSessionName, key: getSessionkey})
    }
    },[])

    useEffect(()=>{
        if(session){
            handlePostReq()
            setError(false)
        }
        
    },[chat])

   
      const handleOk = () => {
        setSession(true)
        window.sessionStorage.setItem("name", name );
        window.sessionStorage.setItem("key", key );

      };
    
      const handleCancel = () => {
        setError(true)
      };
   
    return (
        <>
        {error&&<Alert message= 'Something is wrong. Try again !' type="error" />}
        {
            session?<div className='chat_container'>
            <div className='header'>
                <h1>Encrypted Chat</h1>
            </div>
            <div className='chat'>
             {
                 chat.map((item, i)=> <Msg key={i} encrypt={item}/>)
             }
            </div>
          
           <Input.Group compact>
      <Input onChange={(e)=> setInput(e.target.value)} style={{ width: 'calc(100% - 80px)' , textAlign: 'left'}} placeholder='Type Message' />
      <Button onClick={handleChat} type="primary">SEND</Button>
    </Input.Group>
        </div>:
         <Modal title="ADD YOUR SECRET KEY" visible={!session} onOk={handleOk} onCancel={handleCancel}>
         <Input placeholder="Enter Your name" onChange={(e)=> setname(e.target.value)} />
         <Input.Password
      placeholder="Enter Secret Key"
      onChange={(e)=> setkey(e.target.value)}
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
       </Modal>
        }
        
        </>
    );
};

const Msg = React.memo( (props)=>{
const {encrypt} = props;
const getSessionName = window.sessionStorage.getItem("name")
const getSessionkey = window.sessionStorage.getItem("key")
let obj = encrypt
if( typeof encrypt === 'string' ){
    var bytes  = CryptoJS.AES.decrypt(encrypt, getSessionkey);
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
obj = decryptedData
}
const { msg, name, time} = obj;

const style =()=>{
    if(name === getSessionName){
        return {textAlign: "right", color: 'green'}
    }
    return {textAlign: "left", color: 'blue'}
}
    return (
        <>
        <p className='msg'style={style()} > <span>  {msg}  </span>  </p>
        </>
    )
})


export default Chat;