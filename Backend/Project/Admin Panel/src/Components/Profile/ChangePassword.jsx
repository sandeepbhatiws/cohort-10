import axios from 'axios';
import React, { useContext, useState } from 'react'
import iziToast from "izitoast";
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GlobalContext } from '../ContextAPI';

const emptyForm = { current_password: '', new_password: '', confirm_password: '' };

// Same checks as the change-password API, so the user gets feedback before submitting
const validate = (data) => {
  let errors = {};

  if (!data.current_password) {
    errors.current_password = 'Current password is required';
  }

  if (!data.new_password) {
    errors.new_password = 'New password is required';
  } else if (data.current_password && data.new_password == data.current_password) {
    errors.new_password = 'New password must be different from current password';
  }

  if (!data.confirm_password) {
    errors.confirm_password = 'Confirm password is required';
  } else if (data.new_password != data.confirm_password) {
    errors.confirm_password = 'New password and confirm password do not match';
  }

  return errors;
}

export default function ChangePassword() {

  const { isLogin, logout } = useContext(GlobalContext);
  let navigate = useNavigate();

  let [formData, setFormData] = useState(emptyForm);
  let [errors, setErrors] = useState({});
  let [touched, setTouched] = useState({});
  let [showPassword, setShowPassword] = useState({});
  let [submitting, setSubmitting] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    const updated = { ...formData, [name]: value };
    const updatedTouched = { ...touched, [name]: true };

    setFormData(updated);
    setTouched(updatedTouched);

    // Only show errors for fields the user has already typed in
    const allErrors = validate(updated);
    let visibleErrors = {};
    for (let key in allErrors) {
      if (updatedTouched[key]) {
        visibleErrors[key] = allErrors[key];
      }
    }
    setErrors(visibleErrors);
  }

  const formHandler = (event) => {
    event.preventDefault();

    const newErrors = validate(formData);
    setErrors(newErrors);
    setTouched({ current_password: true, new_password: true, confirm_password: true });

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    axios.put(`${import.meta.env.VITE_API_URL}user/change-password`, formData, {
      headers: { Authorization: `Bearer ${isLogin}` }
    })
      .then((result) => {
        if (result.data._status == true) {
          iziToast.success({
            title: "Success",
            message: result.data._message,
            position: "topRight",
          });

          setFormData(emptyForm);
          navigate('/profile');
        } else {
          if (result.data._message == 'Current password is incorrect.') {
            setErrors({ current_password: result.data._message });
          }

          iziToast.error({
            title: "Error",
            message: result.data._message,
            position: "topRight",
          });
        }
      })
      .catch((error) => {
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
      })
      .finally(() => setSubmitting(false))
  };

  const fields = [
    { name: 'current_password', label: 'Current Password', placeholder: 'Enter current password' },
    { name: 'new_password', label: 'New Password', placeholder: 'Enter new password' },
    { name: 'confirm_password', label: 'Confirm New Password', placeholder: 'Re-enter new password' },
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
                Change Password
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
              Change Password
            </h3>

            <form onSubmit={formHandler} noValidate className="border border-slate-200 border-t-0 bg-white p-6 rounded-b-lg shadow-sm">

              {
                fields.map((field) => (
                  <div className="mb-6" key={field.name}>
                    <label className="block mb-2 text-md font-medium text-gray-700">
                      {field.label}
                    </label>

                    <div className="relative">
                      <input
                        type={showPassword[field.name] ? 'text' : 'password'}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={changeHandler}
                        autoComplete={field.name == 'current_password' ? 'current-password' : 'new-password'}
                        className={`text-[17px] border text-gray-900 rounded-lg
                        focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500
                        block w-full py-2.5 pl-3 pr-11
                        ${errors[field.name] ? 'border-red-400' : 'border-slate-300'}`}
                        placeholder={field.placeholder}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword({ ...showPassword, [field.name]: !showPassword[field.name] })}
                        className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer text-gray-500 hover:text-indigo-600"
                        aria-label={showPassword[field.name] ? 'Hide password' : 'Show password'}
                      >
                        {showPassword[field.name] ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                      </button>
                    </div>

                    {errors[field.name] && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))
              }

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-3 cursor-pointer text-white
                  bg-indigo-600 hover:bg-indigo-700
                  focus:ring-4 focus:ring-indigo-300 disabled:opacity-60 disabled:cursor-not-allowed
                  font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all"
                >
                  {submitting ? 'Changing...' : 'Change Password'}
                </button>

                <Link
                  to="/profile"
                  className="mt-3 text-gray-700 bg-white border border-slate-300 hover:bg-slate-100
                  font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all"
                >
                  Cancel
                </Link>
              </div>

            </form>
          </div>
        </div>
      </section>
    </>
  )
}
