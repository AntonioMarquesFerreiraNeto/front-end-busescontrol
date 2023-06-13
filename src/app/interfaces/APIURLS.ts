export class APIURLS {
    public apiUrl!: string;
    public apiUrlprod!: string;

    setApiUrl() {
        this.apiUrl = "https://localhost:7182/api"
    }
    getApiUrl(){
        return this.apiUrl;
    }

    setApiUrlprod() {
        this.apiUrl = "inserir a url da API neste local"
    }
    getApiUrlprod(){
        return this.apiUrlprod;
    }
}