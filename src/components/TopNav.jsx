"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="bg-[#ff7f7f] w-full relative pt-6">
      {/* Desktop and Mobile Header */}
      <div className="flex justify-between items-center relative px-4 md:px-8 py-2 md:py-0 h-[80px] md:h-[144px]">
        {/* Logo */}
        <div className="flex items-center">
          <img src="Logo.png" alt="Logo" className="h-[80px] w-[80px] md:h-[130px] md:w-[130px]" />
        </div>

        {/* Heading - Hidden on mobile, visible on medium screens and up */}
        <h1 className="hidden md:block top-0 font-['Elsie'] text-4xl md:text-5xl absolute left-1/2 transform -translate-x-1/2">
          The Tasty Trails
        </h1>

        
        {/* Mobile Heading - Visible on mobile only */}
        <h1 className="md:hidden font-['Elsie'] text-3xl">The Tasty Trails</h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Search and Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="rounded-full w-[200px] lg:w-[400px] p-[15px] bg-white h-[30px] transition duration-300 hover:scale-105"
          />
          <div className="flex space-x-2">
            <button className="font-['Elsie'] bg-[#FFDAB9] w-[90px] lg:w-[120px] h-[30px] rounded-full transition duration-300 hover:scale-110">
              Recipes
            </button>
            <button className="font-['Elsie'] bg-[#FFDAB9] w-[90px] lg:w-[120px] h-[30px] rounded-full transition duration-300 hover:scale-110">
              Cooking Tips
            </button>
            <button className="font-['Elsie'] bg-[#FFDAB9] w-[90px] lg:w-[120px] h-[30px] rounded-full transition duration-300 hover:scale-110">
              Ask AI
            </button>
            <button className="font-['Elsie'] bg-[#FFDAB9] w-[90px] lg:w-[120px] h-[30px] rounded-full transition duration-300 hover:scale-110">
              About Us
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#ff7f7f] px-4 py-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Search"
              className="rounded-full w-full p-[10px] bg-white h-[30px] transition duration-300 hover:scale-105"
            />
            <div className="flex flex-col space-y-2">
              <button className="font-['Elsie'] bg-[#FFDAB9] w-full h-[30px] rounded-full transition duration-300 hover:scale-105">
                Recipes
              </button>
              <button className="font-['Elsie'] bg-[#FFDAB9] w-full h-[30px] rounded-full transition duration-300 hover:scale-105">
                Cooking Tips
              </button>
              <button className="font-['Elsie'] bg-[#FFDAB9] w-full h-[30px] rounded-full transition duration-300 hover:scale-105">
                Ask AI
              </button>
              <button className="font-['Elsie'] bg-[#FFDAB9] w-full h-[30px] rounded-full transition duration-300 hover:scale-105">
                About Us
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

