import { AnimatePresence, motion } from 'framer-motion';

import './loader.css';

export interface LoaderProps {
  isLoading: boolean;
}

export function Loader({ isLoading }: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='grid place-content-center fixed inset-0 w-full h-full bg-black bg-opacity-50'
        >
          <div className='spinner' />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
