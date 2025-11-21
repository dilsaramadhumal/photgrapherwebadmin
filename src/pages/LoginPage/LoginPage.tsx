"use client";
import { LoginForm } from '../../section/LoginFormSection/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-blue_light_10">
      {/*logo*/}
      <div className='mb-4'>
        <img src="/src/assets/react.svg" alt="Logo" className="w-20 h-20" />
      </div>
      
      <h1 className="items-center text-4xl font-bold text-blue_dark">
        Login
      </h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
