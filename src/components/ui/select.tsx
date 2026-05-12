import * as React from "react"
import { cn } from "@/utils/cn"
import { ChevronDown, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Simple Context API to share state logic between compounds
const SelectContext = React.createContext<{
    value: string;
    onValueChange: (value: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    placeholder?: string;
} | null>(null);

export function Select({ value, onValueChange, children }: { value?: string, onValueChange: (v: string) => void, children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    return (
        <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
            <div className="relative">{children}</div>
        </SelectContext.Provider>
    );
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => {
    const ctx = React.useContext(SelectContext);
    if (!ctx) return null;
    return (
        <button
            ref={ref}
            type="button"
            onClick={() => ctx.setOpen(!ctx.open)}
            className={cn(
                "flex h-12 w-full items-center justify-between rounded-xl border border-gray-800 bg-gray-950/50 px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 text-white transition-all duration-300 hover:border-gray-700 hover:bg-gray-900",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform duration-300", ctx.open && "rotate-180")} />
        </button>
    );
});
SelectTrigger.displayName = "SelectTrigger";

export function SelectValue({ placeholder }: { placeholder?: string }) {
    const ctx = React.useContext(SelectContext);
    if (!ctx) return null;
    return <span>{ctx.value || placeholder}</span>;
}

export function SelectContent({ children, className }: { children: React.ReactNode, className?: string }) {
    const ctx = React.useContext(SelectContext);

    return (
        <AnimatePresence>
            {ctx?.open && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                        "absolute z-50 min-w-[8rem] overflow-hidden rounded-xl border border-gray-800 bg-gray-900/95 backdrop-blur-md shadow-2xl mt-2 w-full",
                        className
                    )}
                >
                    <div className="p-1 max-h-60 overflow-y-auto">{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(({ className, children, value, ...props }, ref) => {
    const ctx = React.useContext(SelectContext);
    if (!ctx) return null;
    return (
        <div
            ref={ref}
            onClick={() => {
                ctx.onValueChange(value);
                ctx.setOpen(false);
            }}
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-800 cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});
SelectItem.displayName = "SelectItem";
