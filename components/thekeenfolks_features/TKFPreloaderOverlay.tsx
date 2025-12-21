"use client";

import { AnimatePresence, motion } from "framer-motion";

const tiles = ["VA", "RY", "ON", "AI"];

type TKFPreloaderOverlayProps = {
  isVisible: boolean;
  mode: "intro" | "transition";
};

export function TKFPreloaderOverlay({ isVisible, mode }: TKFPreloaderOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: mode === "intro" ? 0.8 : 0.5, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4 text-white"
          >
            {tiles.map((tile, index) => (
              <motion.div
                key={tile}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * index, type: "spring", damping: 18, stiffness: 220 }}
                className={`flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${
                  index % 2 === 0 ? "from-accent_tkf_pink to-accent_orange" : "from-gray-900 to-gray-800"
                } font-tkf-heading text-2xl tracking-[0.2em]`}
              >
                {tile}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



