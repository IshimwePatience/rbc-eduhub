import React, { useState, useEffect } from 'react';
import { Star, Award, Users, TrendingUp, Check, ArrowRight } from 'lucide-react';

// Placeholder images - replace with your actual imports
import image4 from '../../assets/images/4.jpg';
const image1 = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800';
const image2 = 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800';
const part1 = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400';
const part2 = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400';
const part3 = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400';
const part4 = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800';

function Instructors() {
  const [visibleCards, setVisibleCards] = useState(false);

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

    const cardsContainer = document.querySelector('.instructors-grid');
    if (cardsContainer) {
      observer.observe(cardsContainer);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Users, number: '500+', label: 'Expert Instructors' },
    { icon: Award, number: '10,000+', label: 'Students Trained' },
    { icon: TrendingUp, number: '4.8/5', label: 'Average Rating' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
    {/* Hero Section */}
      <div className="bg-gray-100 text-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="py-12 px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Strengthen employability to attract more students
              </h1>
              <p className="text-base md:text-lg text-gray-900 mb-6 leading-relaxed">
                Equip students with the most in-demand skills and prepare them for job success with our world-class instructors.
              </p>
            </div>

            <div className="relative h-full min-h-[400px]">
              <img
                src={image1}
                alt="Instructors"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
      {/* What Instructors Can Do - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:w-2/3">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What You Can Do as an Instructor</h2>
            <p className="text-gray-600 text-lg mb-8">Our platform provides comprehensive tools to create, manage, and deliver healthcare education with powerful features designed specifically for educators.</p>

            {/* Instructor Tools & Capabilities - image cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="overflow-hidden">
                <div className="h-44 overflow-hidden">
                  <img src={image2} alt="Course creation" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Create & Manage Courses</h3>
                  <p className="text-gray-600 text-sm">Build comprehensive courses with modules, video lectures, documents, and interactive content. Organize learning outcomes and publish to students instantly.</p>
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="h-44 overflow-hidden">
                  <img src={image1} alt="Live sessions" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Host Live Sessions</h3>
                  <p className="text-gray-600 text-sm">Conduct interactive live classes with screen sharing, Q&A, polls, and recording. Reach learners across Rwanda in real-time or asynchronously.</p>
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="h-44 overflow-hidden">
                  <img src={part4} alt="Assessments" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Create Assessments</h3>
                  <p className="text-gray-600 text-sm">Build quizzes, assignments, and exams. Set passing criteria, time limits, and auto-grading. Track student performance and provide feedback.</p>
                </div>
              </div>
            </div>

            {/* Instructor Features with steps */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg border border-gray-200 flex flex-col items-start">
                <img src={part1} alt="Progress tracking" className="w-full h-28 object-cover rounded mb-4" />
                <h4 className="font-semibold mb-2">Student Progress Tracking</h4>
                <p className="text-gray-600 text-sm">Monitor learner engagement, completion rates, assessment scores, and time spent. Identify at-risk students and provide targeted support.</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-gray-200 flex flex-col items-start">
                <img src={part2} alt="Mentoring" className="w-full h-28 object-cover rounded mb-4" />
                <h4 className="font-semibold mb-2">Mentorship & Feedback</h4>
                <p className="text-gray-600 text-sm">Provide personalized feedback on assignments and exams. Mentor students through discussion forums and one-on-one guidance.</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-gray-200 flex flex-col items-start">
                <img src={part3} alt="Analytics" className="w-full h-28 object-cover rounded mb-4" />
                <h4 className="font-semibold mb-2">Analytics & Insights</h4>
                <p className="text-gray-600 text-sm">Access detailed course analytics, student engagement metrics, and performance reports. Use data to improve course effectiveness.</p>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-8">
              <div className="bg-stone-200 p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Instructor Support</h3>
                <p className="text-gray-700 text-sm mb-4">We provide comprehensive resources and support to help you succeed as an educator on our platform.</p>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">Get Started</button>
              </div>

              <div className="bg-white p-6">
                <h4 className="text-lg font-semibold mb-3 text-gray-800">Available Resources</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                
                    <a href="#" className="text-blue-600 hover:underline">Instructor Documentation</a>
                  </li>
                  <li className="flex items-start gap-2">
                
                    <a href="#" className="text-blue-600 hover:underline">Course Design Guide</a>
                  </li>
                  <li className="flex items-start gap-2">
                
                    <a href="#" className="text-blue-600 hover:underline">Technical Support</a>
                  </li>
                  <li className="flex items-start gap-2">
                
                    <a href="#" className="text-blue-600 hover:underline">Training Videos</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructors;