import { motion } from "motion/react";
import { useState } from "react";
import { 
  GraduationCap, 
  Code, 
  Briefcase, 
  FileText, 
  MessageSquare,
  ArrowRight 
} from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Final Year Projects",
    description: "Complete end-to-end development with source code, documentation, and presentation",
    features: [
      "Custom project development",
      "Latest technologies",
      "100% original code",
      "Complete handover"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Code,
    title: "Mini Projects",
    description: "Quick turnaround projects for semester submissions and practice",
    features: [
      "Fast delivery (3-5 days)",
      "Simple to complex",
      "All domains covered",
      "Affordable pricing"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Briefcase,
    title: "Business Digitalization",
    description: "Transform your business with custom web and mobile applications",
    features: [
      "E-commerce solutions",
      "CRM & ERP systems",
      "Mobile apps",
      "Cloud deployment"
    ],
    color: "from-orange-500 to-red-500"
  },
  {
    icon: FileText,
    title: "Documentation + PPT + Video",
    description: "Professional documentation package for your project submission",
    features: [
      "50-70 page documentation",
      "Presentation slides",
      "Demo video",
      "Project report"
    ],
    color: "from-green-500 to-teal-500"
  },
  {
    icon: MessageSquare,
    title: "Viva Support",
    description: "Expert guidance to ace your project viva and defense",
    features: [
      "Q&A preparation",
      "Mock viva sessions",
      "Concept explanation",
      "Presentation tips"
    ],
    color: "from-indigo-500 to-purple-500"
  }
];

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="app-section app-gutter app-section-padding">
      <div className="app-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions for students and businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Glassmorphism card */}
                <div className="relative h-full p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/20">
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredIndex === index ? "auto" : 0,
                      opacity: hoveredIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 overflow-hidden"
                  >
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2 text-sm text-gray-300">
                        <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </motion.ul>

                  {/* Hover indicator */}
                  <motion.div
                    className="absolute bottom-4 right-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={hoveredIndex === index ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
