import React from 'react'

const contactInfo = [
  { icon: '📍', title: 'Address', text: 'Mamaearth House, Sector 44, Gurugram, Haryana 122003' },
  { icon: '📞', title: 'Phone', text: '+91 124 6810757' },
  { icon: '✉️', title: 'Email', text: 'support@mamaearth.in' },
  { icon: '🕐', title: 'Working Hours', text: 'Mon - Sat: 9:00 AM - 6:00 PM' },
]

const faqs = [
  { q: 'How do I track my order?', a: 'You can track your order from the My Orders section after logging in.' },
  { q: 'What is your return policy?', a: 'We offer a 7-day easy return policy on all unused, sealed products.' },
  { q: 'Are your products safe for babies?', a: 'Yes, all our products are dermatologically tested and toxin free.' },
]

export default function ContactUs() {
  return (
    <>
      {/* Hero */}
      <section className='bg-linear-to-r from-emerald-100 to-emerald-50 py-14 text-center'>
        <h1 className='text-3xl sm:text-4xl font-bold text-emerald-900 mb-2'>Get in Touch</h1>
        <p className='text-gray-600'>We'd love to hear from you. Reach out with any questions or feedback.</p>
      </section>

      {/* Contact info + form */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {/* Info */}
        <div>
          <h2 className='text-xl font-bold text-gray-800 mb-6'>Contact Information</h2>
          <div className='space-y-5'>
            {contactInfo.map((info) => (
              <div key={info.title} className='flex items-start gap-4'>
                <span className='text-2xl'>{info.icon}</span>
                <div>
                  <p className='font-semibold text-gray-800'>{info.title}</p>
                  <p className='text-sm text-gray-500'>{info.text}</p>
                </div>
              </div>
            ))}
          </div>

          <img
            src='https://placehold.co/600x300/dbeafe/1e40af?text=Map+Location'
            alt='Map location'
            className='w-full rounded-xl mt-8 shadow-sm'
          />
        </div>

        {/* Form */}
        <div className='bg-gray-50 rounded-2xl p-6 sm:p-8'>
          <h2 className='text-xl font-bold text-gray-800 mb-6'>Send Us a Message</h2>
          <form className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                <input type='text' placeholder='John Doe' className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-emerald-500' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input type='email' placeholder='john@example.com' className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-emerald-500' />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Subject</label>
              <input type='text' placeholder='How can we help?' className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-emerald-500' />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Message</label>
              <textarea rows={5} placeholder='Write your message here...' className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-emerald-500 resize-none'></textarea>
            </div>
            <button type='button' className='w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-lg transition'>
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FAQs */}
      <section className='bg-gray-50 py-12'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6'>
          <h2 className='text-2xl font-bold text-center text-gray-800 mb-8'>Frequently Asked Questions</h2>
          <div className='space-y-4'>
            {faqs.map((faq) => (
              <div key={faq.q} className='bg-white border border-gray-200 rounded-xl p-5'>
                <p className='font-semibold text-gray-800 mb-1'>{faq.q}</p>
                <p className='text-sm text-gray-500'>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
