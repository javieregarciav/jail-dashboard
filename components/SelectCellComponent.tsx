'use client'

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Cell, Inmate } from "@/types/types";
import { format } from "path";
import { formateCellId, numberCellId } from "@/lib/utils";
import { useProjectContext } from "@/context/ProjectContext";
import { intlFormatDistance } from "date-fns";

type SelectCellProps = {
  idBlock: number;
  idCell: number;
  cellsData: Array<Cell>;
  inmatesData: Array<Inmate>;
  onChangeCell: (idCell: number) => void;
};

const SelectCellComponent = (props: SelectCellProps) => {
  const {cellsByBlock} = useProjectContext();
  const [cellsArr, setCellsArr] = useState<Array<Cell>>([]);
  const [selectedCell, setSelectedCell] = useState<string | undefined>("");

  useEffect(() => {
      if (props.idCell) {
        setCellsArr(cellsByBlock ? cellsByBlock : props.cellsData);        
        setSelectedCell(String(props.idCell));        
      } else if (props.idCell == 0 && props.idBlock !== 0) {
        setCellsArr(cellsByBlock ? cellsByBlock : props.cellsData); 
      } else {
        setSelectedCell(undefined);
      }
    }, [cellsByBlock])

  return (
    <Select value={selectedCell} onValueChange={(val) => {
      setSelectedCell(val)
      props.onChangeCell(Number(val));
      }}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="No cell selected" />
      </SelectTrigger>
      <SelectContent>
        {cellsArr.map((cell) => (
          <SelectItem key={cell.id_cell} value={String(cell.id_cell)} disabled={props.inmatesData ? (props.inmatesData).some((inmate) => inmate.id_cell === cell.id_cell) : false}>
            {formateCellId(cell.id_cell)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCellComponent;
