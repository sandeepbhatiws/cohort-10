import React from 'react'

const stats = [
  { value: '10M+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '1500+', label: 'Toxins Avoided' },
  { value: '5000+', label: 'Retail Stores' },
]

const values = [
  { icon: '🌱', title: 'Natural Ingredients', text: 'We source natural ingredients from across the globe to craft safe, effective products.' },
  { icon: '🚫', title: 'Toxin Free', text: 'Every product is free from harmful toxins like Sulphates, Parabens, and Mineral Oil.' },
  { icon: '🐇', title: 'Cruelty Free', text: 'We never test on animals — all our products are certified cruelty free.' },
  { icon: '♻️', title: 'Sustainable Packaging', text: 'We plant a tree for every product sold and use eco-friendly packaging wherever possible.' },
]

const team = [
  { name: 'Aditya Sharma', role: 'Co-Founder & CEO', img: 'https://placehold.co/300x300/d4f4e2/1e6b4d?text=Aditya' },
  { name: 'Neha Sharma', role: 'Co-Founder', img: 'https://placehold.co/300x300/fde8d4/b5651d?text=Neha' },
  { name: 'Rahul Verma', role: 'Chief Product Officer', img: 'https://placehold.co/300x300/e2d4fd/5b3ea6?text=Rahul' },
]

export default function AboutUs() {
  return (
    <>
      {/* Hero */}
      <section className='bg-linear-to-r from-emerald-100 to-emerald-50 py-16 text-center'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6'>
          <p className='text-emerald-700 font-semibold mb-2'>Our Story</p>
          <h1 className='text-3xl sm:text-5xl font-bold text-emerald-900 mb-4'>Goodness, By Nature</h1>
          <p className='text-gray-600'>
            We started with a simple idea — babies deserve products made with natural ingredients,
            free from harmful toxins. Today, that idea has grown into a brand trusted by millions of families.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center'>
        {stats.map((s) => (
          <div key={s.label}>
            <p className='text-3xl sm:text-4xl font-bold text-emerald-800'>{s.value}</p>
            <p className='text-sm text-gray-500 mt-1'>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Mission */}
      <section className='bg-gray-50 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-10'>
          <img
            src='https://placehold.co/600x400/a7f3d0/065f46?text=Our+Mission'
            alt='Our mission'
            className='flex-1 w-full rounded-2xl shadow-md'
          />
          <div className='flex-1'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Our Mission</h2>
            <p className='text-gray-600 mb-4'>
              To make safe, natural, and effective personal care products accessible to every household,
              while staying committed to sustainability and giving back to the planet.
            </p>
            <p className='text-gray-600'>
              Every product we make is MadeSafe certified, dermatologically tested, and crafted without
              harmful chemicals — because we believe goodness should never come at the cost of safety.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 py-12'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-10'>What We Stand For</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {values.map((v) => (
            <div key={v.title} className='text-center p-6 border border-gray-200 rounded-xl'>
              <span className='text-4xl'>{v.icon}</span>
              <h3 className='font-semibold text-gray-800 mt-3 mb-2'>{v.title}</h3>
              <p className='text-sm text-gray-500'>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className='bg-gray-50 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <h2 className='text-2xl font-bold text-center text-gray-800 mb-10'>Meet the Team</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
            {team.map((member) => (
              <div key={member.name} className='text-center'>
                <img src={member.img} alt={member.name} className='w-40 h-40 rounded-full object-cover mx-auto mb-4' />
                <h3 className='font-semibold text-gray-800'>{member.name}</h3>
                <p className='text-sm text-gray-500'>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='bg-emerald-800 py-12 text-center'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6'>
          <h2 className='text-2xl font-bold text-white mb-3'>Join the Mamaearth Family</h2>
          <p className='text-emerald-100 mb-6 text-sm'>Discover natural, toxin-free products made for you and your loved ones.</p>
          <button className='bg-amber-400 hover:bg-amber-500 text-emerald-900 font-semibold px-8 py-3 rounded-full transition'>
            Shop Now
          </button>
        </div>
      </section>
    </>
  )
}
