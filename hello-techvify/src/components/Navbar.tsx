import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-primary"
          >
            Techvify
          </motion.div>
          <ul className="hidden md:flex space-x-8">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <motion.li
                key={item}
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer hover:text-primary transition-colors"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;