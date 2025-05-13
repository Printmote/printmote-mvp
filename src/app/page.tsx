export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-16 px-6 py-12 font-sans">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Printmote</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Remote-first printing service for busy professionals and SMEs in Ghana. Order posters, flyers, business cards, and more — all online.
        </p>
        <a
          href="#contact"
          className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition"
        >
          Place Your Order
        </a>
      </section>

      {/* Services Section */}
      <section id="services" className="space-y-8">
        <h2 className="text-2xl font-semibold text-center">Our Services</h2>
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-gray-700">
          <li className="border p-4 rounded shadow-sm hover:shadow-md">Posters</li>
          <li className="border p-4 rounded shadow-sm hover:shadow-md">Banners</li>
          <li className="border p-4 rounded shadow-sm hover:shadow-md">Flyers</li>
          <li className="border p-4 rounded shadow-sm hover:shadow-md">Business Cards</li>
          <li className="border p-4 rounded shadow-sm hover:shadow-md">Packaging Materials</li>
          <li className="border p-4 rounded shadow-sm hover:shadow-md">Branded Souvenirs (Coming Soon)</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-100 px-6 py-12 text-center rounded">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p>Message us on WhatsApp or send us an email to place your order.</p>
        <a
          href="https://wa.me/233XXXXXXXXX" // Replace with your actual WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition"
        >
          WhatsApp Us
        </a>
      </section>
    </div>
  );
}
