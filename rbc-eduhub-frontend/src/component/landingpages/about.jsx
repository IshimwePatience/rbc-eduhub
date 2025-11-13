import React, { useEffect, useState } from 'react';
import Part1 from '../../assets/images/part1.png';
import Part2 from '../../assets/images/part2.png';
import Part3 from '../../assets/images/part3.png';
import Part4 from '../../assets/images/part4.png';

// Placeholder images - replace with actual image imports
const images = [
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=600&fit=crop'
];

function About() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="w-full">
        <img 
          src={images[0]} 
          alt="About Us Hero" 
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
                    Empowering <span className="text-blue-600 font-semibold">healthcare excellence</span> through <span className="text-blue-600 font-semibold">continuous learning</span> and <span className="text-blue-600 font-semibold">professional development</span>.
                  </h2>
                </div>
                <div className="md:w-1/2">
                  <div className="relative">
                    <img src={images[1]} alt="Healthcare professionals" className="relative z-10 w-full h-auto rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Our Story */}
            <div className="mb-16 space-y-6 text-base text-gray-700 leading-relaxed">
              <p>
                Established in 2011, the <strong>Rwanda Biomedical Centre (RBC)</strong> stands as a cornerstone institution in Rwanda's healthcare system. Born from the vision of creating a unified, efficient, and high-quality health service delivery system, RBC has grown to become the leading healthcare institution serving over 15,000 healthcare professionals across the nation.
              </p>
              
              <p>
                Our Learning Management System represents a significant milestone in our journey to democratize medical education. Launched in partnership with the Ministry of Health, this platform embodies our commitment to ensuring that every healthcare professional in Rwanda has access to world-class training and continuous professional development opportunities.
              </p>
              
              <p>
                From rural health centers to urban hospitals, our platform connects healthcare workers across Rwanda, creating a unified community dedicated to excellence in patient care and medical innovation.
              </p>
            </div>

            {/* Section 1 - Our Mission */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                To strengthen Rwanda's healthcare system by providing accessible, high-quality continuing education and professional development opportunities to all healthcare workers, regardless of their location or specialty.
              </p>
              <img 
                src={images[0]} 
                alt="Healthcare mission" 
                className="w-full h-auto rounded-lg mb-4"
              />
              <p className="text-base text-gray-700 leading-relaxed">
                We believe that investing in our healthcare professionals is investing in the health and wellbeing of every Rwandan citizen. Through our comprehensive learning platform, we're building a future where quality healthcare is accessible to all.
              </p>
            </div>

            {/* Section 2 - Our Values */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Core Values</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                <strong>Excellence:</strong> We strive for the highest standards in healthcare education, ensuring our courses meet international quality benchmarks while being contextually relevant to Rwanda.
              </p>
              <img 
                src={images[1]} 
                alt="Core values" 
                className="w-full h-auto rounded-lg mb-4"
              />
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                <strong>Accessibility:</strong> We're committed to breaking down barriers to education, providing flexible learning options that work for busy healthcare professionals in both urban and rural settings.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                <strong>Collaboration:</strong> We foster a community of practice where healthcare professionals can learn from each other, share experiences, and collectively solve challenges facing our healthcare system.
              </p>
            </div>

            {/* Section 3 - Our Impact */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Impact</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                As we launch our Learning Management System, we are committed to training healthcare professionals across all 30 districts of Rwanda. Our platform is designed to improve patient outcomes, enhance clinical practices, and strengthen healthcare delivery systems nationwide.
              </p>
              <img 
                src={images[2]} 
                alt="Impact and reach" 
                className="w-full h-auto rounded-lg mb-4"
              />
              <p className="text-base text-gray-700 leading-relaxed">
                Through partnerships with international organizations and leading medical institutions, we continue to expand our course offerings and reach, ensuring Rwanda's healthcare workforce remains at the forefront of medical knowledge and practice.
              </p>
            </div>

            {/* Section 4 - Our Platform */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Learning Platform</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Built on cutting-edge technology and designed with the needs of busy healthcare professionals in mind, our platform offers an intuitive, user-friendly experience. Features include video lectures, interactive assessments, live virtual sessions, discussion forums, and offline access capabilities.
              </p>
              <img 
                src={images[3]} 
                alt="Learning platform" 
                className="w-full h-auto rounded-lg mb-4"
              />
              <p className="text-base text-gray-700 leading-relaxed">
                Every course is designed by experts and aligned with national healthcare standards and continuing professional development requirements, ensuring your learning directly contributes to your career advancement and patient care quality.
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
                Explore Our Courses
              </button>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-8">
              
              {/* Recognition Section */}
              <div className="bg-stone-200 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recognition from Rwanda's Healthcare Community</h2>
                
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Honored to be recognized by leading healthcare institutions across Rwanda for our commitment to medical education excellence.
                </p>

                {/* Awards/Accolades */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded">
                    <img src={Part1} alt="Award 1" className="h-12 object-contain" />
                  </div>
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded">
                    <img src={Part2} alt="Award 2" className="h-12 object-contain" />
                  </div>
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded">
                    <img src={Part3} alt="Award 3" className="h-12 object-contain" />
                  </div>
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded">
                    <img src={Part4} alt="Award 4" className="h-12 object-contain" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Our Partners</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Collaborating with the Ministry of Health, leading hospitals, and academic institutions to strengthen Rwanda's healthcare system through quality education.
                </p>

                {/* Partners */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center p-3 border border-gray-200 rounded hover:shadow-md transition-shadow">
                    <img src={Part1} alt="Partner 1" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                  <div className="flex items-center justify-center p-3 border border-gray-200 rounded hover:shadow-md transition-shadow">
                    <img src={Part2} alt="Partner 2" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                  <div className="flex items-center justify-center p-3 border border-gray-200 rounded hover:shadow-md transition-shadow">
                    <img src={Part3} alt="Partner 3" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                  <div className="flex items-center justify-center p-3 border border-gray-200 rounded hover:shadow-md transition-shadow">
                    <img src={Part4} alt="Partner 4" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                  <div className="flex items-center justify-center p-3 border border-gray-200 rounded hover:shadow-md transition-shadow">
                    <img src={Part1} alt="Partner 5" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                  <div className="flex items-center justify-center p-3 border border-gray-200 rounded hover:shadow-md transition-shadow">
                    <img src={Part2} alt="Partner 6" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;