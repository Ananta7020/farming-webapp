import React from 'react';

function AboutPage() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">🌿 About Our Farming App</h1>

        <p className="text-gray-700 text-lg mb-4">
          Our mission is to empower farmers with technology. This Farming Web App helps farmers manage their crops,
          track weather forecasts, monitor expenses, and access important agricultural tips and market prices — all in one place.
        </p>

        <p className="text-gray-700 text-lg mb-4">
          Built with love using <span className="font-semibold text-green-600">React</span>, <span className="font-semibold text-green-600">Node.js</span>, and <span className="font-semibold text-green-600">MongoDB</span>,
          this platform ensures ease of use and real-time access to crucial farming information.
        </p>

        <p className="text-gray-700 text-lg mb-4">
          Whether you're a small-scale farmer or managing large fields, our app is designed to make your agricultural journey
          smarter, faster, and more efficient.
        </p>

        <p className="text-gray-700 text-lg mb-2">
          🌾 Developed by passionate coders for passionate growers.
        </p>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">Version 1.0.0 • Made in India 🇮🇳</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
