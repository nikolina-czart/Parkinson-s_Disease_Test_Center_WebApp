import React, { Component } from "react";
import { TESTS } from "../parkinsonTests/parkinsonTests";
import Navbar from "../layout/Navbar";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl block xl:inline">
                Test Center
              </h1>
              <h1 className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-indigo-600 sm:text-5xl md:text-6xl">
                Parkinson's Disease
              </h1>
              <p className="mt-3 max-w-2xl text-justify text-xl text-gray-500 lg:mx-auto">
              Wczesne objawy choroby Parkinsona to nie tylko drżenie rąk, ale także zmniejszona sprawność fizyczna i umysłowa, powolne ruchy, zaburzenia równowagi, niewyraźna mowa, zaburzenia połykania i depresja. Czy wiesz, że pierwsze objawy choroby Parkinsona mogą pojawić się około 21 roku życia? Dowiedz się więcej.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {TESTS.map((test) => (
                  <div key={test.name} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <test.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        {test.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-justify text-base text-gray-500">
                      {test.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HomePage;
