import React from 'react';
import testimonials from '@/data/testimonials';

const Testimonials = () => {
  return (
    <section className="w-full bg-light-primary py-6" id="testimonials">
      {/* Unified container for Siglyk alignment */}
      <div className="mx-auto max-w-7xl px-8 lg:w-[80vw]">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 text-center items-center">
          <span className="text-light-secondary font-bold tracking-widest text-xs uppercase">
            Community
          </span>
          <h2 className="text-text-dark text-4xl md:text-5xl font-extrabold leading-tight">
            Voices from the Community
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="bg-light-primary p-8 rounded-3xl shadow-sm border border-light-secondary/10 flex flex-col hover:shadow-xl hover:shadow-light-secondary/5 transition-all duration-300"
            >
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-1 text-xl">star</span>
                ))}
              </div>
              <p className="text-text-dark italic mb-8 leading-relaxed flex-1">"{item.quote}"</p>
              <div className="flex items-center gap-4 border-t border-light-secondary/5 pt-6">
                <div className="w-11 h-11 rounded-full bg-light-secondary/10 flex items-center justify-center font-bold text-light-secondary">
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-dark">{item.name}</h4>
                  <p className="text-xs text-light-secondary/70 font-medium">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;