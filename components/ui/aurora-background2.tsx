
"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col min-h-screen h-auto bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `
            [--bright-green-gradient:repeating-linear-gradient(100deg,#98FB98_0%,#90EE90_5%,#00FF7F_10%,#32CD32_15%,#7FFF00_20%,#ADFF2F_25%,rgba(0,0,0,0)_30%,#66CDAA_35%,#9ACD32_40%,#8FBC8F_45%)]
            [--earth-tone-gradient:repeating-linear-gradient(100deg,#556B2F_0%,#8B4513_5%,#D2B48C_10%,#A0522D_15%,#6B8E23_20%,#8B4513_25%,rgba(0,0,0,0)_30%,#556B2F_35%,#8FBC8F_40%,#A0522D_45%)]
            [--aurora-bright-green:repeating-linear-gradient(100deg,#7FFF00_10%,#98FB98_15%,#ADFF2F_20%,#32CD32_25%,#00FF7F_30%,#66CDAA_35%,#9ACD32_40%,#7FFF00_45%)]
            [background-image:var(--bright-green-gradient),var(--aurora-bright-green)]
            dark:[background-image:var(--earth-tone-gradient),var(--aurora-bright-green)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px]
            after:content-[''] after:absolute after:inset-0 after:[background-image:var(--bright-green-gradient),var(--aurora-bright-green)] 
            after:dark:[background-image:var(--earth-tone-gradient),var(--aurora-bright-green)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed]
            pointer-events-none
            absolute -inset-[10px] opacity-40 will-change-transform`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,rgba(0,0,0,0)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};