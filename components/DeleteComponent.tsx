import { Trash2 } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useProjectContext } from "@/context/ProjectContext";

type DeleteProps = {
  id_inmate: number;
};

const DeleteComponent = (props: DeleteProps) => {
  const {setInmatesData} = useProjectContext();
  const deleteData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const response = await fetch("/api/inmates", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_inmate: props.id_inmate,
        }),
      });
      if (!response.ok) {
        throw new Error(`ERROr: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      fetch("/api/inmates")
        .then((res) => res.json())
        .then((data) => {
          setInmatesData(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 size={18} className="cursor-pointer text-red-600" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            inmate data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteData}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteComponent;
