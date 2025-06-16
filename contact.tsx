import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLanguage } from "@/hooks/use-language";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertQuoteSchema } from "@shared/schema";
import { z } from "zod";

const formSchema = insertQuoteSchema.extend({
  serviceType: z.string().min(1, "يرجى اختيار نوع الخدمة"),
});

export function ContactSection() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      serviceType: "",
      details: "",
    },
  });

  const quoteMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      apiRequest("POST", "/api/quotes", data),
    onSuccess: () => {
      toast({
        title: "تم إرسال طلبك بنجاح!",
        description: "سنتواصل معك قريباً",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "حدث خطأ",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    quoteMutation.mutate(data);
  };

  const handleWhatsAppClick = () => {
    const message = "مرحباً، أريد الاستفسار عن خدماتكم";
    const url = `https://wa.me/967777030198?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t.contact.phone,
      details: [t.contact.officialPhone],
      color: "text-primary",
      bgColor: "bg-primary"
    },
    {
      icon: MessageCircle,
      title: t.contact.whatsapp,
      details: [t.contact.officialPhone],
      color: "text-green-500",
      bgColor: "bg-green-500",
      action: handleWhatsAppClick,
      actionText: t.contact.whatsappButton
    },
    {
      icon: Mail,
      title: t.contact.email,
      details: [t.contact.officialEmail],
      color: "text-accent",
      bgColor: "bg-accent"
    },
    {
      icon: MapPin,
      title: t.contact.address,
      details: [t.contact.officialAddress],
      color: "text-purple-500",
      bgColor: "bg-purple-500"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-white mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.contact.title}</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-start ${isRTL ? "space-x-4 space-x-reverse" : "space-x-4"}`}
              >
                <div className={`${info.bgColor} rounded-full p-4 flex-shrink-0`}>
                  <info.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="opacity-90">{detail}</p>
                  ))}
                  {info.action && (
                    <Button
                      onClick={info.action}
                      className={`${info.bgColor} hover:opacity-90 mt-2`}
                    >
                      {info.actionText}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t.contact.form.title}</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.contact.form.fullName}</FormLabel>
                        <FormControl>
                          <Input placeholder={t.contact.form.fullName} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.contact.form.phone}</FormLabel>
                        <FormControl>
                          <Input placeholder={t.contact.form.phone} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.contact.form.email}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={t.contact.form.email} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.contact.form.serviceType}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t.contact.form.serviceOptions.placeholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full_shipping">{t.contact.form.serviceOptions.fullShipping}</SelectItem>
                          <SelectItem value="partial_shipping">{t.contact.form.serviceOptions.partialShipping}</SelectItem>
                          <SelectItem value="domestic_transport">{t.contact.form.serviceOptions.domestic}</SelectItem>
                          <SelectItem value="international_shopping">{t.contact.form.serviceOptions.shopping}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.contact.form.details}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t.contact.form.details} 
                          rows={4} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={quoteMutation.isPending}
                >
                  {quoteMutation.isPending ? t.common.loading : t.contact.form.submit}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
