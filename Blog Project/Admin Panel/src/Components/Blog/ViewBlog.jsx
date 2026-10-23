import React, { useContext, useEffect, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import iziToast from "izitoast";
import axios from 'axios';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import { GlobalContext } from '../ContextAPI';

// Dates are saved as YYYY-MM-DD (midnight UTC), so show them in UTC to get the same day back
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export default function ViewBlog() {

  const { isLogin, logout } = useContext(GlobalContext);
  let navigate = useNavigate();

  const [filterData, setFilterData] = useState({})
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  // Only for the first load, later loads keep the old rows until the new ones arrive
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Increase this to load the list again (after delete / change status)
  const [reload, setReload] = useState(0);

  const [openFilter, setOpenFilter] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState([])

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

  // Categories for the filter dropdown
  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}blog-category/view`, { limit: 1000 }, authHeader)
      .then((result) => {
        setCategories(result.data._data ?? []);
      })
      .catch(errorHandler)
  }, [])

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}blog/view`, {
      title: filterData.title,
      category: filterData.category,
      published: filterData.published,
      limit: 10,
      page: currentPage
    }, authHeader)
      .then((result) => {
        // Selection belongs to the old rows, so clear it when new rows arrive
        setSelectedRecord([]);

        if (result.data._status == true) {
          setBlogs(result.data._data);
        } else {
          setBlogs([]);

          // Empty list also comes with _status false, only a failed request has no _paginate
          if (!result.data._paginate) {
            iziToast.error({
              title: "Error",
              message: result.data._message,
              position: "topRight",
            });
          }
        }

        const paginate = result.data._paginate;
        setTotalPages(paginate?.total_pages ?? 0);

        // Last page became empty after delete -> go back to the new last page
        if (paginate && paginate.total_pages > 0 && currentPage > paginate.total_pages) {
          setCurrentPage(paginate.total_pages);
        }
      })
      .catch(errorHandler)
      .finally(() => setLoading(false))
  }, [filterData, currentPage, reload]);


  const applyFilter = (e) => {
    e.preventDefault();

    const published = e.target.published.value;

    setFilterData({
      title: e.target.title.value.trim(),
      category: e.target.category.value,
      // '' = all, otherwise send a real boolean
      published: published === '' ? '' : published == 'true',
    });
    setCurrentPage(1);
  };


  const changeStatus = () => {
    if (selectedRecord.length == 0) {
      iziToast.error({
        title: "No Selection",
        message: "Please select at least one blog to change status.",
        position: "topRight",
      });
      return;
    }

    axios.put(`${import.meta.env.VITE_API_URL}blog/change-status`, { ids: selectedRecord }, authHeader)
      .then((result) => {
        if (result.data._status == true) {
          iziToast.success({
            title: "Status Updated",
            message: result.data._message,
            position: "topRight",
          });

          setReload((value) => value + 1);
        } else {
          iziToast.error({
            title: "Error",
            message: result.data._message,
            position: "topRight",
          });
        }
      })
      .catch(errorHandler)
  }


  const deleteRecords = () => {

    if (selectedRecord.length == 0) {
      iziToast.error({
        title: "No Selection",
        message: "Please select at least one blog to delete.",
        position: "topRight",
      });
      return;
    }

    iziToast.question({
      timeout: 20000,
      close: true,
      overlay: true,
      displayMode: "once",
      id: "delete-confirm",
      zindex: 999999,
      title: "Confirm Delete",
      message: "Do you really want to delete selected blogs?",
      position: "center",
      buttons: [
        [
          "<button><b>YES, Delete</b></button>",
          function (instance, toast) {

            instance.hide({ transitionOut: "fadeOut" }, toast);

            // axios.delete sends the body through the "data" option
            axios.delete(`${import.meta.env.VITE_API_URL}blog/delete`, {
              ...authHeader,
              data: { ids: selectedRecord }
            })
              .then((result) => {
                if (result.data._status == true) {
                  iziToast.success({
                    title: "Deleted",
                    message: "Selected blogs have been deleted successfully.",
                    position: "topRight",
                  });

                  setReload((value) => value + 1);
                } else {
                  iziToast.error({
                    title: "Error",
                    message: result.data._message,
                    position: "topRight",
                  });
                }
              })
              .catch(errorHandler)
          },
          true
        ],
        [
          "<button>Cancel</button>",
          function (instance, toast) {
            instance.hide({ transitionOut: "fadeOut" }, toast);
          }
        ]
      ]
    })

  }


  const SingleCheckSelect = (id) => {

    if (selectedRecord.includes(id)) {
      setSelectedRecord(selectedRecord.filter((v) => v !== id))
    } else {
      setSelectedRecord([...selectedRecord, id])
    }
  }

  const allSelected = blogs.length > 0 && selectedRecord.length == blogs.length;

  const multipleSelectCheckBox = () => {
    if (allSelected) {
      setSelectedRecord([]);
    } else {
      setSelectedRecord(blogs.map((v) => v._id));
    }
  }

  const filterInputClass = `text-[17px] border border-slate-300 rounded-lg bg-white
  focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500
  block w-full py-2.5 px-3`;


  return (
    <>
      <section className="w-full">

        {/* Breadcrumb */}

        <nav className="flex border-b bg-white px-6 py-3 shadow-sm">

          <ol className="inline-flex items-center space-x-2 text-gray-600">

            <li>
              <Link to="/dashboard" className="text-md font-medium hover:text-indigo-600">Home</Link>
            </li>

            <li>/</li>

            <li>
              <Link to="/blog/view" className="text-md font-medium hover:text-indigo-600">Blog</Link>
            </li>

            <li>/</li>

            <li className="text-md font-medium text-gray-900">
              View Blog
            </li>

          </ol>

        </nav>


        {/* FILTER */}

        <div
          className={`p-4 overflow-hidden transition-all duration-300 ease-out
          ${openFilter ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >

          <form
            onSubmit={applyFilter}
            className="py-4 relative px-6 my-3 rounded-lg border border-slate-200 w-full bg-white shadow-sm"
          >

            <button
              type="button"
              onClick={() => setOpenFilter(false)}
              className="absolute right-4 top-4 text-[28px] text-gray-600 hover:text-black cursor-pointer"
            >
              <MdOutlineClose />
            </button>


            <p className="font-semibold py-2 text-[20px]">
              Filter
            </p>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">

              <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  autoComplete="off"
                  placeholder="Search Blog Title"
                  className={filterInputClass}
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">
                  Category
                </label>

                <select name="category" className={filterInputClass}>
                  <option value="">All Categories</option>
                  {
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>{category.name}</option>
                    ))
                  }
                </select>
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">
                  Published
                </label>

                <select name="published" className={filterInputClass}>
                  <option value="">All</option>
                  <option value="true">Published</option>
                  <option value="false">Draft</option>
                </select>
              </div>

            </div>


            <div className="flex items-center gap-3 pt-2">

              <button
                type="reset"
                onClick={() => { setFilterData({}); setCurrentPage(1); }}
                className="text-white bg-slate-500 hover:bg-slate-600 px-6 py-2.5 rounded-lg transition-all"
              >
                Clear
              </button>


              <button
                type="submit"
                className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-lg shadow-sm transition-all focus:ring-4 focus:ring-indigo-300"
              >
                Apply
              </button>

            </div>

          </form>

        </div>


        {/* MAIN */}

        <div className="p-4">

          {/* Header */}

          <div className="bg-slate-100 flex flex-wrap gap-3 justify-between items-center py-3 px-4 rounded-t-md border border-slate-300">

            <div className="text-[26px] font-semibold">
              View Blog
            </div>


            <div className="flex flex-wrap gap-3 items-center">

              <button
                onClick={() => setOpenFilter(true)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm border border-slate-300 transition-all"
              >
                <FaFilter /> Filter
              </button>


              <button
                onClick={deleteRecords}
                disabled={selectedRecord.length === 0}
                className="text-white disabled:bg-slate-400 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-700 text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all"
              >
                Delete All
              </button>


              <button
                onClick={changeStatus}
                disabled={selectedRecord.length === 0}
                className="text-white disabled:bg-slate-400 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-700 text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all"
              >
                Change Status
              </button>


              <Link
                to="/blog/add"
                className="text-white bg-green-600 hover:bg-green-700 text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all"
              >
                + Add Blog
              </Link>

            </div>

          </div>



          {/* TABLE */}

          <div className="border border-t-0 rounded-b-md border-slate-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-700">

                <thead className="text-sm uppercase bg-gray-50 border-b">
                  <tr>
                    <th className="px-2 w-[100px] py-3">
                      <input
                        type="checkbox"
                        onChange={multipleSelectCheckBox}
                        checked={allSelected}
                        className="mr-2 w-4 h-4 cursor-pointer text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      Select
                    </th>
                    <th className="px-2 py-3 min-w-[220px]">Title</th>
                    <th className="px-2 py-3">Category</th>
                    <th className="px-2 py-3">Username</th>
                    <th className="px-2 py-3">Published</th>
                    <th className="px-2 py-3 whitespace-nowrap">Date</th>
                    <th className="px-2 py-3">Comments</th>
                    <th className="px-2 py-3">Likes</th>
                    <th className="px-2 w-[100px] py-3">Status</th>
                    <th className="px-2 w-[80px] py-3">Action</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    loading
                      ?
                      <tr className="bg-white border-b">
                        <td className="px-2 py-4 text-center text-gray-500" colSpan={10}>
                          Loading...
                        </td>
                      </tr>
                      :
                      blogs.length > 0
                        ?
                        blogs.map((v) => {
                          return (
                            <tr className="bg-white border-b" key={v._id}>

                              <td className="px-2 py-4">
                                <input
                                  type="checkbox"
                                  checked={selectedRecord.includes(v._id)}
                                  className="w-4 h-4 text-indigo-600 cursor-pointer"
                                  onChange={() => SingleCheckSelect(v._id)}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <p className="font-medium text-gray-900">{v.title}</p>
                                <p className="text-sm text-gray-500">{v.slug}</p>
                              </td>

                              <td className="px-2 py-4">
                                {v.category?.name ?? '-'}
                              </td>

                              <td className="px-2 py-4">
                                {v.username}
                              </td>

                              <td className="px-2 py-4">
                                {
                                  v.published
                                    ?
                                    <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-medium">Published</span>
                                    :
                                    <span className="rounded-full bg-slate-200 text-slate-700 px-3 py-1 text-sm font-medium">Draft</span>
                                }
                              </td>

                              <td className="px-2 py-4 whitespace-nowrap">
                                {formatDate(v.date)}
                              </td>

                              <td className="px-2 py-4">
                                {v.total_comments}
                              </td>

                              <td className="px-2 py-4">
                                {v.total_likes}
                              </td>

                              {
                                v.status == true
                                  ?
                                  <td className="px-2 py-4 text-green-600 font-semibold">
                                    Active
                                  </td>
                                  :
                                  <td className="px-2 py-4 text-red-600 font-semibold">
                                    InActive
                                  </td>
                              }

                              <td className="px-2 py-4">

                                <Link to={`/blog/edit/${v._id}`} title="Edit">
                                  <svg fill="gold" className="w-5 h-5" viewBox="0 0 512 512">
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7z"></path>
                                  </svg>
                                </Link>

                              </td>

                            </tr>
                          )
                        })
                        :
                        <tr className="bg-white border-b">
                          <td className="px-2 py-4 text-center" colSpan={10}>
                            No Record Found !!
                          </td>
                        </tr>
                  }

                </tbody>

              </table>

            </div>

            {
              totalPages > 1 &&
              <div className='py-6'>
                <ResponsivePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            }

          </div>

        </div>

      </section>
    </>
  )
}
