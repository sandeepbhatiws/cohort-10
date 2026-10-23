import React, { useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { IoColorPalette } from "react-icons/io5";
import { GiMaterialsScience } from "react-icons/gi";
import { Link } from "react-router-dom";
import { TbCategory2 } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import { LuShieldCheck } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
export default function Sidebar() {
  let [openBlock, setOpenBlock] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false);
  let openMenu = (name) => {
    if (name== openBlock) {
      setOpenBlock(null)
    } else {
      setOpenBlock(name)
    }
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="inline-flex items-center p-2 mt-2 ms-3 text-gray-600 rounded-lg sm:hidden hover:bg-gray-200"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 5h14M3 10h14M3 15h10"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed sm:static top-0 left-0 min-h-screen w-64 bg-slate-900 text-gray-200 p-4 shadow-xl
        transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        {/* HEADER */}
        <h2 className="text-2xl font-bold text-white tracking-wide mb-6 border-b border-slate-700 pb-3">
          Admin Panel
        </h2>

        {/* Dashboard */}
        <ul className="space-y-2">
          <li>
            <Link to={"/dashboard"}>
              <button className="flex w-full items-center gap-3 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                <MdManageAccounts size={20} />
                <span className="font-medium">Dashboard</span>
              </button>
            </Link>
          </li>
        </ul>

        <hr className="my-5 border-slate-700" />

        {/* MENUS */}
        <ul className="space-y-2">

          {/* Blog Category */}
          <li>
            <button
              onClick={()=>openMenu("blog-category")}
              className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
              id="blog-category"
            >
              <TbCategory size={20} />
              <span className="font-medium">Blog Category</span>
            </button>

            {openBlock == "blog-category" && (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                <Link to="/blog-category/add" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  Add Blog Category
                </Link>
                <Link to="/blog-category/view" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  View Blog Categories
                </Link>
              </div>
            )}
          </li>

          {/* Blog */}
          <li>
            <button
              onClick={()=>openMenu("blog")}
              className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
              id="blog"
            >
              <FaBlog size={18} />
              <span className="font-medium">Blog</span>
            </button>

            {openBlock == "blog" && (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                <Link to="/blog/add" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  Add Blog
                </Link>
                <Link to="/blog/view" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  View Blogs
                </Link>
              </div>
            )}
          </li>

          {/* Testimonial */}
          <li>
            <button
              onClick={()=>openMenu("testimonial")}
              className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
             
            >
              <FaQuoteLeft size={16} />
              <span className="font-medium">Testimonial</span>
            </button>

            {openBlock == "testimonial" ? (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                <Link to="/testimonial/add" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  Add Testimonial
                </Link>
                <Link to="/testimonial/view" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  View Testimonials
                </Link>
              </div>
            )
              :
              <>
              </>
            }
          </li>

          {/* Why Choose Us */}
          <li>
            <button
              onClick={()=>openMenu("why-choose-us")}
              className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
              id="why-choose-us"
            >
              <LuShieldCheck size={20} />
              <span className="font-medium">Why Choose Us</span>
            </button>

            {openBlock == "why-choose-us" ? (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                <Link to="/why-choose-us/add" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  Add Why Choose Us
                </Link>
                <Link to="/why-choose-us/view" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  View Why Choose Us
                </Link>
              </div>
            ) :
              <>

              </>
            }
          </li>

          {/* Color */}
          <li>
            <button
              onClick={()=>openMenu("color")}
              className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
              id="color"
            >
              <IoColorPalette size={20} />
              <span className="font-medium">Color</span>
            </button>

            {openBlock == "color" ? (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                <Link to="/color/add" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  Add Color
                </Link>
                <Link to="/color/view" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  View Colors
                </Link>
              </div>
            )
              :
              <>
              </>}
          </li>

          {/* Material */}
          <li>
            <button
              onClick={()=>openMenu("material")}
              className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
              id="material"
            >
              <GiMaterialsScience size={20} />
              <span className="font-medium">Material</span>
            </button>

            {openBlock == "material" && (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                <Link to="/material/add" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  Add Material
                </Link>
                <Link to="/material/view" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  View Materials
                </Link>
              </div>
            )}
          </li>

          {/* Category */}
          <li>
            <button
              onClick={()=>openMenu("category")}
              className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
              id="category"
            >
              <MdCategory size={20} />
              <span className="font-medium">Category</span>
            </button>

            {openBlock == "category" && (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                <Link to="/category/add" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  Add Category
                </Link>
                <Link to="/category/view" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  View Categories
                </Link>
              </div>
            )}
          </li>

          {/* Sub Category */}
          <li>
            <button
              onClick={()=>openMenu("sub-category")}
              className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
              id="sub-category"
            >
              <TbCategory2 size={20} />
              <span className="font-medium">Sub Category</span>
            </button>

            {openBlock == "sub-category" && (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                <Link to="/sub-category/add" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  Add Sub Category
                </Link>
                <Link to="/sub-category/view" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  View Sub Categories
                </Link>
              </div>
            )}
          </li>

          {/* Sub Sub Category */}
          <li>
            <button
              onClick={()=>openMenu("sub-sub-category")}
              className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
              id="sub-sub-category"
            >
              <TbCategoryPlus size={20} />
              <span className="font-medium">Sub Sub Category</span>
            </button>

            {openBlock == "sub-sub-category" && (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                <Link to="/sub-sub-category/add" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  Add Sub Sub Category
                </Link>
                <Link to="/sub-sub-category/view" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  View Sub Sub Categories
                </Link>
              </div>
            )}
          </li>

          {/* Product */}
          <li>
            <button
              onClick={()=>openMenu("product")}
              className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
              id="product"
            >
              <LuPackage size={20} />
              <span className="font-medium">Product</span>
            </button>

            {openBlock == "product" && (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                <Link to="/product/add" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  Add Product
                </Link>
                <Link to="/product/view" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  View Products
                </Link>
              </div>
            )}
          </li>

        </ul>

        <hr className="my-5 border-slate-700" />

        {/* ACCOUNT */}
        <ul className="space-y-2">
          <li>
            <button
              onClick={()=>openMenu("profile")}
              className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
              id="profile"
            >
              <FaUserCircle size={20} />
              <span className="font-medium">Profile</span>
            </button>

            {openBlock == "profile" && (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                <Link to="/profile" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  My Profile
                </Link>
                <Link to="/profile/update" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  Update Profile
                </Link>
                <Link to="/profile/change-password" className="block px-3 py-2 rounded-md hover:bg-slate-800">
                  Change Password
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
