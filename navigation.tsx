import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/hooks/use-language";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "services", label: t.nav.services },
    { id: "tracking", label: t.nav.tracking },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/90 backdrop-blur-md"
      } border-b border-gray-200`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className={`flex items-center ${isRTL ? "space-x-4 space-x-reverse" : "space-x-4"}`}>
            <motion.div 
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection("home")}
            >
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSI1IiB5PSIyOCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFFNDBBRiI+ClRSQU5aOAo8L3RleHQ+CjxjaXJjbGUgY3g9IjEwOCIgY3k9IjIwIiByPSIxMiIgZmlsbD0iIzFFNDBBRiIvPgo8cGF0aCBkPSJNMTAyIDIwTDEwOCAxNEwxMTQgMjBMMTA4IDI2TDEwMiAyMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="
                alt="TRANZ8 Logo" 
                className="h-8"
              />
            </motion.div>
            
            <div className={`hidden md:flex items-center ${isRTL ? "space-x-6 space-x-reverse" : "space-x-6"}`}>
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className={`flex items-center ${isRTL ? "space-x-4 space-x-reverse" : "space-x-4"}`}>
            <LanguageSwitcher />
            <Button
              onClick={() => scrollToSection("contact")}
              className="hidden md:inline-flex bg-primary hover:bg-primary/90"
            >
              {t.nav.getQuote}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-right py-2 text-gray-700 hover:text-primary transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full mt-4 bg-primary hover:bg-primary/90"
            >
              {t.nav.getQuote}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
