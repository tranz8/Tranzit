import { motion } from "framer-motion";
import { Clock, Shield, Satellite, DollarSign } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useEffect, useRef, useState } from "react";

export function AboutSection() {
  const { t, isRTL } = useLanguage();
  const [countersStarted, setCountersStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Clock,
      title: t.about.features[0].title,
      description: t.about.features[0].description,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Shield,
      title: t.about.features[1].title,
      description: t.about.features[1].description,
      color: "text-green-500",
      bgColor: "bg-green-100"
    },
    {
      icon: Satellite,
      title: t.about.features[2].title,
      description: t.about.features[2].description,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: DollarSign,
      title: t.about.features[3].title,
      description: t.about.features[3].description,
      color: "text-purple-500",
      bgColor: "bg-purple-100"
    }
  ];

  const stats = t.about.stats;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!countersStarted) return;

      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }, [countersStarted, end, duration]);

    return <span>{count}</span>;
  };

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t.about.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern logistics technology and automated systems"
              className="rounded-2xl shadow-2xl hover-lift" 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-start ${isRTL ? "space-x-4 space-x-reverse" : "space-x-4"}`}
              >
                <div className={`${feature.bgColor} ${feature.color} rounded-full p-4 flex-shrink-0`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className={`text-4xl font-bold mb-2 ${
                index === 0 ? "text-primary" :
                index === 1 ? "text-accent" :
                index === 2 ? "text-green-500" :
                "text-purple-500"
              }`}>
                {stat.value.includes('%') ? (
                  <>
                    <AnimatedCounter end={parseInt(stat.value)} />%
                  </>
                ) : (
                  <>
                    <AnimatedCounter end={parseInt(stat.value)} />
                    {stat.value.includes('+') && '+'}
                  </>
                )}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
