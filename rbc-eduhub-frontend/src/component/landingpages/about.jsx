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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">About Us</h1>
          <div className="w-full h-px bg-gray-300"></div>
        </div>
      </div>

      {/* Hero Section with Cycling Images Grid */}
      <div className="relative bg-[#061c30] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {images.map((img, index) => (
              <div
                key={index}
                className="aspect-square rounded-full overflow-hidden transition-all duration-1000 transform"
                style={{
                  opacity: currentImageIndex === index ? 1 : 0.4,
                  transform: currentImageIndex === index ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: currentImageIndex === index ? '0 20px 40px rgba(59, 130, 246, 0.5)' : 'none'
                }}
              >
                <img 
                  src={img} 
                  alt={`Healthcare professional ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Mission Statement */}
        <div className="text-center mb-20">
          <h2 className="text-4xl text-gray-700 mb-6 leading-relaxed">
            Empowering <span className="text-blue-600 font-semibold">healthcare excellence</span> through <span className="text-blue-600 font-semibold">continuous learning</span> and <span className="text-blue-600 font-semibold">professional development</span>.
          </h2>
        </div>

        {/* Our Story */}
        <div className="mb-20 space-y-6 text-lg text-gray-700 leading-relaxed">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h3>
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
        <div className="mb-20">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To strengthen Rwanda's healthcare system by providing accessible, high-quality continuing education and professional development opportunities to all healthcare workers, regardless of their location or specialty.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that investing in our healthcare professionals is investing in the health and wellbeing of every Rwandan citizen. Through our comprehensive learning platform, we're building a future where quality healthcare is accessible to all.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src={images[0]} 
                alt="Healthcare mission" 
                className="w-full h-auto rounded-full shadow-lg aspect-square object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 2 - Our Values */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Core Values</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Excellence:</strong> We strive for the highest standards in healthcare education, ensuring our courses meet international quality benchmarks while being contextually relevant to Rwanda.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Accessibility:</strong> We're committed to breaking down barriers to education, providing flexible learning options that work for busy healthcare professionals in both urban and rural settings.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Collaboration:</strong> We foster a community of practice where healthcare professionals can learn from each other, share experiences, and collectively solve challenges facing our healthcare system.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src={images[1]} 
                alt="Core values" 
                className="w-full h-auto rounded-full shadow-lg aspect-square object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 3 - Our Impact */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Impact</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                As we launch our Learning Management System, we are committed to training healthcare professionals across all 30 districts of Rwanda. Our platform is designed to improve patient outcomes, enhance clinical practices, and strengthen healthcare delivery systems nationwide.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through partnerships with international organizations and leading medical institutions, we continue to expand our course offerings and reach, ensuring Rwanda's healthcare workforce remains at the forefront of medical knowledge and practice.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src={images[2]} 
                alt="Impact and reach" 
                className="w-full h-auto rounded-full shadow-lg aspect-square object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 4 - Our Platform */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Learning Platform</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Built on cutting-edge technology and designed with the needs of busy healthcare professionals in mind, our platform offers an intuitive, user-friendly experience. Features include video lectures, interactive assessments, live virtual sessions, discussion forums, and offline access capabilities.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every course is designed by experts and aligned with national healthcare standards and continuing professional development requirements, ensuring your learning directly contributes to your career advancement and patient care quality.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src={images[3]} 
                alt="Learning platform" 
                className="w-full h-auto rounded-full shadow-lg aspect-square object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 5 - Our Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Recognition from Rwanda's Healthcare Community</h3>
            <p className="text-lg text-gray-600">
              Honored to be recognized by leading healthcare institutions across Rwanda for our commitment to medical education excellence.
            </p>
          </div>
          
          {/* Awards/Accolades Row */}
          <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap mb-16">
            <img src={Part1} alt="Award 1" className="h-20 object-contain" />
            <img src={Part2} alt="Award 2" className="h-20 object-contain" />
            <img src={Part3} alt="Award 3" className="h-20 object-contain" />
            <img src={Part4} alt="Award 4" className="h-20 object-contain" />
            <img src={Part1} alt="Award 5" className="h-20 object-contain" />
            <img src={Part2} alt="Award 6" className="h-20 object-contain" />
          </div>

          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Partnering with Rwanda's Leading Healthcare Institutions</h3>
            <p className="text-lg text-gray-600">
              Collaborating with the Ministry of Health, leading hospitals, and academic institutions to strengthen Rwanda's healthcare system through quality education.
            </p>
          </div>

          {/* Partners Row 1 */}
          <div className="flex justify-center items-center gap-12 md:gap-16 flex-wrap mb-12">
            <img src={Part1} alt="Partner 1" className="h-16 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src={Part2} alt="Partner 2" className="h-16 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src={Part3} alt="Partner 3" className="h-16 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src={Part4} alt="Partner 4" className="h-16 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src={Part1} alt="Partner 5" className="h-16 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src={Part2} alt="Partner 6" className="h-16 object-contain grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;