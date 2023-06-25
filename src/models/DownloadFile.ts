export class DownloadFile {
    file?: File;

    constructor(name: string, path: string) {
        this.file = { name, path };
    }

    public toString = (): string => {
        return this.file?.name || "file: null";
    }

}

interface File {
    name: string,
    path: string
}
