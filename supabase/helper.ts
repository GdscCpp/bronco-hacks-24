import { Database } from "./types";

export type Tables = Database["public"]["Tables"];
export type NewUser = Tables["users"]["Insert"];
export type User = Tables["users"]["Row"];

export type Course = Tables["courses"]["Row"];

export type Notes = Tables["notes"]["Row"];

export type Annoucements = Tables["annoucements"]["Row"];
export type Assignment = Tables["assignments"]["Row"];
