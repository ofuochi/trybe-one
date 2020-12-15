import { createContext } from "react";
import { NumbersModel } from "../models/NumbersStore";

export const NumbersStoreContext = createContext<NumbersModel | null>(null);
