import { motion } from "motion/react";
import { Code, FileText, Presentation, Video, BookOpen, CheckCircle } from "lucide-react";

const deliverables = [
  {
    icon: Code,
    title: "Source Code",
    description: "Complete, well-commented, production-ready code",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: FileText,
    title: "50-70 Page Documentation",
    description: "Comprehensive project documentation with all technical details",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Presentation,
    title: "Presentation Slides",
    description: "Professional PPT for project presentation and viva",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Video,
    title: "Video Demo",
    description: "Complete walkthrough and demonstration of your project",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: BookOpen,
    title: "Viva Guide",
    description: "Q&A preparation and concept explanations for viva",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: CheckCircle,
    title: "30-Day Support",
    description: "Free post-delivery support for queries and modifications",
    color: "from-pink-500 to-rose-500"
  }
];

export function CompletePackageSection() {
  return (
    <section id="package" className="app-section app-gutter app-section-padding">
      <div className="app-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Complete <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Package</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need for a successful project submission
          </p>
        </motion.div>

        {/* Main package card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg overflow-hidden mb-8"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative"
                >
                  <div className="relative p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {/* Check icon */}
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Additional features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { title: "Plagiarism Free", subtitle: "100% Original Code" },
            { title: "On-Time Delivery", subtitle: "Guaranteed Deadlines" },
            { title: "Unlimited Revisions", subtitle: "Until You're Satisfied" }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg text-center"
            >
              <h4 className="text-lg font-bold text-white mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.subtitle}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
