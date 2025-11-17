import React, { useEffect, useState } from 'react';

// Placeholder images - replace with your actual imports
const image1 = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800";
const image2 = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800";
const image3 = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800";
const imagel = "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800";
const image5 = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800";
import image4 from '../../assets/images/4.jpg';

function Certificates() {
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
               src={image4} 
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
                    Earn <span className="text-blue-600 font-semibold">recognized digital certificates</span> that <span className="text-blue-600 font-semibold">validate your expertise</span> and support your <span className="text-blue-600 font-semibold">professional development</span>.
                  </h2>
                </div>
                <div className="md:w-1/2">
                  <div className="relative">
                    <img src={image1} alt="Healthcare professionals" className="relative z-10 w-full h-auto rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="mb-16 space-y-6 text-base text-gray-700 leading-relaxed">
              <p>
                The Rwanda Biomedical Centre issues digital certificates with QR code verification to all healthcare professionals who successfully complete their training programs.
              </p>
              
              <p>
                Each certificate is officially recognized by the Ministry of Health and accepted by healthcare institutions nationwide.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Digital Certificate with QR Verification</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Upon successful course completion, receive an instantly downloadable digital certificate featuring a unique QR code that enables real-time verification of your credentials.
              </p>
              <img src={image1} alt="Digital certificate verification" className="w-full h-auto rounded-lg mb-4" />
              <p className="text-base text-gray-700 leading-relaxed">
                Each certificate includes your personal details, course information, completion date, and a secure verification code. Employers can scan the QR code to instantly confirm authenticity.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ministry of Health Recognition</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                All RBC certificates carry official recognition from the Ministry of Health and are accepted by healthcare facilities, regulatory bodies, and professional associations throughout Rwanda.
              </p>
              <img src={image2} alt="Ministry recognition" className="w-full h-auto rounded-lg mb-4" />
              <p className="text-base text-gray-700 leading-relaxed">
                Your certificates contribute directly to continuing professional development (CPD) requirements and support licensure renewal processes.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Secure and Tamper-Proof</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Our certificates utilize advanced security features including blockchain-backed verification, unique certificate IDs, and encrypted QR codes to prevent fraud and ensure authenticity.
              </p>
              <img src={image3} alt="Security features" className="w-full h-auto rounded-lg mb-4" />
            </div>

            {/* Section 4 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Career Advancement Support</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Build a comprehensive portfolio of credentials that demonstrate your commitment to professional excellence and continuous learning throughout your healthcare career.
              </p>
              <img src={imagel} alt="Career advancement" className="w-full h-auto rounded-lg mb-4" />
            </div>

            {/* Section 5 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Instant Access and Sharing</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Download your certificate immediately upon course completion in high-resolution PDF format, ready for printing or digital sharing. No waiting period required.
              </p>
              <img src={image5} alt="Access and sharing" className="w-full h-auto rounded-lg mb-4" />
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
                    If you represent a healthcare institution and you seek to partner with Rwanda Biomedical Centre for certificate programs, visit the <a href="#" className="text-blue-600 hover:underline">Partnership</a> page.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    Learn more about our <a href="#" className="text-blue-600 hover:underline">verification system</a> or sign up for a <a href="#" className="text-blue-600 hover:underline">free demonstration account</a>.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    Learn more about <a href="#" className="text-blue-600 hover:underline">RBC's mission</a> and the <a href="#" className="text-blue-600 hover:underline">Healthcare Training Network</a>, a community that collectively supports healthcare education in Rwanda.
                  </p>
                </div>

                {/* Search Box */}
                <div className="mt-8">
                  <input 
                    type="text" 
                    placeholder="Search certificates..." 
                    className="w-full px-4 py-3 border bg-stone-200 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-[#004370] p-8">
                <h3 className="text-xl font-bold text-gray-300 mb-4">QUICK LINKS</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-white hover:underline text-sm">View Sample Certificate</a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:underline text-sm">Verify a Certificate</a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:underline text-sm">Download Certificate Template</a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:underline text-sm">Certificate FAQ</a>
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

export default Certificates;