import axios, { AxiosError, AxiosInstance } from "axios";
import { Credentials, Token } from "../../models/Credentials";
import { Account, AccountCreated } from "../../models/Account";
import { FileUpload, FileUploadResponse } from "../../models/FileUpload";

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
                '/login',
                credentials,
                { headers: HEADERS }
            );
            return (response.data as Token);
        } catch (error) {
            console.log(`Login Error: ${error}`);
            throw { status: error.response!.status, message: error.message } as HttpException;
        }
    }

    async saveAccount(account: Account): Promise<AccountCreated> {
        try {
            const response = await this.api.post(
                '/accounts',
                account,
                { headers: HEADERS },
            );

            return (response.data as AccountCreated);
        } catch (error) {
            console.log(`Account save Error: ${error}: ${JSON.stringify(error)}`);
            throw { status: error.response!.status, message: error.message } as HttpException;
        }
    }

    async upload(inputFile: FileUpload): Promise<FileUploadResponse> {
        try {
            var formData = new FormData();

            formData.append('file', inputFile);

            const response = await this.api.post('/files/upload', formData,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            console.log('*****handle success******');
            console.log(response.data);
            return (response.data as FileUploadResponse);
        } catch (error) {
            if (error instanceof AxiosError) {
                const responseErr = error as AxiosError;
                console.log('*****handle failure******' + responseErr);
            }
            console.log(`Upload Error: ${error}: ${JSON.stringify(error)}`);
            throw { status: error.response!.status, message: error.message } as HttpException;
        }
    }

    async download(fileName: string): Promise<string> {
        try {
            const response = await this.api.post(
                `/files/download/:${fileName}`,
                { headers: HEADERS },
            );
            return response.data;
        } catch (error) {
            console.log(`Download Error: ${error}: ${JSON.stringify(error)}`);
            throw { status: error.response!.status, message: error.message } as HttpException;
        }
    }

}

export default HttpClient;