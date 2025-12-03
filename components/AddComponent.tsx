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
import { useState } from "react";
import SelectCellComponent from "./SelectCellComponent";
import SelectBlockComponent from "./SelectBlockComponent";
import { SelectReleaseComponent } from "./SelectReleaseComponent";
import { useProjectContext } from "@/context/ProjectContext";
import SelectCrimeComponent from "./SelectCrimeComponent";

type AddComponentProps = {
  addMore: boolean;
}

const AddComponent = (props:AddComponentProps) => {
  const {inmatesData, blocksData, cells, crimesData, setInmatesData} = useProjectContext();
  const [name, setName] = useState<string>("");
  const [alias, setAlias] = useState<string | undefined>(undefined);
  const [idCrime, setIdCrime] = useState<number>(0);
  const [idBlock, setIdBlock] = useState<number>(0);
  const [idCell, setIdCell] = useState<number>(0);
  const [sentenceYears, setSentenceYears] = useState<number>(0);
  const [admission_date, setAdmissionDate] = useState<Date>(new Date());
  const [release_date, setReleaseDate] = useState<Date | undefined>(undefined);

  const handleChangeReleaseDate = (date: Date | undefined) => {
    setReleaseDate(date);
  };

  const handleSentenceChange = (sentenceYears: number) => {
    setSentenceYears(sentenceYears);
  }

  const handleChangeCrime = (newIdCrime: number) => {
    setIdCrime(newIdCrime);
    console.log(newIdCrime);
  };

  const handleChangeBlock = (idBlock: number) => {
    setIdBlock(idBlock);
    console.log(idBlock);
  };

  const handleChangeCell = (idCell: number) => {
    setIdCell(idCell);
  };

  const sendData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (idBlock === 0 || idCell === 0 || idCrime === 0 || sentenceYears === 0 || name === "") {
      e.preventDefault();
      alert("No deben haber campos vacíos.");

      return;
    } else {
      try {
        const response = await fetch("/api/inmates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          alias: alias,
          release_date: release_date,
          id_block: idBlock,
          id_cell: idCell,
          admission_date: admission_date,
          id_crime: idCrime,
          sentence: sentenceYears,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error al actualizar: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      
      fetch("/api/inmates").then((res) => res.json()).then((data) => {setInmatesData(data);})
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-[#00a5e2] text-white" disabled={props.addMore}>+ Add Inmate</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Inmate</DialogTitle>
            <DialogDescription>Add inmate details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder={"Enter inmate name"}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Alias (Optional)</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Enter inmate alias"
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Sentence (Years)</Label>
              <Input
                id="username-1"
                name="username"
                placeholder="50"
                type="number"
                min={0} 
                step="1" 
                onChange={(e) => handleSentenceChange(Number(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === '.' || e.key === '+' || e.key === '-') {
                    e.preventDefault();
                  }}}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Crime</Label>
              <SelectCrimeComponent
                idCrime={idCrime}
                crimesData={crimesData}
                onChangeCrime={handleChangeCrime}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Block</Label>
              <SelectBlockComponent
                idBlock={idBlock}
                blocksData={blocksData}
                cellsData={cells}
                onChangeBlock={handleChangeBlock}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Cell</Label>
              <SelectCellComponent
                idCell={idCell}
                cellsData={cells}
                inmatesData={inmatesData}
                onChangeCell={handleChangeCell}
                idBlock={idBlock}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Admission Date: {`${new Date().toDateString()}`}</Label>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Release date (Optional)</Label>
              <SelectReleaseComponent
                releaseDate={undefined}
                onChangeReleaseDate={handleChangeReleaseDate}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={sendData}>
              Save changes
            </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddComponent;
