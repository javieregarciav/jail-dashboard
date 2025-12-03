"use client";

import { SquarePen } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Block, Cell, Crime, Inmate } from "@/types/types";
import { getCrimeDescription } from "@/lib/utils";
import { useEffect, useState } from "react";
import SelectCellComponent from "./SelectCellComponent";
import SelectBlockComponent from "./SelectBlockComponent";
import { SelectReleaseComponent } from "./SelectReleaseComponent";
import { useProjectContext } from "@/context/ProjectContext";

type EditComponentProps = Inmate & {
  cellsData: Array<Cell>;
  crimesData: Array<Crime>;
  blocksData: Array<Block>;
  inmatesData: Array<Inmate>;
};

const EditComponent = (props: EditComponentProps) => {
  const {setInmatesData, setInmatesDataOG} = useProjectContext();
  const [alias, setAlias] = useState<string>(props.alias ? props.alias : "");
  const [id_block, setIdBlock] = useState<number>(props.id_block);
  const [id_cell, setIdCell] = useState<number>(props.id_cell);
  const [release_date, setReleaseDate] = useState<Date | undefined>(
    props.release_date ? new Date(props.release_date) : undefined
  );

  const handleChangeReleaseDate = (date: Date | undefined) => {
    setReleaseDate(date);
  };

  const handleChangeBlock = (idBlock: number) => {
    setIdBlock(idBlock);
  };

  const handleChangeCell = (idCell: number) => {
    setIdCell(idCell);
  };

  const sendUpdatedData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (id_block !== props.id_block && id_cell === props.id_cell) {
      alert("You must select a new cell when changing the block.");
      return;
    } else {
      try {
        const response = await fetch("/api/inmates", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_inmate: props.id_inmate,
          alias: alias,
          release_date: release_date,
          id_block: id_block,
          id_cell: id_cell,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error al actualizar: ${response.status}`);
      }
      const data = await response.json();
      fetch("/api/inmates").then((res) => res.json()).then((data) => {setInmatesData(data);setInmatesDataOG(data)})
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <SquarePen size={18} className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Inmate</DialogTitle>
            <DialogDescription>Edit inmate details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder={"Enter inmate name"}
                value={props.name}
                disabled
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Alias</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Enter inmate alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Sentence (Years)</Label>
              <Input
                id="username-1"
                name="username"
                placeholder="50"
                value={props.sentence}
                disabled
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Crime</Label>
              <Input
                id="username-1"
                name="username"
                placeholder="50"
                value={getCrimeDescription(props.id_crime, props.crimesData)}
                disabled
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Block</Label>
              <SelectBlockComponent
                idBlock={props.id_block}
                blocksData={props.blocksData}
                cellsData={props.cellsData}
                onChangeBlock={handleChangeBlock}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Cell</Label>
              <SelectCellComponent
                idCell={props.id_cell}
                cellsData={props.cellsData}
                inmatesData={props.inmatesData}
                onChangeCell={handleChangeCell}
                idBlock={props.id_block}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Release date</Label>
              <SelectReleaseComponent
                releaseDate={
                  props.release_date ? new Date(props.release_date) : undefined
                }
                onChangeReleaseDate={handleChangeReleaseDate}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={sendUpdatedData}>
              Save changes
            </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditComponent;
