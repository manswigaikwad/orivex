import { motion } from "motion/react";
import {
  ExternalLink,
  Github,
  HeartPulse,
  ShoppingCart,
  ScanFace,
  Utensils,
  LineChart,
  Vote,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    title: "AI-Powered Healthcare System",
    description: "Machine learning based disease prediction and diagnosis system with 95% accuracy",
    tech: ["Python", "TensorFlow", "Flask", "React", "PostgreSQL"],
    category: "Final Year Project",
    color: "from-blue-500 to-cyan-500",
    icon: HeartPulse,
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-featured online shopping platform with payment gateway integration",
    tech: ["MERN Stack", "Redux", "Stripe", "AWS"],
    category: "Business Solution",
    color: "from-purple-500 to-pink-500",
    icon: ShoppingCart,
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-908efacfe54d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Smart Attendance System",
    description: "Face recognition based attendance system using deep learning",
    tech: ["Python", "OpenCV", "Deep Learning", "Django"],
    category: "Final Year Project",
    color: "from-orange-500 to-red-500",
    icon: ScanFace,
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Restaurant Management System",
    description: "Complete POS system with inventory management and analytics",
    tech: ["React", "Node.js", "MongoDB", "Material-UI"],
    category: "Business Solution",
    color: "from-green-500 to-teal-500",
    icon: Utensils,
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Social Media Analytics Dashboard",
    description: "Real-time analytics and insights for social media campaigns",
    tech: ["React", "D3.js", "Python", "FastAPI"],
    category: "Mini Project",
    color: "from-indigo-500 to-purple-500",
    icon: LineChart,
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Blockchain Voting System",
    description: "Secure and transparent voting system using blockchain technology",
    tech: ["Solidity", "Web3.js", "React", "Ethereum"],
    category: "Final Year Project",
    color: "from-pink-500 to-rose-500",
    icon: Vote,
    imageUrl:
      "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&w=1200&q=80",
  }
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="app-section app-gutter app-section-padding">
      <div className="app-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcase of successful projects delivered with excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative h-full p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg overflow-hidden hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                
                {/* Category badge */}
                <div className="relative mb-4">
                  <Badge className={`bg-gradient-to-r ${project.color} text-white border-0`}>
                    {project.category}
                  </Badge>
                </div>

                {/* Project image/banner */}
                <div className="relative mb-5 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-25 pointer-events-none`} />
                  <div className="relative h-32">
                    <ImageWithFallback
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0 opacity-35 pointer-events-none"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18) 0, rgba(255,255,255,0) 50%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.14) 0, rgba(255,255,255,0) 55%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="rounded-full bg-black/35 px-4 py-2 backdrop-blur-md">
                        <project.icon className="w-7 h-7 text-white/95" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="relative text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="relative flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs rounded-full border border-white/20 bg-white/5 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="relative z-10 flex gap-2">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex-1"
                    onClick={() => {
                      const formSection = document.getElementById('inquiry-form');
                      formSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-500/50 hover:bg-purple-500/10 text-white backdrop-blur-sm"
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </div>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${project.color} opacity-10 blur-2xl pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View more button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
