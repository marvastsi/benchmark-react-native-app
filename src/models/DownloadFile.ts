import { File } from "./File";

export class DownloadFile {
    file?: File;

    constructor(name: string, path: string) {
        this.file = { name, path };
    }

    public toString = (): string => {
        return this.file?.name || "file: null";
    }

}
