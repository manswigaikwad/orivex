import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Computer Engineering Student",
    project: "ML-based Traffic Management System",
    rating: 5,
    text: "Outstanding work! Manswi delivered my final year project ahead of schedule with complete documentation. The viva support was exceptional and I scored 95/100!",
    avatar: "PS"
  },
  {
    name: "Rahul Deshmukh",
    role: "IT Student",
    project: "E-Learning Platform",
    rating: 5,
    text: "Best decision to work with ORIVEX. The code quality is professional, and the project explanation helped me understand every aspect for my viva presentation.",
    avatar: "RD"
  },
  {
    name: "Anjali Patil",
    role: "Business Owner",
    project: "Restaurant Management System",
    rating: 5,
    text: "Transformed my restaurant business with their custom solution. The team was responsive, professional, and delivered exactly what we needed.",
    avatar: "AP"
  },
  {
    name: "Vikram Singh",
    role: "Data Science Student",
    project: "Sentiment Analysis Tool",
    rating: 5,
    text: "Excellent mini project delivery in just 4 days! The documentation was thorough and the code was clean and well-commented. Highly recommended!",
    avatar: "VS"
  },
  {
    name: "Sneha Kulkarni",
    role: "Electronics Student",
    project: "IoT Home Automation",
    rating: 5,
    text: "Perfect blend of hardware and software development. Got all deliverables including demo video and PPT. The viva guide was incredibly helpful!",
    avatar: "SK"
  },
  {
    name: "Amit Joshi",
    role: "MBA Student",
    project: "Business Analytics Dashboard",
    rating: 5,
    text: "Professional service from start to finish. The analytics dashboard exceeded expectations and helped our business make data-driven decisions.",
    avatar: "AJ"
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="app-section app-gutter app-section-padding">
      <div className="app-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Student <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative h-full p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg overflow-hidden hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 w-12 h-12 text-blue-500/10 group-hover:text-blue-500/20 transition-colors" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Project */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300">
                    {testimonial.project}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Decorative glow */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
