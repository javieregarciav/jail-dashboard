import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export function SelectReportComponent() {
  const handleOnValChange = (val: string) => {
    console.log(val);
    let url = "";
    switch (val) {
      case "block1":
        url = "http://localhost:3000/api/blocks-summary/block1_inmates";
        break;
      case "block2":
        url = "http://localhost:3000/api/blocks-summary/block2_inmates";
        break;
      case "block3":
        url = "http://localhost:3000/api/blocks-summary/block3_inmates";
        break;
      case "block4":
        url = "http://localhost:3000/api/blocks-summary/block4_inmates";
        break;
      case "block5":
        url = "http://localhost:3000/api/blocks-summary/block5_inmates";
        break;
      case "block6":
        url = "http://localhost:3000/api/blocks-summary/block6_inmates";
        break;
      case "block7":
        url = "http://localhost:3000/api/blocks-summary/block7_inmates";
        break;
      case "block8":
        url = "http://localhost:3000/api/blocks-summary/block8_inmates";
        break;
      case "block9":
        url = "http://localhost:3000/api/blocks-summary/block9_inmates";
        break;
      case "block10":
        url = "http://localhost:3000/api/blocks-summary/block10_inmates";
        break;
      case "blockSumary":
        url = "http://localhost:3000/api/blocks-summary/blocks_summary";
        break;
      case "allInmates":
        url = "http://localhost:3000/api/blocks-summary/all_inmates";
        break;
      default:
        return;
    }
    if (url) window.open(url, "_blank");
  };

  return (
    <Select onValueChange={(val) => handleOnValChange(val)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a report" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Reports</SelectLabel>
          <SelectItem value="blockSumary">All Blocks</SelectItem>
          <SelectItem value="allInmates">All Inmates</SelectItem>
          <SelectItem value="block1">Block 1: Inmates</SelectItem>
          <SelectItem value="block2">Block 2: Inmates</SelectItem>
          <SelectItem value="block3">Block 3: Inmates</SelectItem>
          <SelectItem value="block4">Block 4: Inmates</SelectItem>
          <SelectItem value="block5">Block 5: Inmates</SelectItem>
          <SelectItem value="block6">Block 6: Inmates</SelectItem>
          <SelectItem value="block7">Block 7: Inmates</SelectItem>
          <SelectItem value="block8">Block 8: Inmates</SelectItem>
          <SelectItem value="block9">Block 9: Inmates</SelectItem>
          <SelectItem value="block10">Block 10: Inmates</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
