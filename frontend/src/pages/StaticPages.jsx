import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Contact Us Page
export function ContactPage() {
  return (
    <>
      <Header />
      <div className="px-6 md:px-20 py-16 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="mb-4 text-gray-700">Have any questions? We'd love to hear from you.</p>
        <form className="space-y-4 max-w-xl">
          <input type="text" placeholder="Name" className="input w-full" required />
          <input type="email" placeholder="Email" className="input w-full" required />
          <textarea placeholder="Your Message" className="input w-full h-32" required></textarea>
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Send Message</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

// FAQ Page
export function FAQPage() {
  return (
    <>
      <Header />
      <div className="px-6 md:px-20 py-16 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">How can I track my order?</h2>
            <p className="text-gray-700">You can track your order in your account under "Orders".</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">What is your return policy?</h2>
            <p className="text-gray-700">Returns are accepted within 7 days of delivery. Please contact support.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Do you ship internationally?</h2>
            <p className="text-gray-700">Currently, we ship only within India.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Privacy Policy Page
export function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="px-6 md:px-20 py-16 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">We respect your privacy and are committed to protecting your personal information. We do not share your data with third parties except as necessary to process your orders.</p>
      </div>
      <Footer />
    </>
  );
}

// Terms and Conditions Page
export function TermsPage() {
  return (
    <>
      <Header />
      <div className="px-6 md:px-20 py-16 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="text-gray-700 mb-4">By using our website, you agree to our terms of service, including product usage, payment, shipping policies, and return rules.</p>
      </div>
      <Footer />
    </>
  );
}
