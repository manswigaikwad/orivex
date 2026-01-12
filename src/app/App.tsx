import { useState, useEffect, useRef } from "react";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { DeveloperSection } from "./components/DeveloperSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { CompletePackageSection } from "./components/CompletePackageSection";
import { InquiryFormSection } from "./components/InquiryFormSection";
import { ConversionSection } from "./components/ConversionSection";
import { AdminPanel } from "./components/AdminPanel";
import { AdminLogin } from "./components/AdminLogin";
import { LoadingScreen } from "./components/LoadingScreen";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type ViewMode = "website" | "admin-login" | "admin-panel";

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("website");
  const [adminKey, setAdminKey] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const sections = [
    "hero",
    "services",
    "how-it-works",
    "developer",
    "portfolio",
    "testimonials",
    "faq",
    "package",
    "form",
    "conversion",
  ];

  useEffect(() => {
    if (viewMode !== "website") return;

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ section?: string }>; 
      const section = customEvent.detail?.section;
      if (!section) return;
      const index = sections.indexOf(section);
      if (index === -1) return;
      scrollToSection(index);
    };

    window.addEventListener("app:navigate", handler);
    return () => window.removeEventListener("app:navigate", handler);
  }, [viewMode, sections]);

  // Wheel/trackpad scrolling
  useEffect(() => {
    if (viewMode !== "website") return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      e.preventDefault();

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        // Scroll right
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        // Scroll left
        scrollToSection(currentSection - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentSection, isScrolling, viewMode]);

  // Touch/swipe support for mobile
  useEffect(() => {
    if (viewMode !== "website") return;

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
      }

      if (isRightSwipe && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }

      setTouchStart(0);
      setTouchEnd(0);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
      container.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [currentSection, touchStart, touchEnd, viewMode]);

  // Keyboard navigation
  useEffect(() => {
    if (viewMode !== "website") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      if (e.key === "ArrowRight" && currentSection < sections.length - 1) {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === "ArrowLeft" && currentSection > 0) {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSection, isScrolling, viewMode]);

  const scrollToSection = (index: number) => {
    if (index < 0 || index >= sections.length) return;

    setIsScrolling(true);
    setCurrentSection(index);

    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        left: index * window.innerWidth,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  const handleAdminLogin = (key: string) => {
    setAdminKey(key);
    setViewMode("admin-panel");
  };

  const handleAdminLogout = () => {
    setAdminKey("");
    setViewMode("website");
  };

  if (viewMode === "admin-login") {
    return (
      <>
        <AdminLogin
          onLogin={handleAdminLogin}
          onBack={() => setViewMode("website")}
        />
        <Toaster />
      </>
    );
  }

  if (viewMode === "admin-panel") {
    return (
      <>
        <AdminPanel onLogout={handleAdminLogout} adminKey={adminKey} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden bg-gray-950">
        <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-40 hidden md:flex gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-lg">
          {[
            { label: "Home", section: "hero" },
            { label: "Services", section: "services" },
            { label: "How It Works", section: "how-it-works" },
            { label: "Developer", section: "developer" },
            { label: "Portfolio", section: "portfolio" },
            { label: "Contact", section: "form" },
          ].map((item) => (
            <Button
              key={item.section}
              size="sm"
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => {
                const index = sections.indexOf(item.section);
                if (index !== -1) scrollToSection(index);
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div
          ref={containerRef}
          className="flex h-full overflow-x-auto overflow-y-hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="app-slide" style={{ scrollSnapAlign: "start" }}>
            <HeroSection />
          </div>
          <div className="app-slide" style={{ scrollSnapAlign: "start" }}>
            <ServicesSection />
          </div>
          <div className="app-slide" style={{ scrollSnapAlign: "start" }}>
            <HowItWorksSection />
          </div>
          <div className="app-slide" style={{ scrollSnapAlign: "start" }}>
            <DeveloperSection />
          </div>
          <div className="app-slide" style={{ scrollSnapAlign: "start" }}>
            <PortfolioSection />
          </div>
          <div className="app-slide" style={{ scrollSnapAlign: "start" }}>
            <TestimonialsSection />
          </div>
          <div className="app-slide" style={{ scrollSnapAlign: "start" }}>
            <FAQSection />
          </div>
          <div className="app-slide" style={{ scrollSnapAlign: "start" }}>
            <CompletePackageSection />
          </div>
          <div className="app-slide" style={{ scrollSnapAlign: "start" }}>
            <InquiryFormSection />
          </div>
          <div className="app-slide" style={{ scrollSnapAlign: "start" }}>
            <ConversionSection />
          </div>
        </div>

        {/* Navigation dots */}
        <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex gap-2 px-4 py-3 rounded-full border border-white/10 bg-black/30 backdrop-blur-lg">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSection === index
                  ? "bg-blue-500 w-8"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <AnimatePresence>
          {currentSection > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="fixed left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:block"
            >
              <Button
                onClick={() => scrollToSection(currentSection - 1)}
                variant="outline"
                size="icon"
                className="rounded-full border-white/20 bg-black/30 backdrop-blur-lg hover:bg-white/10 text-white w-12 h-12"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </motion.div>
          )}

          {currentSection < sections.length - 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="fixed right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:block"
            >
              <Button
                onClick={() => scrollToSection(currentSection + 1)}
                variant="outline"
                size="icon"
                className="rounded-full border-white/20 bg-black/30 backdrop-blur-lg hover:bg-white/10 text-white w-12 h-12"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          onClick={() => setViewMode("admin-login")}
          className="fixed top-4 sm:top-8 right-4 sm:right-8 z-50 p-3 rounded-full border border-white/10 bg-black/30 backdrop-blur-lg hover:bg-white/10 text-white transition-all duration-300 hover:scale-110 group"
          title="Admin Login"
        >
          <Shield className="w-5 h-5" />
          <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-lg bg-black/80 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Admin Panel
          </span>
        </motion.button>

        {/* Mobile scroll hint */}
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30 md:hidden">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/50 text-sm flex items-center gap-2"
          >
            <span>Swipe</span>
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
      <Toaster />
    </>
  );
}