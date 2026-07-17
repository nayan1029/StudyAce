import React, { useState } from 'react'

/**
 * FlashCard - A 3D flip card component.
 * Props:
 *   front       – JSX content shown on the front face
 *   back        – JSX content shown on the back face
 *   frontClass  – extra className for the front face div
 *   backClass   – extra className for the back face div
 *   className   – extra className for the card container
 */
export default function FlashCard({ front, back, frontClass = '', backClass = '', className = '' }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`relative cursor-pointer select-none ${className}`}
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped((f) => !f)}
    >
      {/* Card inner wrapper – rotates */}
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6 backface-hidden ${frontClass}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
          <span className="mt-4 text-xs text-gray-400 font-medium tracking-wide uppercase">Click to reveal</span>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6 backface-hidden ${backClass}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {back}
          <span className="mt-4 text-xs text-gray-400 font-medium tracking-wide uppercase">Click to flip back</span>
        </div>
      </div>
    </div>
  )
}
