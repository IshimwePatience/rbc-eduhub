import React, { useEffect, useState } from 'react';
import image1 from '../../assets/images/1.jpg';
import image2 from '../../assets/images/2.jpg';
import image3 from '../../assets/images/3.jpg';
import image4 from '../../assets/images/4.jpg';
import image5 from '../../assets/images/5.jpg';

function GetStarted() {
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const observers = [];
    const elements = document.querySelectorAll('.fade-element');
    
    elements.forEach((element, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisible(prev => ({ ...prev, [index]: true }));
              }, index * 100);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Get Started</h1>
          <div className="w-full h-px bg-gray-300"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Hero Statement */}
        <div className="text-center mb-20 fade-element" style={{ opacity: visible[0] ? 1 : 0, transform: visible[0] ? 'translateY(0)' : 'translateY(-30px)', transition: 'all 0.8s ease' }}>
          <h2 className="text-4xl text-gray-700 mb-6 leading-relaxed">
            One place where <span className="text-blue-600 font-semibold">Rwanda's healthcare professionals</span> can <span className="text-blue-600 font-semibold">gather</span> together, <span className="text-blue-600 font-semibold">discuss</span> common problems and <span className="text-blue-600 font-semibold">find shared solutions</span>.
          </h2>
        </div>

        {/* Introduction Paragraphs */}
        <div className="mb-20 space-y-6 text-lg text-gray-700 leading-relaxed fade-element" style={{ opacity: visible[1] ? 1 : 0, transform: visible[1] ? 'translateX(0)' : 'translateX(-50px)', transition: 'all 0.8s ease' }}>
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

        {/* Section 1 with Image Right */}
        <div className="mb-20 fade-element" style={{ opacity: visible[2] ? 1 : 0, transform: visible[2] ? 'translateX(0)' : 'translateX(-50px)', transition: 'all 0.8s ease' }}>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Comprehensive Course Library</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
  Access our growing collection of courses in clinical skills, public health, laboratory medicine, and healthcare management designed by Rwanda's leading medical professionals.
</p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our courses are developed in partnership with the Ministry of Health and leading healthcare institutions across Rwanda, ensuring the highest quality and relevance to your professional development.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src={image1} alt="Healthcare professionals learning" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>

        {/* Section 2 with Image Left */}
        <div className="mb-20 fade-element" style={{ opacity: visible[3] ? 1 : 0, transform: visible[3] ? 'translateX(0)' : 'translateX(50px)', transition: 'all 0.8s ease' }}>
          <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Interactive Learning Experience</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Engage with video lectures, interactive assessments, and live sessions for real-time collaboration with instructors and peers.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our platform supports various content types including SCORM packages, downloadable materials for offline access, and discussion forums to facilitate knowledge sharing among healthcare professionals.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src={image2} alt="Interactive learning platform" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>

        {/* Section 3 with Image Right */}
        <div className="mb-20 fade-element" style={{ opacity: visible[4] ? 1 : 0, transform: visible[4] ? 'translateY(0)' : 'translateY(50px)', transition: 'all 0.8s ease' }}>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Expert Instructors</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Learn from experienced healthcare professionals and certified instructors from Rwanda Biomedical Centre and partner institutions across Rwanda.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our instructors bring decades of combined experience in clinical practice, research, and medical education, ensuring you receive world-class training tailored to Rwanda's healthcare context.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src={image3} alt="Expert medical instructors" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>

        {/* Section 4 with Image Left */}
        <div className="mb-20 fade-element" style={{ opacity: visible[5] ? 1 : 0, transform: visible[5] ? 'translateY(0)' : 'translateY(50px)', transition: 'all 0.8s ease' }}>
          <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Recognized Certifications</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Earn digital certificates with QR code verification upon course completion. Certificates are recognized by the Ministry of Health and healthcare institutions nationwide.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Your achievements are permanently recorded and can be verified by employers, regulatory bodies, and professional associations, supporting your career advancement and continuing professional development requirements.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src={image4} alt="Digital certificates" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>

        {/* Final Section with Image Right */}
        <div className="mb-20 fade-element" style={{ opacity: visible[6] ? 1 : 0, transform: visible[6] ? 'translateX(0)' : 'translateX(-50px)', transition: 'all 0.8s ease' }}>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Flexible Learning Pathways</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Whether you're pursuing mandatory continuing education, specialized certifications, or professional development, our platform adapts to your learning needs and schedule.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Access courses anytime, anywhere, with support for offline learning. Track your progress, receive personalized recommendations, and join a community of healthcare professionals committed to excellence.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src={image5} alt="Flexible learning" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center py-12 fade-element" style={{ opacity: visible[7] ? 1 : 0, transform: visible[7] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <p className="text-2xl text-gray-700 leading-relaxed mb-8">
            Join thousands of healthcare professionals advancing their careers through Rwanda Biomedical Centre's comprehensive learning platform.
          </p>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Start Learning Today
          </button>
        </div>

      </div>
    </div>
  );
}

export default GetStarted;