import testimonial1 from "../../assets/testimonial/testimonial1.png";
import testimonial2 from "../../assets/testimonial/testimonial2.png";
import testimonial3 from "../../assets/testimonial/testimonial3.png";
import { useState, useEffect } from "react";


const Testimonial = () => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  const testimonials = [
    {
      id: 1,
      image: testimonial1,
      altText: "Customer testimonial photo from Jay Patel",
      quote: "Shopwave made shopping so easy! The interface is smooth, checkout was fast, and my order arrived quickly. Amazing quality!",
      name: "Jay Patel",
      title: "Senior Product Designer"
    },
    {
      id: 2,
      image: testimonial2,
      altText: "Customer testimonial photo from Tirth Pipaliya",
      quote: "Love Shopwave's variety and fast delivery! Customer support was great when I had a query. My go-to shopping site!",
      name: "Tirth Pipaliya",
      title: "UI Developer"
    },
    {
      id: 3,
      image: testimonial3,
      altText: "Customer testimonial photo from Priya Sharma",
      quote: "Shopwave is fantastic! Clear product details and quick delivery made my shopping experience perfect. Will shop again!",
      name: "Priya Sharma",
      title: "CTO"
    }
  ];

  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        {/* main  */}
        <div className="container px-5 py-10 mx-auto">
          {/* Heading  */}
          <h1 className=' text-center text-3xl font-bold text-black' >Testimonial</h1>
          {/* para  */}
          <h2 className=' text-center text-2xl font-semibold mb-10' >What our <span className=' text-pink-500'>customers</span> are saying</h2>

          {/* Mobile: Show one testimonial at a time with auto-rotation */}
          <div className="lg:hidden flex flex-col items-center">
            <div className="w-full max-w-md p-6 text-center">
              <img 
                alt={testimonials[currentIndex].altText} 
                className="w-20 h-20 mb-6 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" 
                src={testimonials[currentIndex].image} 
              />
              <p className="leading-relaxed mb-4">{testimonials[currentIndex].quote}</p>
              <span className="inline-block h-1 w-10 rounded bg-pink-500 mb-4" />
              <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">{testimonials[currentIndex].name}</h2>
              <p className="text-gray-500">{testimonials[currentIndex].title}</p>
            </div>
            
            {/* Navigation dots */}
            <div className="flex space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? 'bg-pink-500' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Show all testimonials */}
          <div className="hidden lg:flex flex-wrap -m-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                <div className="h-full text-center">
                  <img 
                    alt={testimonial.altText} 
                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" 
                    src={testimonial.image} 
                  />
                  <p className="leading-relaxed">{testimonial.quote}</p>
                  <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                  <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">{testimonial.name}</h2>
                  <p className="text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonial