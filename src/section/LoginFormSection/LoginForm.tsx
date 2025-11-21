import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSchema, LoginFormData } from '../../validation/LoginFormValidation/LoginFormValidation';
import InputField from '../../components/CustomInputFieldLogin/CustomInputLogin';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    remeberMe: false,
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  //load saved email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('remeberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail,remeberMe: true }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value,type, checked } = e.target;
    const fieldValue = type ==='checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    
    // Clear error when user starts typing
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<LoginFormData> = {};
      result.error.issues.forEach((error: any) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as keyof LoginFormData] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (result.data.remeberMe) {
      localStorage.setItem('remeberedEmail', result.data.email);
    } else {
      localStorage.removeItem('remeberedEmail');
    }

    // Handle successful login
    console.log('Login data:', result.data);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Enter your password"
      />

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="remeberMe"
          name="remeberMe"
          checked={formData.remeberMe}
          onChange={handleChange}
          className="mr-2"
          />
          <label htmlFor="remebrMe" className="text-sm text-gray-700">
            Remenber me
          </label>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
      >
        Login
      </button>
    </form>
  );
};
