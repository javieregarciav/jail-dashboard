import { Block, Crime, Inmate } from "@/types/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | undefined): string {
  if(date) {
    const newDate = date.slice(0, date.indexOf("T"));
    return newDate;
  }
 
  return "-";
}

export function formateCellId(id: number): string {
  if(id) {
   if(id < 10) return `A-00${id}`;
   if(id == 10) return `A-0${id}`;
   if(id > 10 && id < 21) return `B-0${id}`;
   if(id > 20 && id < 31) return `C-0${id}`;
   if(id > 30 && id < 41) return `D-0${id}`;
   if(id > 40 && id < 51) return `E-0${id}`;
   if(id > 50 && id < 61) return `F-0${id}`;
   if(id > 60 && id < 71) return `G-0${id}`;
   if(id > 70 && id < 81) return `H-0${id}`;
   if(id > 80 && id < 91) return `I-0${id}`;
   if(id > 90 && id < 101) return `J-0${id}`;
   if(id == 100) return `J-${id}`;
  }
  return "-";
}

export function numberCellId(id: string): number {
  if(id) return Number(id.slice(id.indexOf("-")+1));
  return 0;
}

export const getCrimeDescription = (id_crime: number,  crimesData: Array<Crime>): string => {
    let desc: string | undefined = "";
    if(id_crime && crimesData) {
      desc = (crimesData.find((crime) => crime.id_crime === id_crime))?.description;
      return desc || "-";
    }
    return "-"
  }

  export const getBlockName = (id_block: number,  blocksData: Array<Block>): string => {
    let desc: string | undefined = "";
    if(id_block && blocksData) {
      desc = (blocksData.find((block) => block.id_block === id_block))?.name;
      return desc || "-";
    }
    return "-"
  }

/* 
export function fetchInmates(): Inmate[] {
  fetch("/api/inmates").then((res) => res.json()).then((data) => inmatesData[...data]);
  return inmatesData;
} */

/* export function getCrimeStr(id: number): string {
  const crimesData: Array<Crime> = [];
  fetch("/api/crimes").then((res) => res.json()).then((data) => crimesData[...data]);
  return "-";
} */