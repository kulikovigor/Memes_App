class API {
    constructor() {
        this.baseUrl = 'https://api.imgflip.com';
    }

    getMemes() {
        return fetch(`${this.baseUrl}/get_memes`)
            .then(data => {
               return data.json();
            });
    }
}