import axios, { AxiosError, AxiosInstance } from "axios";
import { Buffer } from "buffer";
import fs from "react-native-fs";
import { Account, AccountCreated } from "../../models/Account";
import { Credentials, Token } from "../../models/Credentials";
import { DownloadFile } from "../../models/DownloadFile";
import { FileUpload, FileUploadResponse } from "../../models/FileUpload";
import { HttpException } from "../errors/HttpException";

const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

class HttpClient {
    private api: AxiosInstance;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.api = axios.create({
            baseURL: baseUrl,
            headers: HEADERS
        });
    }

    public login = async (credentials: Credentials): Promise<Token> => {
        try {
            const response = await this.api.post(
                "/login",
                credentials,
                { headers: HEADERS }
            );
            return (response.data as Token);
        } catch (error) {
            this.handleException(error as Error, "Login Error: ${error}");
        }
    }

    public saveAccount = async (account: Account): Promise<AccountCreated> => {
        try {
            const response = await this.api.post(
                "/accounts",
                account,
                { headers: HEADERS },
            );

            return (response.data as AccountCreated);
        } catch (error) {
            this.handleException(error as Error, "Account save Error");
        }
    }

    public upload = async (inputFile: FileUpload): Promise<FileUploadResponse> => {
        try {
            var formData = new FormData();
            formData.append("file", inputFile);

            const response = await this.api.post("/files/upload", formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            return (response.data as FileUploadResponse);
        } catch (error) {
            this.handleException(error as Error, "Upload Error");
        }
    }

    public download = async (fileName: string): Promise<DownloadFile> => {
        try {
            const response = await this.api.get(
                `/files/download/${fileName}`,
                {
                    headers: {
                        Accept: "*/*",
                    },
                    responseType: 'arraybuffer',
                },
            );

            const path = `${fs.DownloadDirectoryPath}/${fileName}`;
            const data = Buffer.from(response.data, "binary").toString("base64");

            await this.makeFile(path, data);

            return new DownloadFile(fileName, path);
        } catch (error) {
            this.handleException(error as Error, "Download Error");
        }
    }

    private makeFile = async (filePath: string, data: string) => {
        try {
            await fs.writeFile(filePath, data, "base64");
        } catch (error) {
            console.log(error);
        }
    }

    private handleException = (error: Error, message: string): void => {
        let exeption;
        if (error instanceof AxiosError) {
            exeption = { status: error.response!.status, message: error.message } as HttpException;
        } else {
            exeption = { ...error } as HttpException;
        }
        console.log(`${message}: ${JSON.stringify(exeption)}`);
        throw exeption;
    }
}

export default HttpClient;
