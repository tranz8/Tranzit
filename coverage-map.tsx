import { motion } from "framer-motion";
import { MapPin, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function CoverageMapSection() {
  const { t } = useLanguage();

  const yemenGovernorates = [
    { name: "صنعاء", x: 44, y: 35, covered: true },
    { name: "عدن", x: 45, y: 85, covered: true },
    { name: "تعز", x: 44, y: 70, covered: true },
    { name: "الحديدة", x: 25, y: 60, covered: true },
    { name: "إب", x: 44, y: 65, covered: true },
    { name: "ذمار", x: 44, y: 55, covered: true },
    { name: "حضرموت", x: 70, y: 60, covered: true },
    { name: "لحج", x: 45, y: 80, covered: true },
    { name: "المحويت", x: 35, y: 45, covered: true },
    { name: "حجة", x: 30, y: 35, covered: true },
    { name: "أبين", x: 55, y: 80, covered: true },
    { name: "شبوة", x: 65, y: 70, covered: true },
    { name: "مأرب", x: 60, y: 45, covered: true },
    { name: "الجوف", x: 55, y: 30, covered: true },
    { name: "صعدة", x: 40, y: 20, covered: true },
    { name: "عمران", x: 40, y: 40, covered: true },
    { name: "البيضاء", x: 55, y: 55, covered: true },
    { name: "الضالع", x: 45, y: 75, covered: true },
    { name: "ريمة", x: 35, y: 55, covered: true },
    { name: "المهرة", x: 85, y: 65, covered: true },
    { name: "سقطرى", x: 80, y: 90, covered: true },
    { name: "الساحل الغربي", x: 20, y: 50, covered: true }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            تغطية شاملة لكامل اليمن
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نخدم جميع المحافظات اليمنية بشبكة توزيع قوية وفعالة تضمن وصول شحناتكم لأي مكان
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 overflow-hidden">
              {/* Yemen Map Outline (Simplified) */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-96 text-gray-300"
                style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
              >
                {/* Simplified Yemen border */}
                <path
                  d="M15 40 Q20 20 40 15 L60 20 Q80 25 85 40 L90 60 Q85 80 70 85 L50 90 Q30 85 20 70 L15 50 Z"
                  fill="rgba(30, 64, 175, 0.1)"
                  stroke="rgba(30, 64, 175, 0.3)"
                  strokeWidth="0.5"
                />
                
                {/* Governorate points */}
                {yemenGovernorates.map((gov, index) => (
                  <motion.g
                    key={gov.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.circle
                      cx={gov.x}
                      cy={gov.y}
                      r="2"
                      fill={gov.covered ? "#10B981" : "#EF4444"}
                      whileHover={{ r: 3, scale: 1.5 }}
                      className="cursor-pointer"
                    />
                    <motion.circle
                      cx={gov.x}
                      cy={gov.y}
                      r="4"
                      fill="transparent"
                      stroke={gov.covered ? "#10B981" : "#EF4444"}
                      strokeWidth="0.5"
                      opacity="0.6"
                      whileHover={{ scale: 1.5 }}
                      className="cursor-pointer"
                    />
                  </motion.g>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="absolute top-4 right-4 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">مغطاة</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Governorates List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="text-primary ml-3" />
                المحافظات المغطاة
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {yemenGovernorates.map((gov, index) => (
                  <motion.div
                    key={gov.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 space-x-reverse p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{gov.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Service Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">24</div>
                <div className="text-gray-600">ساعة توصيل</div>
              </div>
              <div className="bg-green-100 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">99%</div>
                <div className="text-gray-600">معدل التسليم</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}