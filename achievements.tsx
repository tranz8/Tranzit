import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Clock, MapPin } from "lucide-react";

export function AchievementsSection() {
  const { t } = useLanguage();
  const [countersStarted, setCountersStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      icon: TrendingUp,
      value: 9450,
      label: "شحنة ناجحة",
      color: "text-primary",
      bgColor: "bg-primary/10",
      suffix: "+"
    },
    {
      icon: Users,
      value: 98.7,
      label: "% معدل الرضا",
      color: "text-green-500",
      bgColor: "bg-green-100",
      suffix: "%"
    },
    {
      icon: Clock,
      value: 12000,
      label: "ساعة دعم",
      color: "text-accent",
      bgColor: "bg-accent/10",
      suffix: "+"
    },
    {
      icon: MapPin,
      value: 22,
      label: "محافظة مغطاة",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      suffix: ""
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  const AnimatedCounter = ({ end, duration = 2500, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!countersStarted) return;

      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Use easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * end * 100) / 100);
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }, [countersStarted, end, duration]);

    return (
      <span>
        {end < 100 ? count.toFixed(1) : Math.floor(count).toLocaleString()}
        {suffix}
      </span>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t.about.achievements.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.about.achievements.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`${achievement.bgColor} ${achievement.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6`}>
                <achievement.icon className="w-8 h-8" />
              </div>
              
              <div className={`text-4xl md:text-5xl font-bold mb-4 ${achievement.color}`}>
                <AnimatedCounter 
                  end={achievement.value} 
                  suffix={achievement.suffix}
                  duration={2000 + index * 200}
                />
              </div>
              
              <div className="text-gray-600 font-medium">
                {achievement.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional features showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-6xl mb-4">🚢</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">شحن بحري وجوي</h3>
              <p className="text-gray-600">خدمات شحن متكاملة عبر البحر والجو</p>
            </div>
            <div className="p-6">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">دقة في المواعيد</h3>
              <p className="text-gray-600">التزام تام بالمواعيد المحددة</p>
            </div>
            <div className="p-6">
              <div className="text-6xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">ضمان شامل</h3>
              <p className="text-gray-600">تأمين كامل لجميع الشحنات</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}