import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import iziToast from "izitoast";
import { Link, useNavigate } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import { MdLockReset } from "react-icons/md";
import { GlobalContext } from '../ContextAPI';

export default function ViewProfile() {

  const { isLogin, logout } = useContext(GlobalContext);
  let navigate = useNavigate();

  let [profile, setProfile] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}user/view-profile`, {}, {
      headers: { Authorization: `Bearer ${isLogin}` }
    })
      .then((result) => {
        if (result.data._status == true) {
          setProfile(result.data._data);
        } else {
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
      .finally(() => setLoading(false))
  }, [])

  const details = profile
    ? [
      { label: 'Name', value: profile.name },
      { label: 'Email Address', value: profile.email },
      { label: 'Mobile Number', value: profile.mobile_number || '—' },
      { label: 'Role', value: profile.role_type, capitalize: true },
      { label: 'Age', value: profile.age ?? '—' },
      { label: 'Gender', value: profile.gender || '—', capitalize: true },
      { label: 'Address', value: profile.address || '—', fullWidth: true },
    ]
    : [];

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
              <span className="text-md font-medium">
                Profile
              </span>
            </li>
            <li>/</li>

            <li aria-current="page">
              <span className="text-md font-semibold text-gray-900">
                My Profile
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
              My Profile
            </h3>

            <div className="border border-slate-200 border-t-0 bg-white p-6 rounded-b-lg shadow-sm">

              {
                loading
                  ?
                  <p className="text-gray-500">Loading profile...</p>
                  :
                  profile
                    ?
                    <>
                      {/* Profile Header */}
                      <div className="flex items-center gap-5 pb-6 mb-6 border-b border-slate-200">
                        <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600
                        flex items-center justify-center text-[30px] font-bold uppercase">
                          {profile.name?.charAt(0)}
                        </div>

                        <div>
                          <h4 className="text-[22px] font-semibold text-gray-900">
                            {profile.name}
                          </h4>
                          <p className="text-gray-600">{profile.email}</p>

                          <div className="flex gap-2 mt-2">
                            <span className="px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 capitalize">
                              {profile.role_type}
                            </span>
                            <span className={`px-3 py-0.5 rounded-full text-sm font-medium
                            ${profile.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {profile.status ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Profile Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {
                          details.map((item) => (
                            <div key={item.label} className={item.fullWidth ? 'md:col-span-2' : ''}>
                              <label className="block mb-2 text-md font-medium text-gray-700">
                                {item.label}
                              </label>
                              <p className={`text-[17px] border border-slate-200 bg-slate-50 text-gray-900
                              rounded-lg py-2.5 px-3 whitespace-pre-line ${item.capitalize ? 'capitalize' : ''}`}>
                                {item.value}
                              </p>
                            </div>
                          ))
                        }
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 mt-8">
                        <Link
                          to="/profile/update"
                          className="inline-flex items-center gap-2 text-white
                          bg-indigo-600 hover:bg-indigo-700
                          focus:ring-4 focus:ring-indigo-300
                          font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all"
                        >
                          <FaUserEdit size={18} />
                          Update Profile
                        </Link>

                        <Link
                          to="/profile/change-password"
                          className="inline-flex items-center gap-2 text-indigo-700
                          bg-white border border-indigo-300 hover:bg-indigo-50
                          focus:ring-4 focus:ring-indigo-100
                          font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all"
                        >
                          <MdLockReset size={20} />
                          Change Password
                        </Link>
                      </div>
                    </>
                    :
                    <p className="text-gray-500">Profile details not available.</p>
              }

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
