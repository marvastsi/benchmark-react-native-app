import { FileUpload } from "./FileUpload";

export type Config = {
    testLoad: number;
    mediaFile: string;
    uploadFile: FileUpload;
    downloadFile: string;
    serverUrl: string
    scenario: number;
}