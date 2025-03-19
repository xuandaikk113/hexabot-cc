import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    title: 'Custom Software Development',
    description: 'Tailored solutions to meet your unique business needs',
    icon: '💻'
  },
  {
    title: 'Web Development',
    description: 'Modern, responsive web applications with cutting-edge technologies',
    icon: '🌐'
  },
  {
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications',
    icon: '📱'
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services',
    icon: '☁️'
  }
];

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of IT services to help your business grow
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;