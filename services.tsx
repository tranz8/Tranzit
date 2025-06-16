import { motion } from "framer-motion";
import { Ship, Package, Truck, ShoppingCart, Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export function ServicesSection() {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: Ship,
      title: t.services.fullShipping.title,
      description: t.services.fullShipping.description,
      features: t.services.fullShipping.features,
      button: t.services.fullShipping.button,
      color: "text-primary",
      bgColor: "bg-primary",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      icon: Truck,
      title: t.services.partialShipping.title,
      description: t.services.partialShipping.description,
      features: t.services.partialShipping.features,
      button: t.services.partialShipping.button,
      color: "text-green-500",
      bgColor: "bg-green-500",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      icon: Package,
      title: t.services.domestic.title,
      description: t.services.domestic.description,
      features: t.services.domestic.features,
      button: t.services.domestic.button,
      color: "text-accent",
      bgColor: "bg-accent",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      icon: Users,
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      features: t.services.consulting.features,
      button: t.services.consulting.button,
      color: "text-purple-500",
      bgColor: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t.services.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="service-card rounded-2xl p-8 hover-lift"
            >
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-48 object-cover rounded-xl mb-6" 
              />
              <div className={`${service.color} text-4xl mb-4`}>
                <service.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2 text-gray-600 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: featureIndex * 0.1 }}
                    className={`flex items-center ${isRTL ? "space-x-2 space-x-reverse" : "space-x-2"}`}
                  >
                    <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <Button className={`w-full ${service.bgColor} hover:opacity-90 transition-opacity`}>
                {service.button}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* International Shopping Service */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="service-card rounded-2xl p-8 hover-lift"
        >
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt={t.services.shopping.title}
            className="w-full h-48 object-cover rounded-xl mb-6" 
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-purple-500 text-4xl mb-4">
                <ShoppingCart className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {t.services.shopping.title}
              </h3>
              <p className="text-gray-600 mb-6">{t.services.shopping.description}</p>
              
              {/* Popular platforms */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { name: "Amazon", icon: "🛒", color: "text-accent" },
                  { name: "eBay", icon: "🏪", color: "text-green-500" },
                  { name: "AliExpress", icon: "🛍️", color: "text-pink-500" },
                  { name: "Noon", icon: "🎁", color: "text-blue-500" }
                ].map((platform, index) => (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center ${isRTL ? "space-x-3 space-x-reverse" : "space-x-3"}`}
                  >
                    <span className="text-2xl">{platform.icon}</span>
                    <span className={platform.color}>{platform.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-xl font-semibold mb-4">{t.services.shopping.howItWorks}</h4>
              <div className="space-y-4">
                {t.services.shopping.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-start ${isRTL ? "space-x-3 space-x-reverse" : "space-x-3"}`}
                  >
                    <div className={`${
                      index === 0 ? "bg-primary" : 
                      index === 1 ? "bg-accent" : "bg-green-500"
                    } text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                      {index + 1}
                    </div>
                    <div>
                      <h5 className="font-semibold">{step.title}</h5>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button className="w-full bg-purple-500 hover:bg-purple-600 transition-colors mt-6">
                {t.services.shopping.button}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
