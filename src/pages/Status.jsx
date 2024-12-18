import { StatusChart } from "components/StatusChart/StatusChart"
import { motion, AnimatePresence } from "framer-motion";
import s from '../components/Main.module.css';
import { ClimbingBoxLoader } from 'react-spinners';


export const Status = () => {

    return (
        <>
         <motion.div
             initial={{ opacity: 0, y: -50 }} // Початковий стан
             animate={{ opacity: 1, y: 0 }}   // Анімований стан
             exit={{ opacity: 0, y: 50 }}     // Стан при зникненні
             transition={{ duration: 1.5 }}   // Тривалість переходу
           >
            <StatusChart/>
            </motion.div>
        </>
    )
}