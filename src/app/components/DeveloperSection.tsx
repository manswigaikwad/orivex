import { motion } from "motion/react";
import { Mail, Phone, MessageCircle, Code, Brain, Database, Smartphone } from "lucide-react";
import { Button } from "./ui/button";

const skills = [
  { name: "Full-Stack Development", icon: Code, color: "from-blue-500 to-cyan-500" },
  { name: "ML/AI", icon: Brain, color: "from-purple-500 to-pink-500" },
  { name: "Data Analytics", icon: Database, color: "from-orange-500 to-red-500" },
  { name: "Android Development", icon: Smartphone, color: "from-green-500 to-teal-500" }
];

export function DeveloperSection() {
  return (
    <section id="developer" className="app-section app-gutter app-section-padding">
      <div className="app-container-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Meet Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Developer</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Expert engineering and personalized support for your success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg overflow-hidden group">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Profile image placeholder */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">MG</span>
                  </div>
                </div>
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-500/20 pointer-events-none"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Name and title */}
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Manswi Gaikwad
                </h3>
                <p className="text-lg text-blue-400 font-medium mb-4">
                  Data Science Engineer
                </p>
                <p className="text-lg text-purple-300 font-medium mb-4">
                  Project Developer
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Passionate about building innovative solutions and helping students achieve their academic goals with professional project development.
                </p>
              </div>

              {/* Quick contact buttons */}
              <div className="relative z-10 flex flex-wrap gap-3 justify-center">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={() => window.location.href = 'tel:7385726096'}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => window.location.href = 'mailto:manswiproject11@gmail.com'}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  onClick={() => window.open('https://wa.me/917385726096', '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Expertise & Skills
              </h3>
              <p className="text-gray-400">
                Specialized in cutting-edge technologies and full-stack development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <div className="relative p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg hover:border-white/20 transition-all duration-300 overflow-hidden">
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className="relative flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${skill.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">
                            {skill.name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
