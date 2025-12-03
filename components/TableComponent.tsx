"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteComponent from "./DeleteComponent";
import EditComponent from "./EditComponent";
import { use, useEffect, useState } from "react";
import { formatDate, formateCellId, getBlockName, getCrimeDescription } from "@/lib/utils";
import { useProjectContext } from "@/context/ProjectContext";
import { Inmate } from "@/types/types";

export function TableComponent() {

  const {inmatesData, crimesData, blocksData, cells, setInmatesData, setCrimesData, setBlocksData, setCells, setInmatesDataOG} = useProjectContext();
  const [inmates, setInmates] = useState<Array<Inmate>>([]);
  useEffect(() => {
    fetch("/api/crimes").then((res) => res.json()).then((data) => setCrimesData(data));
    fetch("/api/inmates").then((res) => res.json()).then((data) => {setInmatesData(data); setInmatesDataOG(data)});
    fetch("/api/blocks").then((res) => res.json()).then((data) => setBlocksData(data));
    fetch("/api/cells").then((res) => res.json()).then((data) => setCells(data));
  }, []);
  
  useEffect(() => {
    setInmates(inmatesData)
    console.log("algo cambio");
  },[inmatesData])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Inmate ID</TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead className="w-[100px]">Alias</TableHead>
          <TableHead className="w-[100px]">Crime</TableHead>
          <TableHead className="w-[100px]">Sentence (Years)</TableHead>
          <TableHead className="w-[100px]">Admission Date</TableHead>
          <TableHead className="w-[100px]">Release Date</TableHead>
          <TableHead className="w-[100px]">Block</TableHead>
          <TableHead className="w-[100px]">Cell</TableHead>
          <TableHead className="w-[50px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inmates.map((inmate) => (
          <TableRow key={inmate.id_inmate}>
            <TableCell className="font-medium">{inmate.id_inmate}</TableCell>
            <TableCell>{inmate.name}</TableCell>
            <TableCell>{inmate.alias ? inmate.alias : "-"}</TableCell>
            <TableCell>{getCrimeDescription(inmate.id_crime, crimesData)}</TableCell>
            <TableCell>{inmate.sentence}</TableCell>
            <TableCell>{formatDate(inmate.admission_date)}</TableCell>
            <TableCell>{formatDate(inmate.release_date)}</TableCell>
            <TableCell>{getBlockName(inmate.id_block, blocksData)}</TableCell>
            <TableCell>{formateCellId(inmate.id_cell)}</TableCell>
            <TableCell className="text-right w-[50px]">
              <div className="flex items-center justify-between gap-[5px]">
                <EditComponent 
                  id_inmate={inmate.id_inmate} 
                  name={inmate.name} 
                  alias={inmate.alias ? inmate.alias : "-"} 
                  id_crime={inmate.id_crime} 
                  sentence={inmate.sentence}
                  admission_date={formatDate(inmate.admission_date)}
                  release_date={inmate.release_date ? inmate.release_date : undefined}
                  id_cell={inmate.id_cell}
                  id_block={inmate.id_block}
                  cellsData={cells}
                  crimesData={crimesData}
                  blocksData={blocksData}
                  inmatesData={inmatesData}
                />
                <DeleteComponent id_inmate={inmate.id_inmate}></DeleteComponent>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
