import Popular from '../components/Popular';
import Veggie from '../components/Veggie';
import GlutenFree from '../components/GlutenFree';
import { motion } from 'framer-motion'

function Home(){
    return (
        <motion.div
            animate={{opacity: 1}}
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
            >
            <Popular/>
            <Veggie/>
            <GlutenFree/>
        </motion.div>
    )
}
export default Home;