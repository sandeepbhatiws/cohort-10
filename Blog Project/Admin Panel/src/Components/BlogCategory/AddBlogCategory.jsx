import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import iziToast from "izitoast";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../ContextAPI';

// Same rules as the BlogCategory model in backend
const validators = {
  name: (value) => {
    if (!value.trim()) return 'Name is required';
    if (value.trim().length < 2 || value.trim().length > 50) return 'Name should be 2-50 characters';
    return '';
  },
  order: (value) => {
    if (!value.trim()) return 'Order is required';
    if (!/^[0-9]+$/.test(value.trim()) || Number(value) > 1000) return 'Order should be a whole number between 0 and 1000';
    return '';
  },
};

const emptyForm = { name: '', order: '' };

export default function AddBlogCategory() {

  let params = useParams();

  // key -> React mounts a fresh form (empty state) when moving between the add and edit pages
  return <BlogCategoryForm key={params.id ?? 'add'} id={params.id} />
}

function BlogCategoryForm({ id }) {

  const { isLogin, logout } = useContext(GlobalContext);
  let navigate = useNavigate();

  let [formData, setFormData] = useState(emptyForm);
  let [errors, setErrors] = useState({});
  let [loading, setLoading] = useState(Boolean(id));
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
    if (!id) {
      return;
    }

    axios.post(`${import.meta.env.VITE_API_URL}blog-category/details/${id}`, {}, authHeader)
      .then((result) => {
        if (result.data._status == true) {
          setFormData({
            name: result.data._data.name,
            order: String(result.data._data.order),
          });
        } else {
          iziToast.error({
            title: "Error",
            message: result.data._message,
            position: "topRight",
          });

          navigate('/blog-category/view');
        }
      })
      .catch(errorHandler)
      .finally(() => setLoading(false))
  }, [id])

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
      order: Number(formData.order),
    }

    setSubmitting(true);

    const request = id
      ? axios.put(`${import.meta.env.VITE_API_URL}blog-category/update/${id}`, data, authHeader)
      : axios.post(`${import.meta.env.VITE_API_URL}blog-category/create`, data, authHeader);

    request
      .then((result) => {
        if (result.data._status == true) {
          iziToast.success({
            title: "Success",
            message: result.data._message,
            position: "topRight",
          });

          navigate('/blog-category/view');
        } else {
          // Field wise errors from backend
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
    { name: 'name', label: 'Category Name', type: 'text', placeholder: 'Enter category name' },
    { name: 'order', label: 'Order', type: 'number', placeholder: 'Enter order number' },
  ];

  const pageTitle = id ? 'Update Blog Category' : 'Add Blog Category';

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
              <Link to="/blog-category/view" className="text-md font-medium hover:text-indigo-600">
                Blog Category
              </Link>
            </li>
            <li>/</li>

            <li aria-current="page">
              <span className="text-md font-semibold text-gray-900">
                {pageTitle}
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
              {pageTitle}
            </h3>

            <form onSubmit={formHandler} noValidate className="border border-slate-200 border-t-0 bg-white p-6 rounded-b-lg shadow-sm">

              {
                loading
                  ?
                  <p className="text-gray-500">Loading category...</p>
                  :
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                      {
                        fields.map((field) => (
                          <div className="mb-6" key={field.name}>
                            <label className="block mb-2 text-md font-medium text-gray-700">
                              {field.label}
                            </label>

                            <input
                              type={field.type}
                              name={field.name}
                              value={formData[field.name]}
                              onChange={changeHandler}
                              autoComplete="off"
                              className={`text-[17px] border text-gray-900 rounded-lg bg-white
                              focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500
                              block w-full py-2.5 px-3
                              ${errors[field.name] ? 'border-red-400' : 'border-slate-300'}`}
                              placeholder={field.placeholder}
                            />

                            {errors[field.name] && (
                              <p className="text-red-600 text-sm mt-1">
                                {errors[field.name]}
                              </p>
                            )}
                          </div>
                        ))
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
                        {
                          submitting
                            ? 'Saving...'
                            : id ? 'Update' : 'Submit'
                        }
                      </button>

                      <Link
                        to="/blog-category/view"
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
