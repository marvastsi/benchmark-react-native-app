import axios, { AxiosInstance } from "axios";

class HttpClient {
    private api: AxiosInstance;

    constructor(baseUrl: string) {
        this.api = axios.create({
            baseURL: baseUrl,
        });
    }

    async login(credentials: Credentials): Promise<Token> {
        try {
            return await this.api.post('/login', credentials);
        } catch (error) {
            console.log(`Login Error: ${error}`);
        }
    }

    async saveAccount(account: Account): Promise<AccountCreated> {
        try {
            return await this.api.post('/accounts', account);
        } catch (error) {
            console.log(`Account save Error: ${error}`);
        }
    }

    async upload(file: FileReader): Promise<UploadFile> {
        try {
            return await this.api.post('/files/upload', file);
        } catch (error) {
            console.log(`Upload Error: ${error}`);
        }
    }

    async download(fileName: string): Promise<string> {
        try {
            return await this.api.post(`/files/download/:${fileName}`);
        } catch (error) {
            console.log(`Download Error: ${error}`);
        }
    }

}

export default HttpClient;