import { FormEvent, useEffect, useReducer, useState } from 'react';
import usePostLoggin from "../../mutations/customers/usePostLoggin";
import { useNavigate } from 'react-router-dom';
import UserTypeDropdown from '../../components/Dropdown/UserTypeDropdown';

export default function Login({}){
    const history = useNavigate();
    const [customerLogin, {data, loading, error}] = usePostLoggin();
    const [userLogginInfo, setUserLoginInfo] = useReducer((acc:any,curr:any)=>{
        acc[curr.info] = curr.value;
        return acc;
    },{userType:null});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    }
    
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    if(error) return <h1>Error...</h1>

    const handleSubmitLoggin = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {data} = await customerLogin({
            variables:{
                username:userLogginInfo.username,
                password:userLogginInfo.password,
                userType:userLogginInfo.userType
            }
        });

        //console.log(data);
        if(data?.customerLogin && data?.customerLogin.loggedIn==='true' && data?.customerLogin.id){
            localStorage.setItem('id',data.customerLogin.id);
            localStorage.setItem('username',userLogginInfo.username);
            history('/home');
        }else{
            alert('Incorrect Username or Password');
        }
    }

    return(
        <div className="w-5/5">
            <form onSubmit={handleSubmitLoggin} className="w-5/12 mx-auto mt-40 shadow-2xl px-10 py-10">
                <div className="inline">
                    <div >
                        <label htmlFor='username' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            id="username"
                            onChange={(e)=>{setUserLoginInfo({
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
                            onChange={(e)=>{setUserLoginInfo({
                                info:'password',
                                value:e.target.value
                            })}}
                            type="password"
                            required
                            />
                    </div>
                    <div>
                        <UserTypeDropdown 
                            handleSetData={(i:any)=>{setUserLoginInfo(i)}}
                            handleClose={handleProfileMenuClose}
                            anchorValue={anchorEl}
                        />
                    </div>
                     <div className="flex justify-evenly py-5 mx-auto">
                        <button 
                            onClick={handleProfileMenuOpen}
                            type="button" 
                            className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-0.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black"
                        >
                            {
                                userLogginInfo.userType ? userLogginInfo.userType : "User type"
                            }
                        </button>
                    </div>
                </div>
                <div className="flex justify-evenly py-5 mx-auto">
                    <button type="submit" className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-0.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black">Login</button>

                    <button 
                        onClick={()=>{
                            history('/signup');
                        }}
                        type="button" 
                        className="text-black bg-white hover:bg-white-800 focus:ring-4 focus:outline-black focus:ring-black-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-black-800"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}