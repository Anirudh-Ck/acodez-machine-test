import React from 'react'

function Header({ toggleSidebar }) {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-4">
      <button
          className="text-xl lg:hidden"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <h1 className="text-lg font-semibold">Typography</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>
        <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full text-blue-600">
          OP
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header