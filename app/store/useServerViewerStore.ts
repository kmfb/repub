// Importing necessary modules  
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface ServerConfig {
    url: string;
    authType?: string;
    username: string;
    password: string;
}

// Define your store states  
interface ServerState {
    servers: ServerConfig[];
    books: any[];
}

interface ServerActions {
    addServerConfig: (config: ServerConfig) => void;
    removeServerConfig: (url: string) => void;
    setBooks: (books: any[]) => void;
}

// Create your store  
const useServerViewerStore = create<ServerState & ServerActions>()(
    immer((set) => ({
        servers: [],
        books: [],
        addServerConfig: (config: ServerConfig) =>
            set((state) => {
                state.servers.push(config);
            }),
        removeServerConfig: (url: string) =>
            set((state) => {
                state.servers = state.servers.filter(
                    (server) => server.url !== url
                );
            }),
        setBooks: (books: any[]) =>
            set((state) => {
                state.books = books;
            }),
    }))
);

export default useServerViewerStore;  
