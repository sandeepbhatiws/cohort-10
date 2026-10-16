import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import iziToast from "izitoast";
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../ContextAPI';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

// Same rules as the User model in backend
const validators = {
  name: (value) => {
    if (!value.trim()) return 'Name is required';
    if (!/^[a-zA-Z ]{2,15}$/.test(value.trim())) return 'Name should contain only letters and spaces (2-15 characters)';
    return '';
  },
  email: (value) => {
    if (!value.trim()) return 'Email is required';
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value.trim())) return 'Please enter a valid email address';
    return '';
  },
  mobile_number: (value) => {
    if (value.trim() && !/^[0-9]{8,15}$/.test(value.trim())) return 'Mobile number should contain 8-15 digits';
    return '';
  },
  age: (value) => {
    if (!value.trim()) return '';
    if (!/^[0-9]+$/.test(value.trim()) || Number(value) < 18 || Number(value) > 100) return 'Age should be a whole number between 18 and 100';
    return '';
  },
  gender: (value) => {
    if (value && !genderOptions.some((option) => option.value == value)) return 'Please select a valid gender';
    return '';
  },
  address: (value) => {
    if (value.trim().length > 200) return 'Address should not be more than 200 characters';
    return '';
  },
};

const emptyForm = { name: '', email: '', mobile_number: '', age: '', gender: '', address: '' };

export default function UpdateProfile() {

  const { isLogin, logout } = useContext(GlobalContext);
  let navigate = useNavigate();

  let [formData, setFormData] = useState(emptyForm);
  let [errors, setErrors] = useState({});
  let [loading, setLoading] = useState(true);
  let [submitting, setSubmitting] = useState(false);

  const authHeader = { headers: { Authorization: `Bearer ${isLogin}` } };

  const errorHandler = (error) => {
    if (error.response?.status == 401) {
      logout();
      navigate('/');
      iziToast.error({
        title: "Session Expired",
        message: "Please login again.",
        position: "topRight",
      });
      return;
    }

    iziToast.error({
      title: "Error",
      message: "Something went wrong !",
      position: "topRight",
    });
  }

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}user/view-profile`, {}, authHeader)
      .then((result) => {
        if (result.data._status == true) {
          // Keep every value as a string (age comes as number) so validators can trim it
          let profileData = {};
          for (let key in emptyForm) {
            profileData[key] = String(result.data._data[key] ?? '');
          }
          setFormData(profileData);
        } else {
          iziToast.error({
            title: "Error",
            message: result.data._message,
            position: "topRight",
          });
        }
      })
      .catch(errorHandler)
      .finally(() => setLoading(false))
  }, [])

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validators[name](value) });
  }

  const formHandler = (event) => {
    event.preventDefault();

    let newErrors = {};

    for (let key in validators) {
      const message = validators[key](formData[key]);
      if (message) {
        newErrors[key] = message;
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const data = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      mobile_number: formData.mobile_number.trim(),
      age: formData.age.trim(),
      gender: formData.gender,
      address: formData.address.trim(),
    }

    setSubmitting(true);

    axios.put(`${import.meta.env.VITE_API_URL}user/update-profile`, data, authHeader)
      .then((result) => {
        if (result.data._status == true) {
          iziToast.success({
            title: "Success",
            message: result.data._message,
            position: "topRight",
          });

          navigate('/profile');
        } else {
          // Field wise errors from backend (e.g. email already in use)
          const serverErrors = result.data._error ?? {};
          setErrors(serverErrors);

          iziToast.error({
            title: "Error",
            message: Object.values(serverErrors)[0] ?? result.data._message,
            position: "topRight",
          });
        }
      })
      .catch(errorHandler)
      .finally(() => setSubmitting(false))
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter email address' },
    { name: 'mobile_number', label: 'Mobile Number', type: 'text', placeholder: 'Enter mobile number (optional)' },
    { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age (optional)' },
    { name: 'gender', label: 'Gender', type: 'select' },
    { name: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter your address (optional)' },
  ];

  return (
    <>
      <section className="w-full">

        {/* Breadcrumb */}
        <nav
          className="flex border-b bg-white px-6 py-3 shadow-sm"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-2 text-gray-600">
            <li>
              <Link to="/dashboard" className="text-md font-medium hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li>/</li>

            <li>
              <Link to="/profile" className="text-md font-medium hover:text-indigo-600">
                Profile
              </Link>
            </li>
            <li>/</li>

            <li aria-current="page">
              <span className="text-md font-semibold text-gray-900">
                Update Profile
              </span>
            </li>
          </ol>
        </nav>

        {/* BODY */}
        <div className="w-full min-h-[680px] px-4 bg-slate-50 py-10">
          <div className="mx-auto">

            <h3 className="text-[24px] font-semibold
            bg-gradient-to-r from-indigo-600 to-indigo-500
            py-3 px-5 rounded-t-lg text-white border border-indigo-500">
              Update Profile
            </h3>

            <form onSubmit={formHandler} noValidate className="border border-slate-200 border-t-0 bg-white p-6 rounded-b-lg shadow-sm">

              {
                loading
                  ?
                  <p className="text-gray-500">Loading profile...</p>
                  :
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                      {
                        fields.map((field) => {
                          const inputClass = `text-[17px] border text-gray-900 rounded-lg bg-white
                          focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500
                          block w-full py-2.5 px-3
                          ${errors[field.name] ? 'border-red-400' : 'border-slate-300'}`;

                          return (
                            <div className={`mb-6 ${field.type == 'textarea' ? 'md:col-span-2' : ''}`} key={field.name}>
                              <label className="block mb-2 text-md font-medium text-gray-700">
                                {field.label}
                              </label>

                              {
                                field.type == 'select'
                                  ?
                                  <select
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={changeHandler}
                                    className={inputClass}
                                  >
                                    <option value="">Select gender (optional)</option>
                                    {
                                      genderOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                      ))
                                    }
                                  </select>
                                  :
                                  field.type == 'textarea'
                                    ?
                                    <textarea
                                      name={field.name}
                                      rows={3}
                                      maxLength={200}
                                      value={formData[field.name]}
                                      onChange={changeHandler}
                                      className={inputClass}
                                      placeholder={field.placeholder}
                                    />
                                    :
                                    <input
                                      type={field.type}
                                      name={field.name}
                                      value={formData[field.name]}
                                      onChange={changeHandler}
                                      autoComplete="off"
                                      className={inputClass}
                                      placeholder={field.placeholder}
                                    />
                              }

                              {errors[field.name] && (
                                <p className="text-red-600 text-sm mt-1">
                                  {errors[field.name]}
                                </p>
                              )}
                            </div>
                          )
                        })
                      }
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="mt-3 cursor-pointer text-white
                        bg-indigo-600 hover:bg-indigo-700
                        focus:ring-4 focus:ring-indigo-300 disabled:opacity-60 disabled:cursor-not-allowed
                        font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all"
                      >
                        {submitting ? 'Updating...' : 'Update'}
                      </button>

                      <Link
                        to="/profile"
                        className="mt-3 text-gray-700 bg-white border border-slate-300 hover:bg-slate-100
                        font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all"
                      >
                        Cancel
                      </Link>
                    </div>
                  </>
              }

            </form>
          </div>
        </div>
      </section>
    </>
  )
}
