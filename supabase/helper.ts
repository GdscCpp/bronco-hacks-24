import { Database } from "./types";

export type Tables = Database["public"]["Tables"];
export type NewUser = Tables["users"]["Insert"];
export type User = Tables["users"]["Row"];
