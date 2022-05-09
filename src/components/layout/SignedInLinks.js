import React, { Fragment } from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import logo from "./img/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { Menu, LogoutOutline, Plus } from "heroicons-react";

const SignedInLinks = (props) => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/dashboard">
              <span className="sr-only">Workflow</span>
              <img className="h-16 w-auto sm:h-18" src={logo} alt="" />
            </Link>
          </div>
          {/* Zmniejszona przeglądarka */}
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md h-14 w-14 sm:h-20 sm:w-20 p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Menu className="h-10 w-10 sm:h-14 sm:w-14" aria-hidden="true" />
            </Popover.Button>
          </div>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <NavLink
              to="/create"
              // className="whitespace-nowrap text font-medium text-gray-500   px-4 py-2 border border-transparent rounded-md  hover:text-gray-900 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              Dodaj nowego użytkownika
              <Plus className="ml-2 h-8 w-8" aria-hidden="true" />
            </NavLink>

            <button
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              onClick={props.signOut}
            >
              Wyloguj
              <LogoutOutline className="ml-2 h-8 w-8" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <Transition
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
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50 z-10">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <Link to="/home">
                    <span className="sr-only">Workflow</span>
                    <img className="h-16 w-auto sm:h-20" src={logo} alt="" />
                  </Link>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md h-14 w-14 sm:h-20 sm:w-20 p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <Menu
                      className="h-10 w-10 sm:h-14 sm:w-14"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6"></div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                <NavLink
                  to="/create"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Dodaj nowego użytkownika
                </NavLink>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Praca skończona na dzisiaj?{" "}
                  <button
                    className="text-indigo-600 hover:text-indigo-500"
                    onClick={props.signOut}
                  >
                    Wyloguj się!
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
