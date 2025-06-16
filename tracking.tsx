import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Truck, Home, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function TrackingSection() {
  const { t, isRTL } = useLanguage();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchedNumber, setSearchedNumber] = useState("");

  const { data: shipment, isLoading, error } = useQuery({
    queryKey: ["/api/track", searchedNumber],
    enabled: !!searchedNumber,
  });

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      setSearchedNumber(trackingNumber.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTrack();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "received":
        return Package;
      case "in_transit":
        return Truck;
      case "out_for_delivery":
        return Truck;
      case "delivered":
        return Home;
      default:
        return Package;
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case "received":
        return 0;
      case "in_transit":
        return 1;
      case "out_for_delivery":
        return 2;
      case "delivered":
        return 3;
      default:
        return 0;
    }
  };

  const steps = [
    { label: t.tracking.steps[0], icon: Package },
    { label: t.tracking.steps[1], icon: Package },
    { label: t.tracking.steps[2], icon: Truck },
    { label: t.tracking.steps[3], icon: Home },
  ];

  const currentStep = shipment ? getStatusStep(shipment.status) : 0;

  return (
    <section id="tracking" className="py-20 bg-gradient-to-br from-primary to-primary/80">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-white mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.tracking.title}</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t.tracking.subtitle}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <div className={`flex flex-col md:flex-row gap-4 mb-8`}>
              <Input
                type="text"
                placeholder={t.tracking.placeholder}
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-lg h-12"
              />
              <Button
                onClick={handleTrack}
                disabled={!trackingNumber.trim() || isLoading}
                className="bg-accent text-white hover:bg-accent/90 h-12 px-8"
              >
                <Search className="w-5 h-5 mr-2" />
                {t.tracking.button}
              </Button>
            </div>

            {/* Tracking Results */}
            {searchedNumber && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="border-t pt-8"
              >
                {isLoading && (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                )}

                {error && (
                  <div className="text-center text-red-500 py-8">
                    <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold">رقم التتبع غير صحيح أو غير موجود</p>
                    <p className="text-sm mt-2">يرجى التحقق من رقم التتبع والمحاولة مرة أخرى</p>
                  </div>
                )}

                {shipment && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {t.tracking.status}: {searchedNumber}
                      </h3>
                      <p className="text-green-600 font-semibold text-lg">
                        {shipment.status === "in_transit" ? "في الطريق إلى " + shipment.destination :
                         shipment.status === "delivered" ? "تم التسليم" :
                         shipment.status === "out_for_delivery" ? "خارج للتسليم" :
                         "تم الاستلام"}
                      </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="relative mb-8">
                      <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                          <div key={index} className="flex flex-col items-center relative z-10">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.2 }}
                              className={`rounded-full w-12 h-12 flex items-center justify-center mb-2 ${
                                index <= currentStep
                                  ? index === currentStep
                                    ? "bg-accent text-white animate-pulse"
                                    : "bg-green-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                              }`}
                            >
                              {index < currentStep ? (
                                <CheckCircle className="w-6 h-6" />
                              ) : (
                                <step.icon className="w-6 h-6" />
                              )}
                            </motion.div>
                            <span className="text-sm text-center max-w-20">{step.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Progress Line */}
                      <div className="absolute top-6 left-6 right-6 h-1 bg-gray-300">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-green-500"
                        />
                      </div>
                    </div>

                    {/* Shipment Details */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-gray-50 rounded-xl p-6"
                    >
                      <h4 className="font-semibold text-lg mb-4">{t.tracking.details.title}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-600">{t.tracking.details.sender}:</span>
                          <span className="font-semibold mr-2">{shipment.senderName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">{t.tracking.details.recipient}:</span>
                          <span className="font-semibold mr-2">{shipment.recipientName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">{t.tracking.details.destination}:</span>
                          <span className="font-semibold mr-2">{shipment.destination}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">{t.tracking.details.estimatedArrival}:</span>
                          <span className="font-semibold mr-2">
                            {shipment.estimatedDelivery 
                              ? new Date(shipment.estimatedDelivery).toLocaleDateString('ar-SA')
                              : "غير محدد"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
