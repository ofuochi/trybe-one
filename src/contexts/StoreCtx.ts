import { createContext } from "react";
import { RootStoreModel } from "../models/RootStore";

export const StoreContext = createContext<RootStoreModel | null>(null);
