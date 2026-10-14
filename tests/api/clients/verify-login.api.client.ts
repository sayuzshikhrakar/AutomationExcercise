import { APIRequestContext, APIResponse } from "@playwright/test";

export class VerifyLoginAPIClient {
    constructor(private readonly apiRequestContext: APIRequestContext) { }

    async verifyLogin(email: string, password: string): Promise<APIResponse> {
        if (email === "") {
            console.log("Calling verify login API with null email");
            return this.apiRequestContext.post('/api/verifyLogin', {
                form: {
                    password: password
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
        return this.apiRequestContext.post('/api/verifyLogin', {
            form: {
                email: email,
                password: password
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    async deleteVerifyLogin(): Promise<APIResponse> {
        return this.apiRequestContext.delete('/api/verifyLogin');
    }
}