import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-2 fixed bottom-0 w-full">
      <div className="container mx-auto px-2">
        <div className="mt-1 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Esvio. All rights reserved. || By Parth Devaliya
        </div>
      </div>
    </div>
  )
}

export default Footer
