import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";

export function ConversionSection() {
  return (
    <section id="conversion" className="app-section app-gutter app-section-padding">
      <div className="app-container-sm">
        <div className="relative p-6 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Content */}
          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Ready to Get{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Started?
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Transform your ideas into reality with professional development and complete support. Let's build something amazing together!
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl group"
                onClick={() => {
                  const formSection = document.getElementById('inquiry-form');
                  formSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Your Project Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl"
                onClick={() => window.open('https://wa.me/917385726096', '_blank')}
              >
                <MessageCircle className="mr-2" />
                Chat on WhatsApp
              </Button>
            </motion.div>

            {/* Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-5 h-5 text-blue-400" />
                <a
                  href="tel:+917385726096"
                  className="hover:text-blue-300 transition-colors"
                >
                  +91 73857 26096
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-5 h-5 text-purple-400" />
                <a
                  href="mailto:manswiproject11@gmail.com"
                  className="hover:text-purple-300 transition-colors"
                >
                  manswiproject11@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-green-500/30 bg-green-500/10"
            >
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-300 font-medium">
                Available 24/7 • Response within 2 hours
              </span>
            </motion.div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-gray-400">
              <div className="text-sm">
                © {new Date().getFullYear()} ORIVEX. All rights reserved.
              </div>
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={() => window.location.href = 'tel:7385726096'}
                  aria-label="Call"
                >
                  <Phone className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  onClick={() => window.open('https://wa.me/917385726096', '_blank')}
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}
