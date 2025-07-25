"use client";

import { motion } from "framer-motion";

function groupBrands(brands: string[], groupCount: number) {
  const perGroup = Math.ceil(brands.length / groupCount);
  return Array.from({ length: groupCount }, (_, i) =>
    brands.slice(i * perGroup, (i + 1) * perGroup)
  );
}

function AnimatedLines({ groups }: { groups: string[][] }) {
  return (
    <>
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: groupIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...group, ...group].map((brand, i) => {
              const mod = i % 4;
              const style =
                mod === 0
                  ? "text-black font-bold"
                  : mod === 2
                  ? "text-green-700 font-bold"
                  : "text-black font-normal";

              return (
                <span key={`${groupIndex}-${i}`} className={`mx-3 ${style}`}>
                  #{brand}
                </span>
              );
            })}
          </motion.div>
        </div>
      ))}
    </>
  );
}

export default function BrandMarquee({ brands }: { brands: string[] }) {
  return (
    <div className="w-full overflow-hidden bg-[#F5EFE3] py-6 space-y-4 text-xl font-azoMono">
      <div className="block md:hidden">
        <AnimatedLines groups={groupBrands(brands, 5)} />
      </div>
      <div className="hidden md:block">
        <AnimatedLines groups={groupBrands(brands, 3)} />
      </div>
    </div>
  );
}
