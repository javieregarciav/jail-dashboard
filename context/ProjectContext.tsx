"use client";

import { Block, Cell, Crime, Inmate } from "@/types/types";
import { createContext, useContext, useState } from "react";

type ContextTypes = {
  prisonName: string;
  setPrisonName: (value: string) => void;
  selectedBlock: number;
  setSelectedBlock: (value: number) => void;
  cellsByBlock?: Array<Cell>;
  setCellsByBlock?: (cells: Array<Cell>) => void;
  avgSentence?: number;
  setAvgSentence: (value: number) => void;
  inmatesData: Array<Inmate>;
  crimesData: Array<Crime>;
  blocksData: Array<Block>;
  cells: Array<Cell>;
  inmatesDataOG: Array<Inmate>;
  setInmatesData: (data: Array<Inmate>) => void;
  setInmatesDataOG: (data: Array<Inmate>) => void;
  setCrimesData: (data: Array<Crime>) => void;
  setBlocksData: (data: Array<Block>) => void;
  setCells: (data: Array<Cell>) => void;
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void;
};

const Context = createContext<ContextTypes | undefined>(undefined);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [prisonName, setPrisonName] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [cellsByBlock, setCellsByBlock] = useState<Array<Cell>>([]);
  const [avgSentence, setAvgSentence] = useState(0);
  const [inmatesData, setInmatesData] = useState<Array<Inmate>>([]);
  const [inmatesDataOG, setInmatesDataOG] = useState<Array<Inmate>>([]);
  const [crimesData, setCrimesData] = useState<Array<Crime>>([]);
  const [blocksData, setBlocksData] = useState<Array<Block>>([]);
  const [cells, setCells] = useState<Array<Cell>>([]);

  const value: ContextTypes = {
    selectedBlock,
    setSelectedBlock,
    cellsByBlock,
    setCellsByBlock,
    avgSentence,
    setAvgSentence,
    inmatesData,
    setInmatesData,
    crimesData,
    setCrimesData,
    blocksData,
    setBlocksData,
    cells,
    setCells,
    openEdit,
    setOpenEdit,
    inmatesDataOG,
    setInmatesDataOG,
    prisonName,
    setPrisonName
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useProjectContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useProjectContext must be used within a ContextProvider");
  }
  return context;
};
