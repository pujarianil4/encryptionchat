import React from 'react';
import { v4 as uuid4} from 'uuid';
import axios from 'axios';
import './login.css';
import { useNavigate} from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()
    const uuid = uuid4()
    const url = 'http://localhost:8000'
    const headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    const handlePostRequest =()=>{
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
         })
    }
 
    return (
        <div>
            <button onClick={handlePostRequest}>START</button>
        </div>
    );
};

export default Login;