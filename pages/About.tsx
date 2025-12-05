/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import { Target, Eye, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20 animate-fade-in">
      {/* Header */}
      <div className="bg-green-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About JFCIN</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cultivating a brighter future for Nigeria through unity, innovation, and sustainable agriculture.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-jfcin-primary">Our History</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2015, the Joint Farmers Community Initiative of Nigeria (JFCIN) emerged from a critical need to organize and empower smallholder farmers who form the backbone of our nation's economy.
            </p>
            <p className="text-gray-600 leading-relaxed">
              What started as a small cooperative in three states has grown into a nationwide movement, bridging the gap between rural farmers, government policies, and international markets. We believe that by organizing farmers, we can solve the twin challenges of food insecurity and rural poverty.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/400/500?random=60" alt="Farm" className="rounded-2xl shadow-lg mt-8" />
            <img src="https://picsum.photos/400/500?random=61" alt="Farmer" className="rounded-2xl shadow-lg" />
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500 hover:-translate-y-2 transition-transform duration-300">
            <Eye className="text-green-600 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading agricultural body in Africa, creating a wealthy, food-secure nation where farmers are respected and prosperous.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500 hover:-translate-y-2 transition-transform duration-300">
            <Target className="text-blue-600 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To empower farmers through advocacy, capacity building, access to finance, and modern technology adoption for sustainable development.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-yellow-500 hover:-translate-y-2 transition-transform duration-300">
            <Award className="text-yellow-600 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-3">Core Values</h3>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>Integrity & Transparency</li>
              <li>Community First</li>
              <li>Sustainable Innovation</li>
              <li>Inclusivity</li>
            </ul>
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Strategic Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Unify farmers under a single, powerful umbrella.",
              "Facilitate access to single-digit interest loans.",
              "Provide mechanized farming equipment at subsidized rates.",
              "Educate members on climate-smart agricultural practices.",
              "Establish direct market linkages to eliminate middlemen.",
              "Advocate for favorable government agricultural policies."
            ].map((obj, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shrink-0 font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-gray-300">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;