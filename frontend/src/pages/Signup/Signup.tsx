import { FormEvent, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostSignupCustomer from '../../mutations/customers/usePostSignup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function Signup({}){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [signupData, setSignupData] = useReducer((acc: any,curr: any)=>{
        acc[curr.info] = curr.value;
        return acc;
    },{});
    const [customerSignup, {data,error,loading}] = usePostSignupCustomer();
    
    const history = useNavigate();

    const handleSubmitSignup = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data } = await customerSignup({
            variables:{
                username:signupData.username,
                password:signupData.password,
                firstName:signupData.firstName,
                lastName:signupData.lastName,
                userType:signupData.userType
            }
        });
        console.log(data)
        if(data?.customerSignup && data?.customerSignup.loggedIn==='true' && data?.customerSignup.id){
            localStorage.setItem('id',data.customerSignup.id);
            localStorage.setItem('username',signupData.username);
            history('/home');
        }else{
            alert('Incorrect Username or Password');
        }
    }

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };

    if(error) return <h1>Error</h1>
    // if(loading) return <h1>Loading...</h1>

    


    return(
        <div className="w-5/5">
        <form onSubmit={handleSubmitSignup} className="w-5/12 mx-auto mt-40 shadow-2xl px-10 py-10">
            <div className="inline">
                <div >
                    <label htmlFor='firstname' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name:</label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="firstname"
                        onChange={(e)=>{setSignupData({
                            info:'firstName',
                            value:e.target.value
                        })}}
                        required
                    />
                </div>
                <div >
                    <label htmlFor='lastname' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name:</label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="lastname"
                        onChange={(e)=>{setSignupData({
                            info:'lastName',
                            value:e.target.value
                        })}}
                        required
                    />
                </div>
                <div >
                    <label htmlFor='username' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="username"
                        onChange={(e)=>{setSignupData({
                            info:'username',
                            value:e.target.value
                        })}}
                        required
                    />
                </div>
                <div >
                    <label htmlFor='password' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="password" 
                        onChange={(e)=>{setSignupData({
                            info:'password',
                            value:e.target.value
                        })}}
                        type="password"
                        required
                        />
                </div>
            </div>
            <div>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={()=>{
                        setAnchorEl(null);
                    }}
                    >
                    <MenuItem onClick={(e)=>{
                        setSignupData({
                            info:'userType',
                            value:'CUSTOMER'
                        })
                        setAnchorEl(null);

                        }}>Customer</MenuItem>
                    <MenuItem onClick={(e)=>{setSignupData({
                            info:'userType',
                            value:'DRIVER'
                        })
                        setAnchorEl(null);

                        }}>Driver</MenuItem>
                </Menu>
            </div>
            <div className="flex justify-evenly py-5 mx-auto">
                <button 
                    onClick={handleProfileMenuOpen}
                    type="button" 
                    className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-0.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black"
                >
                    User type
                </button>
            </div>
            
            <div className="flex justify-evenly py-5 mx-auto">
                <button type="submit" className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-0.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black">Create Account</button>

                <button 
                    type="button" 
                    className="text-black bg-white hover:bg-white-800 focus:ring-4 focus:outline-black focus:ring-black-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-black-800"
                    onClick={()=>{
                        history('/login')
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
    )
}