import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
   {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-3">
          
          {/* Main Content - Left Side */}
          <div className="lg:w-2/3">
            {/* Introduction */}
            <div className="mb-16 space-y-6 text-base text-gray-700 leading-relaxed">
             <p className="text-3xl text-gray-700 leading-relaxed">
  Have questions about our <span className="text-blue-600 font-semibold">Learning Management System</span>? We're <span className="text-blue-600 font-semibold">here to help</span>.
</p>
              <p>
                Whether you're a healthcare professional looking to enroll in courses, an institution seeking partnership opportunities, or simply need technical support, our team is ready to assist you.
              </p>
              <p>
                The Rwanda Biomedical Centre is committed to providing excellent support to all users of our platform. Our dedicated team ensures that you have the resources and assistance needed to make the most of your learning experience.
              </p>
            </div>

            {/* Google Maps Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visit Our Office</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                Rwanda Biomedical Centre is located in Kigali, Rwanda. We welcome visits by appointment for institutional partnerships and consultations.
              </p>
              <div className="overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.82987352748!2d30.01985795!3d-1.9440726999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xe9f3b4e887122e67!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rwanda Biomedical Centre Location"
                ></iframe>
              </div>
              <p className="text-base text-gray-700 leading-relaxed mt-4">
                Our central location in Kigali makes us accessible to healthcare professionals across Rwanda. We encourage you to schedule an appointment before visiting to ensure our team can give you their full attention.
              </p>
            </div>
            {/* Social Media Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Connect With Us</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                Follow us on social media for updates on new courses, healthcare news, professional development opportunities, and success stories from our community of healthcare professionals.
              </p>
              
              <div className="flex gap-4 flex-wrap">
                {/* LinkedIn */}
                <Link 
                  to="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-200 hover:bg-gray-300 p-4 rounded-full transition-all flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>

                {/* X (Twitter) */}
                <Link 
                  to="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-200 hover:bg-gray-300 p-4 rounded-full transition-all flex items-center justify-center"
                  aria-label="X"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Link>

                {/* Facebook */}
                <Link 
                  to="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-200 hover:bg-gray-300 p-4 rounded-full transition-all flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>

                {/* Instagram */}
                <Link 
                  to="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-200 hover:bg-gray-300 p-4 rounded-full transition-all flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </Link>

                {/* YouTube */}
                <Link 
                  to="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-200 hover:bg-gray-300 p-4 rounded-full transition-all flex items-center justify-center"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </Link>

                {/* WhatsApp */}
                <Link 
                  to="https://wa.me/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-200 hover:bg-gray-300 p-4 rounded-full transition-all flex items-center justify-center"
                  aria-label="WhatsApp"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </Link>
              </div>
              
              <p className="text-base text-gray-700 leading-relaxed mt-6">
                Join our growing community and stay informed about the latest developments in healthcare education and professional development opportunities across Rwanda.
              </p>
            </div>

            {/* FAQ Preview Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                Before reaching out, you might find answers to common questions in our FAQ section. Here are some of the most frequently asked questions:
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">How do I enroll in a course?</h4>
                  <p className="text-sm text-gray-700">
                    Simply browse our course catalog, select the course you're interested in, and click the "Enroll" button. You'll need to create an account if you haven't already.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Are certificates recognized by the Ministry of Health?</h4>
                  <p className="text-sm text-gray-700">
                    Yes, all certificates issued through our platform are officially recognized by the Rwanda Ministry of Health and can be verified through QR codes.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Can I access courses offline?</h4>
                  <p className="text-sm text-gray-700">
                    Yes, many of our courses offer downloadable materials for offline access. Video content can be downloaded within the mobile app for viewing without internet connection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-8">
              
              {/* Contact Details Section */}
              <div className="bg-stone-200 p-8 rounded-lg shadow-sm mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">CONTACT DETAILS</h2>
                
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Email Address</h4>
                    <a href="mailto:ridsdatascience@gmail.com" className="text-blue-600 hover:underline text-sm break-words">
                      ridsdatascience@gmail.com
                    </a>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Office Hours</h4>
                    <p className="text-sm leading-relaxed">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Response Time</h4>
                    <p className="text-sm leading-relaxed">
                      We typically respond to inquiries within 24-48 hours during business days.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Location</h4>
                    <p className="text-sm leading-relaxed">
                      Kigali, Rwanda
                    </p>
                  </div>
                </div>

                {/* Search Box */}
                <div className="mt-8">
                  <input 
                    type="text" 
                    placeholder="Search help topics..." 
                    className="w-full px-4 py-3 border bg-stone-200 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {/* Emergency Contact */}
              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-red-800 mb-3">Emergency Support</h3>
                <p className="text-sm text-red-700 leading-relaxed mb-3">
                  For urgent technical issues affecting patient care or critical training deadlines, please contact our emergency support line.
                </p>
                <p className="text-sm font-semibold text-red-800">
                  Available 24/7 for critical issues
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;