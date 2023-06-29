import { File } from "./File";
import { FileUpload } from "./FileUpload";

export type Config = {
    testLoad: number;
    mediaFile: File;
    uploadFile: FileUpload;
    downloadFile: string;
    serverUrl: string
    specificScenario: number;
}