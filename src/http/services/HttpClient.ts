import axios, { AxiosError, AxiosInstance } from "axios";
import { Account, AccountCreated } from "../../models/Account";
import { Credentials, Token } from "../../models/Credentials";
import { FileUpload, FileUploadResponse } from "../../models/FileUpload";
import fs from "react-native-fs";

const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

class HttpClient {
    private api: AxiosInstance;

    constructor(baseUrl: string) {
        this.api = axios.create({
            baseURL: baseUrl,
            headers: HEADERS
        });
    }

    async login(credentials: Credentials): Promise<Token> {
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

    async saveAccount(account: Account): Promise<AccountCreated> {
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

    async upload(inputFile: FileUpload): Promise<FileUploadResponse> {
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

    async download(fileName: string): Promise<string> {
        try {
            const response = await this.api.get(
                `/files/download/${fileName}`,
                {
                    headers: {
                        Accept: "stream",
                    },
                },
            );
            const path = `${fs.DownloadDirectoryPath}/${fileName}`;
            if (response) {
                console.log(response.data);
                this.makeFile(path, response.data);
            }
            return fileName;
        } catch (error) {
            this.handleException(error as Error, "Download Error");
        }
    }

    async makeFile(filePath: string, content: string) {
        try {
            await fs.writeFile(filePath, content, "utf8");
            console.log("written to file");
        } catch (error) {
            console.log(error);
        }
    }

    handleException(error: Error, message: string) {
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
