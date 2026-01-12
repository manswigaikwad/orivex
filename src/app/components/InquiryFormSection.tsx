import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { Send, CheckCircle } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  technology: string;
  deadline: string;
  budgetRange: string;
  additionalRequirements: string;
};

export function InquiryFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0134e8c8/submit-inquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit inquiry");
      }

      toast.success("Inquiry submitted successfully! We'll contact you soon.");

      const whatsappText = encodeURIComponent(
        [
          "New Inquiry Received:",
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Project Type: ${data.projectType}`,
          `Technology: ${data.technology || "N/A"}`,
          `Deadline: ${data.deadline || "N/A"}`,
          `Budget Range: ${data.budgetRange || "N/A"}`,
          `Additional Requirements: ${data.additionalRequirements || "N/A"}`,
        ].join("\n"),
      );
      window.open(`https://wa.me/917385726096?text=${whatsappText}`, "_blank");

      setSubmitted(true);
      reset();
      
      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit inquiry. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry-form" className="app-section app-gutter app-section-padding">
      <div className="app-container-xs">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Start Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Project</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex p-4 rounded-full bg-green-500/20 mb-4">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-400">
                Your inquiry has been submitted successfully. We'll contact you soon!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone Number <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid phone number (10 digits)",
                      },
                    })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                    placeholder="1234567890"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm">{errors.phone.message}</p>
                  )}
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-white">
                    Project Type <span className="text-red-400">*</span>
                  </Label>
                  <Select onValueChange={(value: string) => setValue("projectType", value)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10">
                      <SelectItem value="final-year">Final Year Project</SelectItem>
                      <SelectItem value="mini-project">Mini Project</SelectItem>
                      <SelectItem value="business">Business Digitalization</SelectItem>
                      <SelectItem value="documentation">Documentation Only</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...register("projectType", { required: "Project type is required" })} />
                  {errors.projectType && (
                    <p className="text-red-400 text-sm">{errors.projectType.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Technology */}
                <div className="space-y-2">
                  <Label htmlFor="technology" className="text-white">
                    Preferred Technology
                  </Label>
                  <Input
                    id="technology"
                    {...register("technology")}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                    placeholder="e.g., Python, MERN, ML, Android"
                  />
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-white">
                    Expected Deadline
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    {...register("deadline")}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Budget Range */}
              <div className="space-y-2">
                <Label htmlFor="budgetRange" className="text-white">
                  Budget Range
                </Label>
                <Select onValueChange={(value: string) => setValue("budgetRange", value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10">
                    <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                    <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
                    <SelectItem value="20000-50000">₹20,000 - ₹50,000</SelectItem>
                    <SelectItem value="50000+">₹50,000+</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("budgetRange")} />
              </div>

              {/* Additional Requirements */}
              <div className="space-y-2">
                <Label htmlFor="additionalRequirements" className="text-white">
                  Additional Requirements
                </Label>
                <Textarea
                  id="additionalRequirements"
                  {...register("additionalRequirements")}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 min-h-[120px]"
                  placeholder="Tell us more about your project requirements..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg group"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Inquiry
                    <Send className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
