import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/utils/cn"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        // Enhanced styles with glow effects and smoother transitions
        const baseStyles = "relative inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group"

        const variants = {
            default: "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-[1.02]",
            destructive: "bg-red-600 text-white hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]",
            outline: "border border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white hover:border-gray-600",
            secondary: "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700",
            ghost: "hover:bg-gray-800/50 text-gray-300 hover:text-white",
            link: "text-blue-400 underline-offset-4 hover:underline decoration-blue-400/30"
        }

        const sizes = {
            default: "h-12 px-6 py-2",
            sm: "h-9 rounded-lg px-3",
            lg: "h-14 rounded-xl px-8 text-base",
            icon: "h-10 w-10"
        }

        // Shine effect element
        const Shine = () => (
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
        )

        const Comp = asChild ? Slot : "button"

        if (asChild) {
            console.warn("Button: asChild rendering not fully improved without Radix Slot")
        }

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            >
                {variant === 'default' && <Shine />}
                <span className="relative z-20 flex items-center gap-2">
                    {props.children}
                </span>
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button }
