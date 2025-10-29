import * as TooltipPrimitive from "@radix-ui/react-tooltip";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
const Tooltip = ({ children, content, side = "top" }) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={200}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 1, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <TooltipPrimitive.Content
              side={side}
              className="bg-gray-900 text-white px-3 py-1.5 text-sm rounded shadow-lg z-50"
            >
              {content}
            </TooltipPrimitive.Content>
          </motion.div>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
