"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";

export default function BizFlowIcon({
  size = 44,
}: {
  size?: number;
}) {
  return (
    <motion.div
      whileHover={{ rotate: 6 }}
      style={{ height: size, width: size }}
      className="
        rounded-2xl
        bg-gradient-to-br from-indigo-500 to-violet-600
        flex items-center justify-center
        shadow
      "
    >
      <Layers size={22} className="text-white" />
    </motion.div>
  );
}
