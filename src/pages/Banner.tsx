import { Button } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Banner = () => {
    return (
        <div className="banner_wrapper">
            {/* Background Color Blobs */}
            <div className="bg_blob blob1"></div>
            <div className="bg_blob blob2"></div>
            <div className="bg_blob blob3"></div>

            <div className="banner_container">
                <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ delay: 0.2 }}
                    >
                        Boost Your Focus
                    </motion.h1>

                    <motion.h1
                        className="h1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ delay: 0.4 }}
                    >
                        Master Your Time
                    </motion.h1>
                </motion.span>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ delay: 0.6 }}
                >
                    Build focus your way. Plan tasks, manage time, and track your progress
                    with a productivity system made for real work.
                </motion.p>

                <motion.div
                    className="btn"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ delay: 0.8 }}
                >
                    <Link to="/dashboard">
                        <Button endIcon={<ArrowRightAlt />} className="start_btn">
                            Start
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
