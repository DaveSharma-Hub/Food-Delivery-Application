import { useEffect, useReducer } from 'react';
import usePostLoggin from "../../mutations/customers/usePostLoggin";
import { useNavigate } from 'react-router-dom';

export default function Login({}){
    const history = useNavigate();
    const [customerLogin, {data, loading, error}] = usePostLoggin();
    const [userLogginInfo, setUserLoginInfo] = useReducer((acc:any,curr:any)=>{
        acc[curr.info] = curr.value;
        return acc;
    },{});
    useEffect(() => {
        if(data && data.loggedIn==='true' && data.id){
            history('/home');
        }
    }, [data])

    if(error) return <h1>Error...</h1>
    if(loading) return <h1>Loading...</h1>

    const handleSubmitLoggin = () => {
        customerLogin({
            variables:{
                username:userLogginInfo.username,
                password:userLogginInfo.password,
                userType:'CUSTOMER'
            }
        })
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
                            required
                            />
                    </div>
                </div>
                <div className="flex justify-evenly py-5 mx-auto">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-0.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>

                    <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Sign Up</button>
                </div>
            </form>
        </div>
    )
}