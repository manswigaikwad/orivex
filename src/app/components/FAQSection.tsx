import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "What is the typical delivery time for projects?",
    answer: "Final year projects typically take 5-7 days, mini projects 3-5 days, and business solutions vary based on complexity. We provide a detailed timeline during the initial consultation."
  },
  {
    question: "Do you provide source code and documentation?",
    answer: "Absolutely! You receive complete source code, 50-70 page documentation, presentation slides, demo video, and viva preparation guide. Everything you need for successful project submission."
  },
  {
    question: "What technologies do you work with?",
    answer: "We work with a wide range of technologies including Python, Java, JavaScript (MERN/MEAN stack), Machine Learning, Deep Learning, Android, IoT, Blockchain, and more. We adapt to your project requirements."
  },
  {
    question: "Can I get updates during development?",
    answer: "Yes! We provide regular progress updates and involve you in key decision points. You can request changes and provide feedback throughout the development process."
  },
  {
    question: "What if I need help during viva/presentation?",
    answer: "We offer comprehensive viva support including mock sessions, Q&A preparation, concept explanation, and presentation tips. We ensure you're fully prepared to defend your project."
  },
  {
    question: "Do you offer refunds if I'm not satisfied?",
    answer: "We have a 100% satisfaction guarantee. If you're not satisfied with the initial deliverable, we'll make revisions until you're happy. We stand behind the quality of our work."
  },
  {
    question: "Can you handle urgent projects?",
    answer: "Yes, we accept urgent projects with expedited delivery. Contact us to discuss your timeline and we'll do our best to accommodate your needs."
  },
  {
    question: "Do you provide post-delivery support?",
    answer: "Yes! We offer free support for 30 days after delivery for any queries or minor modifications. Extended support packages are also available."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="app-section app-gutter app-section-padding">
      <div className="app-container-xs">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about our services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/10 rounded-xl bg-white/5 px-6 data-[state=open]:border-blue-500/30 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-white hover:text-blue-300 transition-colors py-4">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-gray-400">
            Still have questions?{" "}
            <a
              href="https://wa.me/917385726096"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              Contact us on WhatsApp
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
