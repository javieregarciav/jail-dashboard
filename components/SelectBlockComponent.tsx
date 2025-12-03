"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Block, Cell } from "@/types/types";
import { useProjectContext } from "@/context/ProjectContext";

type SelectBlockProps = {
  idBlock: number;
  blocksData: Array<Block>;
  cellsData: Array<Cell>;
  onChangeBlock: (idBlock: number) => void;
};

const SelectBlockComponent = (props: SelectBlockProps) => {
  const [selectedCell, setSelectedCell] = useState<string | undefined>("");
  const {setCellsByBlock, setSelectedBlock} = useProjectContext();

/*   useEffect(()=>{
      handleChangeSelect(props.idBlock ? String(props.idBlock) : "");
  },[]) */

  const handleChangeSelect = (val: string) => {
    setSelectedCell(val);
    let blockCells = props.cellsData.filter((cell) => cell.id_block === Number(val));
    setCellsByBlock && setCellsByBlock(blockCells);
    console.log(val, blockCells);
    
    /* setActiveInmates((data.filter((inmate: { status: string }) => inmate.status === "Active")).length)} */
  }

  useEffect(() => {
    if (props.idBlock && props.blocksData.length > 0) {
      setSelectedCell(String(props.idBlock));
      handleChangeSelect(String(props.idBlock));
    } else {
      setSelectedCell(undefined);
    }
  }, [props.idBlock, props.blocksData]);

  return (
    <Select value={selectedCell} onValueChange={(val) => 
    {handleChangeSelect(val)
      props.onChangeBlock(Number(val));
      setSelectedBlock(Number(val));
    }
    }>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="No status selected" />
      </SelectTrigger>
      <SelectContent>
        {props.blocksData.map((block) => (
          <SelectItem key={block.id_block} value={String(block.id_block)}>
            {block.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBlockComponent;
