import React, { useEffect, useState } from 'react';

import image1 from '../../assets/images/1.jpg';
import image2 from '../../assets/images/2.jpg';
import image3 from '../../assets/images/3.jpg';
import image4 from '../../assets/images/4.jpg';
import image5 from '../../assets/images/5.jpg';

function GetStarted() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroElement = document.querySelector('.hero-fade');
    if (heroElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(heroElement);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFCFD]">
      

      {/* Hero Image */}
      <div className="w-full">
        <img 
          src={image1} 
          alt="Get Started Hero" 
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-3">
          
          {/* Main Content - Left Side */}
          <div className="lg:w-2/3">
            {/* Hero Statement with Grid */}
            <div className="mb-20 hero-fade" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(50px)', transition: 'all 0.8s ease' }}>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2">
                  <h2 className="text-3xl text-gray-700 mb-6 leading-relaxed">
                    One place where <span className="text-blue-600 font-semibold">Rwanda's healthcare professionals</span> can <span className="text-blue-600 font-semibold">gather</span> together, <span className="text-blue-600 font-semibold">discuss</span> common problems and <span className="text-blue-600 font-semibold">find shared solutions</span>.
                  </h2>
                </div>
                <div className="md:w-1/2">
                  <div className="relative">
                    <img src={image2} alt="Healthcare professionals" className="relative z-10 w-full h-auto rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="mb-16 space-y-6 text-base text-gray-700 leading-relaxed">
              <p>
                The Rwanda Biomedical Centre is a national healthcare institution founded in 2011. Currently serving over 15,000 healthcare professionals, the <strong>RBC</strong> and its educational programs are guided by the purposes and principles contained in its founding <span className="underline cursor-pointer text-blue-600">Charter</span>.
              </p>
              
              <p>
                The RBC Learning Management System has evolved over the years to keep pace with a rapidly changing healthcare landscape.
              </p>
              
              <p>
                But one thing has stayed the same: it remains the one place in Rwanda where all healthcare professionals can gather together, discuss common challenges, and find shared solutions that benefit all of humanity.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Comprehensive Course Library</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Access our growing collection of courses in clinical skills, public health, laboratory medicine, and healthcare management designed by Rwanda's leading medical professionals.
              </p>
              <img src={image1} alt="Comprehensive course library" className="w-full h-auto rounded-lg mb-4" />
              <p className="text-base text-gray-700 leading-relaxed">
                Our courses are developed in partnership with the Ministry of Health and leading healthcare institutions across Rwanda, ensuring the highest quality and relevance to your professional development.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Interactive Learning Experience</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Engage with video lectures, interactive assessments, and live sessions for real-time collaboration with instructors and peers.
              </p>
              <img src={image2} alt="Interactive learning" className="w-full h-auto rounded-lg mb-4" />
              <p className="text-base text-gray-700 leading-relaxed">
                Our platform supports various content types including SCORM packages, downloadable materials for offline access, and discussion forums to facilitate knowledge sharing among healthcare professionals.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Instructors</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Learn from experienced healthcare professionals and certified instructors from Rwanda Biomedical Centre and partner institutions across Rwanda.
              </p>
              <img src={image3} alt="Expert instructors" className="w-full h-auto rounded-lg mb-4" />
              <p className="text-base text-gray-700 leading-relaxed">
                Our instructors bring decades of combined experience in clinical practice, research, and medical education, ensuring you receive world-class training tailored to Rwanda's healthcare context.
              </p>
            </div>

            {/* Section 4 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Recognized Certifications</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Earn digital certificates with QR code verification upon course completion. Certificates are recognized by the Ministry of Health and healthcare institutions nationwide.
              </p>
              <img src={image4} alt="Recognized certifications" className="w-full h-auto rounded-lg mb-4" />
              <p className="text-base text-gray-700 leading-relaxed">
                Your achievements are permanently recorded and can be verified by employers, regulatory bodies, and professional associations, supporting your career advancement and continuing professional development requirements.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Flexible Learning Pathways</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Whether you're pursuing mandatory continuing education, specialized certifications, or professional development, our platform adapts to your learning needs and schedule.
              </p>
              <img src={image5} alt="Flexible learning pathways" className="w-full h-auto rounded-lg mb-4" />
              <p className="text-base text-gray-700 leading-relaxed">
                Access courses anytime, anywhere, with support for offline learning. Track your progress, receive personalized recommendations, and join a community of healthcare professionals committed to excellence.
              </p>
            </div>

            {/* Closing Statement */}
<div className="text-center py-12">
  <p className="text-2xl text-gray-700 leading-relaxed mb-8">
    Join thousands of healthcare professionals advancing their careers through Rwanda Biomedical Centre's comprehensive learning platform.
  </p>
  <button 
    type="button"
    className="px-4 py-4 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-200 text-lg font-semibold"
  >
    Start Learning Today
  </button>
</div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-8">
              
              {/* Dive Deeper Section */}
              <div className="bg-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">DIVE DEEPER</h2>
                
                <div className="space-y-6 text-gray-700">
                  <p className="text-sm leading-relaxed">
                    If you represent a healthcare institution and you seek to partner with Rwanda Biomedical Centre for training programs, visit the <a href="#" className="text-blue-600 hover:underline">Partnership</a> page.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    Learn more about our <a href="#" className="text-blue-600 hover:underline">course offerings</a> or sign up for a <a href="#" className="text-blue-600 hover:underline">free demonstration account</a>.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    Learn more about <a href="#" className="text-blue-600 hover:underline">RBC's mission</a> and the <a href="#" className="text-blue-600 hover:underline">Healthcare Training Network</a>, a community that collectively supports healthcare education in Rwanda.
                  </p>
                </div>

                {/* Search Box */}
                <div className="mt-8">
                  <input 
                    type="text" 
                    placeholder="Search courses..." 
                    className="w-full px-4 py-3 border bg-stone-200 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-[#004370] p-8">
                <h3 className="text-xl font-bold text-gray-300 mb-4">QUICK LINKS</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-white hover:underline text-sm">Browse All Courses</a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:underline text-sm">Enrollment Guide</a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:underline text-sm">Platform Tutorial</a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:underline text-sm">Getting Started FAQ</a>
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

export default GetStarted;