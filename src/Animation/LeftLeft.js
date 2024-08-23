import { motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
function LeftLeft({children}){
  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 0.1, 
  });

  return (
    <motion.div
      ref={ref}    
      initial={{ x: '-10vw', opacity: 0 }}  
      animate={inView ? { x: 0, opacity: 1 } : {}}        
      exit={{ x: '-10vw', opacity: 0 }}   
      transition={{ duration: 0.7 }} >
        {children}
    </motion.div>
  )
}

export default LeftLeft;