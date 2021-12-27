import React from 'react';
import { v4 as uuid4} from 'uuid';
import axios from 'axios';
import { Button, Alert } from 'antd';
import './login.css';
import { useNavigate} from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState();
    const [error,setError] = React.useState(false)
    const uuid = uuid4()
    const url = 'http://localhost:8000'
    const headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    const handlePostRequest =()=>{
        setLoading(true)
        axios({
            method: 'post',
            url: `${url}/chat`,
            data: {id: uuid, chat:[]},
            headers: headers,
            withCredentials: false

        })
        .then((res)=>{
                 console.log(res.data);
                navigate(`/${res.data.id}`)
         }).catch((err)=>{
            setError(true)
         }).finally(()=>{
            setLoading(false)
         })
    }
 
    return (
        <div>
            {error&&<Alert message="Network Error" type="error" />}
            <h1>Encrypyed Chat App</h1>
            <Button style={{marginTop: '30vh'}} type="primary" loading={loading} onClick={handlePostRequest}>START</Button>
        </div>
    );
};

export default Login;