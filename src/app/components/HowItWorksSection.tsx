import { motion } from "motion/react";
import { Phone, FileText, Code, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "Requirement Call",
    description: "We understand your project needs, discuss requirements, and provide timeline & quote",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: FileText,
    title: "Project Plan",
    description: "Detailed project blueprint with tech stack, features, and milestones",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Code,
    title: "Build + Updates",
    description: "Development with regular progress updates and your feedback integration",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: CheckCircle,
    title: "Delivery + Viva Support",
    description: "Complete handover with code, documentation, and viva preparation",
    color: "from-green-500 to-teal-500"
  }
];

export function HowItWorksSection() {
  return (
    <section className="app-section app-gutter app-section-padding">
      <div className="app-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            How It <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Simple 4-step process from idea to delivery
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-green-500 opacity-20 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Step number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/50 z-10"
                  >
                    {index + 1}
                  </motion.div>

                  {/* Card */}
                  <div className="relative h-full p-8 pt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Decorative glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                  </div>

                  {/* Arrow connector (desktop only) */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                      className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
