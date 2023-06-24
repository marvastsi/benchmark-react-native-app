export type FileUpload = {
    uri: string
    name: string | null
    fileCopyUri: string | null
    type: string | null
}

export type FileUploadResponse = {
    name: string;
    url: string;
}
