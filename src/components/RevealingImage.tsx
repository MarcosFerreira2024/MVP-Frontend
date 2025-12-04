import { motion } from "framer-motion";

function RevealingImage({ image }: { image: string }) {
  return (
    <motion.div className="w-screen lg:block hidden lg:h-[600px] h-[400px] relative overflow-hidden">
      <motion.img src={image} alt="" className="w-full h-full object-cover" />

      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-black"
        initial={{ opacity: 0.8 }}
        whileInView={{ opacity: 0 }}
        transition={{ duration: 2 }}
        viewport={{ once: false, amount: 0.5 }}
      />
    </motion.div>
  );
}

export default RevealingImage;
