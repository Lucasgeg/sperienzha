"use client";
import { critere } from "@prisma/client";
import classNames from "classnames";
import { useEffect, useState } from "react";

export const Filter = () => {
  const [critere, setCritere] = useState<critere[]>([]);
  const [selectedCritere, setSelectedCritere] = useState<critere[]>([]);
  useEffect(() => {
    const getCritere = async () => {
      const res = await fetch("/api/firstConection/get-criteria");
      const data = await res.json();
      if (res.status === 200) {
        /*  const sortedData = data.data.reduce(
          (acc: Record<string, critere[]>, curr: critere) => {
            if (!acc[curr.type]) {
              acc[curr.type] = [];
            }
            acc[curr.type].push(curr);
            return acc;
          },
          {}
        ); */
        setCritere(data.data);
      }
    };
    getCritere();
  }, []);

  const handleSelectCritere = (critere: critere) => {
    if (selectedCritere.includes(critere)) {
      setSelectedCritere((prev) =>
        prev.filter((c) => c.id_critere !== critere.id_critere)
      );
    } else {
      setSelectedCritere((prev) => [...prev, critere]);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-1 lg:grid-cols-8 lg:gap-1 mt-3">
      {critere.map((c) => (
        <span
          onClick={() => handleSelectCritere(c)}
          key={c.id_critere}
          className={classNames(
            "h-14 text-center font-bold flex justify-center items-center rounded border border-indigo-600 bg-slate-200 px-12 py-3 text-sm  text-blue-primary hover:bg-blue-primary hover:text-white focus:outline-none focus:ring active:text-indigo-500 cursor-pointer",
            selectedCritere.includes(c) && "bg-cyan-500 text-white"
          )}
        >
          {c.name}
        </span>
      ))}
    </div>
  );
};
