import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import iziToast from "izitoast";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../ContextAPI';

const publishedOptions = [
  { value: 'true', label: 'Published' },
  { value: 'false', label: 'Draft' },
];

const countValidator = (label) => (value) => {
  if (value.trim() && !/^[0-9]+$/.test(value.trim())) return `${label} should be a whole number (0 or more)`;
  return '';
};

// Same rules as the Blog model in backend
const validators = {
  category: (value) => {
    if (!value) return 'Category is required';
    return '';
  },
  title: (value) => {
    if (!value.trim()) return 'Title is required';
    if (value.trim().length < 3 || value.trim().length > 200) return 'Title should be 3-200 characters';
    return '';
  },
  username: (value) => {
    if (!value.trim()) return 'Username is required';
    if (value.trim().length > 50) return 'Username should not be more than 50 characters';
    return '';
  },
  date: (value) => {
    if (!value) return 'Date is required';
    return '';
  },
  published: (value) => {
    if (!publishedOptions.some((option) => option.value == value)) return 'Please select published or draft';
    return '';
  },
  total_comments: countValidator('Total comments'),
  total_likes: countValidator('Total likes'),
  short_description: (value) => {
    if (!value.trim()) return 'Short description is required';
    if (value.trim().length > 300) return 'Short description should not be more than 300 characters';
    return '';
  },
  description: (value) => {
    if (!value.trim()) return 'Description is required';
    return '';
  },
};

// Function (not a constant) so the default date is always today's date
const getEmptyForm = () => ({
  category: '',
  title: '',
  username: '',
  date: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD in local time
  published: 'false',
  total_comments: '0',
  total_likes: '0',
  short_description: '',
  description: '',
});

export default function AddBlog() {

  let params = useParams();

  // key -> React mounts a fresh form (empty state) when moving between the add and edit pages
  return <BlogForm key={params.id ?? 'add'} id={params.id} />
}

function BlogForm({ id }) {

  const { isLogin, logout } = useContext(GlobalContext);
  let navigate = useNavigate();

  let [formData, setFormData] = useState(getEmptyForm);
  let [errors, setErrors] = useState({});
  let [categories, setCategories] = useState([]);
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

  // Categories for the dropdown
  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}blog-category/view`, { limit: 1000 }, authHeader)
      .then((result) => {
        setCategories(result.data._data ?? []);
      })
      .catch(errorHandler)
  }, [])

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.post(`${import.meta.env.VITE_API_URL}blog/details/${id}`, {}, authHeader)
      .then((result) => {
        if (result.data._status == true) {
          const blog = result.data._data;

          setFormData({
            category: blog.category ?? '',
            title: blog.title,
            username: blog.username,
            date: blog.date ? blog.date.slice(0, 10) : '',
            published: String(blog.published),
            total_comments: String(blog.total_comments ?? 0),
            total_likes: String(blog.total_likes ?? 0),
            short_description: blog.short_description,
            description: blog.description,
          });
        } else {
          iziToast.error({
            title: "Error",
            message: result.data._message,
            position: "topRight",
          });

          navigate('/blog/view');
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
      category: formData.category,
      title: formData.title.trim(),
      username: formData.username.trim(),
      date: formData.date,
      published: formData.published == 'true',
      total_comments: Number(formData.total_comments || 0),
      total_likes: Number(formData.total_likes || 0),
      short_description: formData.short_description.trim(),
      description: formData.description.trim(),
    }

    setSubmitting(true);

    const request = id
      ? axios.put(`${import.meta.env.VITE_API_URL}blog/update/${id}`, data, authHeader)
      : axios.post(`${import.meta.env.VITE_API_URL}blog/create`, data, authHeader);

    request
      .then((result) => {
        if (result.data._status == true) {
          iziToast.success({
            title: "Success",
            message: result.data._message,
            position: "topRight",
          });

          navigate('/blog/view');
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

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.status ? category.name : `${category.name} (Inactive)`,
  }));

  const fields = [
    { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter blog title', fullWidth: true },
    { name: 'category', label: 'Category', type: 'select', options: categoryOptions, placeholder: 'Select category' },
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter author username' },
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'published', label: 'Published', type: 'select', options: publishedOptions },
    { name: 'total_comments', label: 'Total Comments', type: 'number', placeholder: '0' },
    { name: 'total_likes', label: 'Total Likes', type: 'number', placeholder: '0' },
    { name: 'short_description', label: 'Short Description', type: 'textarea', rows: 3, maxLength: 300, placeholder: 'Enter short description (shown on blog cards)', fullWidth: true },
    { name: 'description', label: 'Description', type: 'textarea', rows: 10, placeholder: 'Enter full blog description', fullWidth: true },
  ];

  const pageTitle = id ? 'Update Blog' : 'Add Blog';

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
              <Link to="/blog/view" className="text-md font-medium hover:text-indigo-600">
                Blog
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
                  <p className="text-gray-500">Loading blog...</p>
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
                            <div className={`mb-6 ${field.fullWidth ? 'md:col-span-2' : ''}`} key={field.name}>
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
                                    {
                                      field.placeholder && <option value="">{field.placeholder}</option>
                                    }
                                    {
                                      field.options.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                      ))
                                    }
                                  </select>
                                  :
                                  field.type == 'textarea'
                                    ?
                                    <textarea
                                      name={field.name}
                                      rows={field.rows}
                                      maxLength={field.maxLength}
                                      value={formData[field.name]}
                                      onChange={changeHandler}
                                      className={inputClass}
                                      placeholder={field.placeholder}
                                    />
                                    :
                                    <input
                                      type={field.type}
                                      name={field.name}
                                      min={field.type == 'number' ? 0 : undefined}
                                      value={formData[field.name]}
                                      onChange={changeHandler}
                                      autoComplete="off"
                                      className={inputClass}
                                      placeholder={field.placeholder}
                                    />
                              }

                              {
                                field.name == 'category' && categories.length == 0 && (
                                  <p className="text-amber-600 text-sm mt-1">
                                    No category found. <Link to="/blog-category/add" className="underline">Add a blog category</Link> first.
                                  </p>
                                )
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
                        {
                          submitting
                            ? 'Saving...'
                            : id ? 'Update' : 'Submit'
                        }
                      </button>

                      <Link
                        to="/blog/view"
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
