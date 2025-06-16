import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t, isRTL } = useLanguage();

  const services = [
    t.services.fullShipping.title,
    t.services.partialShipping.title,
    t.services.domestic.title,
    t.services.shopping.title,
  ];

  const links = [
    "تتبع الشحنة",
    "احسب التكلفة",
    "شروط الخدمة",
    "سياسة الخصوصية",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSI1IiB5PSIyOCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiPgpUUkFOWjgKPC90ZXh0Pgo8Y2lyY2xlIGN4PSIxMDgiIGN5PSIyMCIgcj0iMTIiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMDIgMjBMMTA4IDE0TDExNCAyMEwxMDggMjZMMTAyIDIwWiIgZmlsbD0iIzFFNDBBRiIvPgo8L3N2Zz4K"
                alt="TRANZ8 Logo" 
                className="h-8"
              />
            </div>
            <p className="text-gray-400 mb-4">
              {t.footer.tagline}
            </p>
            <div className={`flex ${isRTL ? "space-x-4 space-x-reverse" : "space-x-4"}`}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">{t.footer.services}</h4>
            <ul className="space-y-2 text-gray-400">
              {services.map((service, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors text-right w-full"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">{t.footer.links}</h4>
            <ul className="space-y-2 text-gray-400">
              {links.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(index === 0 ? "tracking" : "contact")}
                    className="hover:text-white transition-colors text-right w-full"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{t.contact.officialPhone}</li>
              <li>{t.contact.officialEmail}</li>
              <li>{t.contact.officialAddress}</li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2024 TRANZ8. {t.footer.copyright}</p>
        </motion.div>
      </div>
    </footer>
  );
}
