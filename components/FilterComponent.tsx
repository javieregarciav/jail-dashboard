'use client'

import React, { useState } from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "./ui/item";
import SelectBlockComponent from "./SelectBlockComponent";
import SelectCrimeComponent from "./SelectCrimeComponent";
import { useProjectContext } from "@/context/ProjectContext";
import { Button } from "./ui/button";

const FilterComponent = () => {
  const { inmatesData, blocksData, cells, crimesData, setInmatesData } =
    useProjectContext();
  const [idCrime, setIdCrime] = useState<number>(0);
  const [idBlock, setIdBlock] = useState<number>(0);

  const handleChangeBlock = (idBlock: number) => {
    setIdBlock(idBlock);
    console.log(idBlock);
  };
  const handleChangeCrime = (newIdCrime: number) => {
    setIdCrime(newIdCrime);
    console.log(newIdCrime);
  };

  const clearFilters = () => {
    handleChangeCrime(0)
    handleChangeBlock(0)
    console.log(idCrime, idBlock);
  }
  return (
    <Item variant="outline" className="flex-1 mt-[25px]">
      <ItemHeader>Filters</ItemHeader>
      <ItemContent>
        <ItemDescription className="flex w-[500px] gap-5">
          <SelectBlockComponent
            idBlock={idBlock}
            blocksData={blocksData}
            cellsData={cells}
            onChangeBlock={handleChangeBlock}
          ></SelectBlockComponent>
          <SelectCrimeComponent
            idCrime={idCrime}
            crimesData={crimesData}
            onChangeCrime={handleChangeCrime}
          ></SelectCrimeComponent>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </ItemDescription>
      </ItemContent>
      <ItemActions />
      <ItemTitle>{'Showing 50 of 100 inmates'}</ItemTitle>
    </Item>
  );
};

export default FilterComponent;
