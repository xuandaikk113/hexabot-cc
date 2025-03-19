import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Transform Your Business with
              <span className="text-primary"> Expert IT Solutions</span>
            </h1>
            <p className="text-xl text-gray-600">
              Delivering innovative software solutions and exceptional IT outsourcing services
              to help your business thrive in the digital age.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-lg font-medium"
            >
              Get Started
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Team collaboration"
              className="rounded-lg shadow-xl w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;