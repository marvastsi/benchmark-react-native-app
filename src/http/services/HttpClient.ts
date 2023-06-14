import axios, { AxiosInstance } from "axios";

const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

class HttpClient {
    private api: AxiosInstance;

    constructor(baseUrl: string) {
        console.log(`baseURL: ${baseUrl}`);
        this.api = axios.create({
            baseURL: baseUrl
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

    async upload(file: FileReader): Promise<UploadFile> {
        try {
            const response = await this.api.post(
                '/files/upload',
                file,
                { headers: HEADERS },
            );
            return (response.data as UploadFile);
        } catch (error) {
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