export type Inmate = {
  id_inmate: number;
  name: string;
  alias: string;
  sentence: number;
  admission_date: string;
  release_date: string | undefined;
  id_cell: number;
  id_crime: number;
  id_block: number;
};

export type Block = {
  id_block: number;
  name: string;
  alias: string;
  block_capacity: number;
  id_officer: number;
  id_prison: number;
};

export type Crime = {
  id_crime: number;
  description: string;
};

export type Cell = {
  id_cell: number;
  cell_capacity: number;
  id_block: number;
}