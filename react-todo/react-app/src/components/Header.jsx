import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

const Header=()=> {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
  const logoutHandler = async () => {
    setLoading(true);
    try {
      const {data} = await axios.get(
        `${server}/users/logout`,
        {
          withCredentials: true,
        }
      );
      
      if(data.success){
        toast.success("Logged out successfully");
        setIsAuthenticated(false);
        setLoading(false);
      }else{
        toast.error("Error");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      setIsAuthenticated(true);
    }
  };
  return (
    <nav className='header'>
        <div>
            <h2>Todo App</h2>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {
            isAuthenticated ? (<button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>)
            :
            (<Link to={"/login"}>Login</Link>)
            }
        </article>
    </nav>
  )
}

export default Header

