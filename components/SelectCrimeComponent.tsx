"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Crime } from "@/types/types";

type SelectCrimeProps = {
  idCrime: number;
  crimesData: Array<Crime>;
  onChangeCrime: (idCrime: number) => void;
};

const SelectCrimeComponent = (props: SelectCrimeProps) => {
  const [selectedCrime, setSelectedCrime] = useState<string | undefined>("");

  useEffect(() => {
    if (props.idCrime && props.crimesData.length > 0) {
      setSelectedCrime(String(props.idCrime));
    } else {
      setSelectedCrime(undefined);
    }
  }, [props.idCrime, props.crimesData])

  return (
    <Select
      value={selectedCrime}
      onValueChange={(val) => {
        setSelectedCrime(val)
        props.onChangeCrime(Number(val));
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="No crime selected" />
      </SelectTrigger>
      <SelectContent>
        {props.crimesData.map((crime) => (
          <SelectItem key={crime.id_crime} value={String(crime.id_crime)}>
            {crime.description}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCrimeComponent;
