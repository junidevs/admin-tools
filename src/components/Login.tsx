import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../schemas/login';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch } from "../store/store";
import { updateUser } from '../slices/userSlice';

const Login:FC = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState:{ errors } } = useForm({
        mode:'onChange',
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = async (data:any) => {
        console.log(data)
        const response =  await fetch('api/password.html', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const { resText } = await response.json();
        dispatch(updateUser(resText))

    };
    return(
        <>
        <div className="formProvider">
            <h1 className="welcome_h1">Witaj w Admin-Toolsach</h1>
            <div className="inputFields">
            <form onSubmit={handleSubmit(onSubmit)}>
               <input className="inputField" {...register("email")} type="text" placeholder="email" />
               <input className="inputField" {...register("pass")} type="password" placeholder="pass" />
               <input className="inputField inputField--button" type="submit" value="Zaloguj się" />
            </form>
        </div>
        </div>
        </>
    );
}
export default Login;