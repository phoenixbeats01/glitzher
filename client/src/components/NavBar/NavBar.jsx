import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'

import {
  TagIcon,
  ShoppingBagIcon,
  MenuIcon,
  SearchIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  SupportIcon,
  XIcon,
} from '@heroicons/react/outline'

// Components
import SearchModal from '../SearchModal/SearchModal';

const solutions = [
  {
    name: 'Popular Products',
    description: 'View popular cosmetic products.',
    href: '/popular',
    icon: TagIcon,
  },
  {
    name: 'Brands',
    description: 'All the brands we collect products from.',
    href: '/brands',
    icon: ShoppingBagIcon,
  },
  {
    name: 'About',
    description: 'All about Glitzher.',
    href: '/about',
    icon: QuestionMarkCircleIcon,
  },
]

const resources = [
  {
    name: 'Terms of Service',
    description: 'Learn the terms of using our service.',
    href: '/tos',
    icon: SupportIcon,
  },
  {
    name: 'Privacy Policy',
    description: 'Understand how we take your privacy seriously.',
    href: '/polices/privacy',
    icon: ShieldCheckIcon,
  },
]


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

    // Search Modal
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () =>{
        setIsOpen(false);
    }

  return (
    <Popover className="relative bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
              
              {/* Logo */}
              <div className="flex justify-start">
                <a href="/">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Glitzher Logo"
                  />
                </a>
              </div>

              {/* Mobile SearchBar */}
              <div onClick={openModal} className="flex flex-grow items-center border p-3 mx-3 border-gray-300 rounded-md md:hidden cursor-pointer">
                <div className="flex">
                  <div className="p-1">
                    <SearchIcon className="text-gray-400 h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex ml-2 my-auto text-gray-400">Search</div>
                </div>
              </div>

              {/* Mobile Icon */}
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>

              {/* Desktop Menu Items */}
              <Popover.Group as="nav" className="hidden md:flex space-x-10">
                <a href="/popular" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Popular Products
                </a>
                <a href="/brands" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Brands
                </a>
                <a href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  About
                </a>
              </Popover.Group>

              {/* Seperator */}
              <div className="hidden md:flex justify-between lg:w-1/5"></div>

              {/* Desktop SearchBar */}
              <div onClick={openModal} className="hidden md:flex items-center border p-3 border-gray-300 rounded-md cursor-pointer md:flex-1 lg:w-0">
                <div className="flex">
                  <div className="p-1">
                    <SearchIcon className="text-gray-400 h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex ml-2 my-auto text-base font-medium text-gray-400">Search</div>
                </div>
              </div>
              <SearchModal isOpen={isOpen} closeModal={closeModal} openModal={isOpen} />
            </div>
          </div>
          
          {/* Mobile Menu */}
          <Transition
            show={open}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {solutions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                        >
                          <item.icon className="flex-shrink-0 h-6 w-6 text-red-500" aria-hidden="true" />
                          <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    {resources.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex text-base font-medium text-gray-900 hover:text-gray-700"
                      >
                        <item.icon className="flex-shrink-0 h-6 w-6 text-red-500" aria-hidden="true"/>
                        <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                      </a>
                    ))}
                  </div>
                  <div
                    onClick={openModal}
                    className="w-full flex items-center justify-center p-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600"
                  >
                    <SearchIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                    <span className="ml-3">Search</span>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
