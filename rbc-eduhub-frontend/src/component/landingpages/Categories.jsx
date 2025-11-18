import React, { useState, useEffect } from 'react';
import AIWidget from '../AIWidget';
import { ChevronDown, Stethoscope, Heart, TrendingUp, Beaker, Pill, ImageIcon, Building2, Zap, Microscope } from 'lucide-react';

function Categories() {
  const [selectedLevel, setSelectedLevel] = useState('Beginner');
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [visibleCards, setVisibleCards] = useState(false);
  const [cardStyle, setCardStyle] = useState('grid');

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

  const categoryFilters = ['Popular', 'Clinical Practice', 'Public Health', 'Healthcare Leadership', 'Nursing', 'Healthcare'];

  // Sample courses data with placeholder images
  const courses = [
    {
      id: 1,
      title: 'Clinical Diagnostics',
      description: 'Master the essential diagnostic techniques used in modern clinical practice. Learn proper patient assessment and examination procedures.',
      category: 'Clinical Practice',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=400&fit=crop',
      providers: ['RBC', 'MOH', 'KUTH'],
      bgColor: 'bg-yellow-300',
    },
    {
      id: 2,
      title: 'Nursing Care Excellence',
      description: 'Comprehensive nursing course covering patient care, assessment techniques, and professional development in healthcare settings.',
      category: 'Nursing',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=400&fit=crop',
      providers: ['RBC'],
      bgColor: 'bg-blue-300',
    },
    {
      id: 3,
      title: 'Public Health Essentials',
      description: 'Learn to design, implement, and evaluate public health programs. Focus on disease prevention, health promotion, and community engagement.',
      category: 'Public Health',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500&h=400&fit=crop',
      providers: ['MOH', 'RBC'],
      bgColor: 'bg-green-300',
    },
    {
      id: 4,
      title: 'Healthcare Leadership',
      description: 'Develop leadership skills for healthcare management. Master team building, strategic planning, and organizational development.',
      category: 'Healthcare Leadership',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&h=400&fit=crop',
      providers: ['RBC'],
      bgColor: 'bg-purple-300',
    },
  ];

  // Filter courses based on selections
  const filteredCourses = courses.filter(course => {
    const levelMatch = course.level === selectedLevel;
    const categoryMatch = selectedCategory === 'Popular' || course.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cardsContainer = document.querySelector('.courses-cards');
    if (cardsContainer) {
      observer.observe(cardsContainer);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFCFD]">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Explore</h1>
          <div className="text-blue-600 px-3 py-2 rounded text-3xl font-bold">
            Categories
          </div>
        </div>
      </div>

      {/* Main Categories */}
      <div className="max-w-7xl mx-auto px-4 pb-8 border-b border-gray-200">
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium group">
            <Stethoscope size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors opacity-50" />
            Clinical Medicine
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium group">
            <Heart size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors opacity-50" />
            Nursing
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium group">
            <TrendingUp size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors opacity-50" />
            Public Health
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium group">
            <Beaker size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors opacity-50" />
            Laboratory Science
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium group">
            <Pill size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors opacity-50" />
            Pharmacy
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium group">
            <ImageIcon size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors opacity-50" />
            Medical Imaging
          </button>
        </div>

        {/* Sub Categories */}
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium group">
            <Building2 size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors opacity-50" />
            Hospital Administration
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium group">
            <Zap size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors opacity-50" />
            Pharmaceuticals
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium group">
            <Microscope size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors opacity-50" />
            Medical Research
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 rounded-lg my-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center flex-wrap">
          {/* Level Filter */}
          <div className="w-full md:w-auto">
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-800 font-medium appearance-none cursor-pointer hover:border-blue-400 focus:outline-none focus:border-blue-500"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="bg-gray-50 p-8 rounded-lg h-fit">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Explore roles</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Grow in your career and get new skills with these premium courses on a 7-day free trial
            </p>
            <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              View all
            </button>

            {/* Card Style Toggle */}
            <div className="mt-8 pt-8 border-t border-gray-300">
              <p className="text-xs font-semibold text-gray-700 mb-3 uppercase">Card Style</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCardStyle('grid')}
                  className={`flex-1 px-3 py-2 rounded text-xs font-semibold transition-all ${
                    cardStyle === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setCardStyle('horizontal')}
                  className={`flex-1 px-3 py-2 rounded text-xs font-semibold transition-all ${
                    cardStyle === 'horizontal'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Horizontal
                </button>
              </div>
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="lg:col-span-3">
            {cardStyle === 'grid' ? (
              // Grid Layout - Side by side cards like the World Bank image
              <div className="courses-cards grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course, index) => (
                  <div
                    key={course.id}
                    style={{
                      transition: 'all 0.6s ease',
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex h-full">
                      {/* Left side - Image (40% width) */}
                      <div className="relative w-2/5 min-h-[280px]">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full rounded-lg object-cover"
                        />
                      </div>

                      {/* Right side - Content (60% width) */}
                      <div className="w-3/5 p-6 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                            {course.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-4">
                            {course.description}
                          </p>
                        </div>

                        {/* Bottom section with providers and link */}
                        <div>
                          <p className="text-xs font-semibold text-gray-700 mb-3">Offered by</p>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {course.providers.map((provider) => (
                                <div
                                  key={provider}
                                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-700"
                                >
                                  {provider[0]}
                                </div>
                              ))}
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm underline">
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Horizontal Layout (Full width cards)
              <div className="courses-cards space-y-6">
                {filteredCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform ${
                      visibleCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{
                      transition: 'all 0.6s ease',
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex flex-col md:flex-row items-stretch">
                      {/* Left Content (65% width) */}
                      <div className="flex-1 md:w-[65%] p-6 md:p-8 flex flex-col justify-center">
                        <h4 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">{course.description}</p>

                        {/* Providers */}
                        <div>
                          <p className="text-xs font-semibold text-gray-700 mb-3">Offered by</p>
                          <div className="flex gap-2">
                            {course.providers.map((provider) => (
                              <div
                                key={provider}
                                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 hover:bg-gray-300 transition-colors"
                              >
                                {provider[0]}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Image (35% width) */}
                      <div className="relative w-full md:w-[35%] h-56 md:h-auto min-h-64 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Most Popular Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-200 mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Most popular</h3>
        <div className="flex flex-wrap gap-3">
          {['All', 'Clinical Practice', 'Public Health', 'Healthcare Leadership', 'Nursing'].map(
            (tag) => (
              <button
                key={tag}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  tag === 'All'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>
    <AIWidget />
    </div>
  );
}

export default Categories;