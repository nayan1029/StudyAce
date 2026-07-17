import React from 'react'

export default function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl p-5 border border-teal-100 shadow-sm ${className}`}>
      {title && <h3 className="text-base font-semibold text-black mb-3">{title}</h3>}
      {children}
    </div>
  )
}
