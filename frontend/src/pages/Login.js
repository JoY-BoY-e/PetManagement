import React,{useState,useContext} from 'react'
import axois from 'axios';
import {AuthContext} from '../components/Authentication/Authentication';
import { NavLink } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth=useContext(AuthContext);
    // const Navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const flag = await Signin();
        if(flag){setPassword('');
        setEmail('');
        // Navigate('/');
        window.location.href = "/";
        }
        else alert('Invalid Email or Password');

        // console.log('Form submitted');
    };
    const Signin = async () => {
        var fl=false;
        await axois.post('http://localhost:5000/login', {
            email: email,
            password: password
        }).then((response) => {
            console.log(response.data);
            if(response.data.success){
               // alert(response.data.success);
            //    console.log(response.data.token);
                auth[0].login(response.data.token);
                fl= true;
            }
        }).catch((error) => {
            console.log(error);
        });
        return fl;
    };
  return (
    <div className='Login d-flex flex-column justify-content-center align-items-center'>
        <form onSubmit={handleSubmit} className='Form d-flex flex-column justify-content-center align-items-center w-75 h-100 gap-2' style={{
            maxWidth: '600px',
        }} >
            <h1 className=''>Login</h1>
            <input className='w-75' type="email" placeholder="Email: @" required
            value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input className='w-75' type="password" placeholder="Password" required
            value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button className='w-75' type="submit">Sign In</button>
            <p>Don't have an account? <NavLink className="text-white" to='/signup'>Register</NavLink></p>
        </form>
    </div>
  )
}

export default Login