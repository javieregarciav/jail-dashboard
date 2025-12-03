"use client";
import AddComponent from "@/components/AddComponent";
import FilterComponent from "@/components/FilterComponent";
import { SelectReportComponent } from "@/components/SelectReportComponent";
import { TableComponent } from "@/components/TableComponent";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { useProjectContext } from "@/context/ProjectContext";
import { Inmate } from "@/types/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";

const Page = () => {
  const { prisonName } = useProjectContext();

  const [prisonCapacity, setPrisonCapacity] = useState<number>(0);
  const [totalInmates, setTotalInmates] = useState<number>(0);
  const { avgSentence, setAvgSentence } = useProjectContext();

  const getAvgSentence = (total: number, inmates: Array<Inmate>) => {
    let totalSentence = 0;
    if (total > 0 && inmates.length > 0) {
      for (let i = 0; i < inmates.length; i++) {
        totalSentence += inmates[i].sentence;
      }
      setAvgSentence(Number((totalSentence / total).toFixed(2)));
    } else {
      setAvgSentence(0);
    }
  };

  useEffect(() => {
    fetch("/api/prisons")
      .then((res) => res.json())
      .then((data) =>
        data.length > 0
          ? setPrisonCapacity(data[0].max_capacity)
          : setPrisonCapacity(0)
      );
    fetch("/api/inmates")
      .then((res) => res.json())
      .then((data) => {
        setTotalInmates(data.length);
        getAvgSentence(data.length, data);
      });
  }, []);
  return (
    <ScrollArea className="h-screen w-full p-10" id="report">
      <div className="w-full justify-between flex items-center">
        <div>
          <p className="font-semibold text-[21px]">
            {`${prisonName}'s`} Inmates
          </p>
          <p className="mt-[10px] text-muted-foreground">
            Manage inmate records
          </p>
        </div>
        <div className="flex gap-5">
          <AddComponent addMore={totalInmates === prisonCapacity}  />
          <SelectReportComponent></SelectReportComponent>
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-[50px] gap-15">
        <Item variant="outline" className="flex-1">
          <ItemHeader>Total Inmates</ItemHeader>
          <ItemContent>
            <ItemTitle>{totalInmates}</ItemTitle>
            <ItemDescription>12 admitted this week</ItemDescription>
          </ItemContent>
          <ItemActions />
        </Item>
        <Item variant="outline" className="flex-1">
          <ItemHeader>Available Cells</ItemHeader>
          <ItemContent>
            <ItemTitle>52</ItemTitle>
            <ItemDescription>
              Out of {prisonCapacity} total cells
            </ItemDescription>
          </ItemContent>
          <ItemActions />
        </Item>
        <Item variant="outline" className="flex-1">
          <ItemHeader>Average Sentence</ItemHeader>
          <ItemContent>
            <ItemTitle>{`${avgSentence} years`}</ItemTitle>
            <ItemDescription>Across all inmates</ItemDescription>
          </ItemContent>
          <ItemActions />
        </Item>
      </div>
      <div className="mt-[25px] border rounded-lg p-5 mb-[50px]">
        <p className="mb-[20px]">Inmate Records</p>
        <TableComponent />
      </div>
    </ScrollArea>
  );
};

export default Page;
