import React from 'react'
import { Link } from 'react-router'

const footerColumns = [
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Sustainability'],
  },
  {
    title: 'Help',
    links: ['Contact Us', 'Track Order', 'Returns & Refunds', 'FAQs'],
  },
  {
    title: 'Categories',
    links: ['Face Care', 'Hair Care', 'Body Care', 'Baby Care'],
  },
  {
    title: 'Policies',
    links: ['Privacy Policy', 'Terms of Use', 'Shipping Policy'],
  },
]

const socialIcons = ['📘', '📸', '🐦', '▶️']

export default function Footer() {
  return (
    <footer className='bg-emerald-900 text-emerald-50 mt-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8'>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className='font-semibold mb-4 text-white'>{col.title}</h4>
            <ul className='space-y-2 text-sm text-emerald-100'>
              {col.links.map((link) => (
                <li key={link}>
                  <Link to={'#'} className='hover:text-white'>{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='border-t border-emerald-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <span className='text-2xl'>🌿</span>
            <span className='text-lg font-bold'>mamaearth</span>
          </div>

          <div className='flex gap-4 text-xl'>
            {socialIcons.map((icon, i) => (
              <span key={i} className='cursor-pointer'>{icon}</span>
            ))}
          </div>

          <p className='text-xs text-emerald-200 text-center'>
            © {new Date().getFullYear()} Mamaearth Clone. Built for learning purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
