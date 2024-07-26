import React,{useState,useContext} from 'react'
import axois from 'axios';
import {AuthContext} from '../components/Authentication/Authentication';
import { NavLink,useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const auth=useContext(AuthContext);
    const Navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password!==confirmPassword){
            return;
        }
        const flag=await SignUp();
        if(!flag){
            alert('User already exists or Error in signing up');
            return;
        }
        setPassword('');
        setEmail('');
        setUsername('');
        setConfirmPassword('');
        Navigate('/');
        // window.location.href = "/";
        // console.log('Form submitted');
    };
    const SignUp = async () => {
        await axois.post('http://localhost:5000/signup', {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }).then((response) => {
            console.log(response.data);
            if(response.data.success){
               // alert(response.data.success);
               console.log(response.data.token);
                auth[0].login(response.data.token);
            }
        }).catch((error) => {
            console.log(error);
        });
        };
  return (
    <div className='Login d-flex flex-column justify-content-center align-items-center'>
        <form onSubmit={handleSubmit} className='Form d-flex flex-column justify-content-center align-items-center  w-75 h-100 gap-2'  style={{
            maxWidth: '600px',
        }} >
            <h1>SignUp</h1>
            <input className='w-75' type="text" placeholder="Username" required
            value={username} onChange={(e) => setUsername(e.target.value)}
            />
            <input className='w-75' type="email" placeholder="Email: @" required
            value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input className='w-75' type="password" placeholder="Password" required
            value={password} onChange={(e) => setPassword(e.target.value)}
            />
             <input className='w-75' type="password" placeholder="Confirm Password" required
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {password!==confirmPassword?<p className='text-danger m-0'>Passwords do not match</p>:null}
            <button className='w-75' type="submit">Sign Up</button>
            <p>Already have an account? <NavLink className="text-white" to='/login'>Login</NavLink></p>
        </form>
    </div>
  )
}

export default SignUp