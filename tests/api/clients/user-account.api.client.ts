import { APIRequestContext, APIResponse } from "@playwright/test";
import { createUserPayload, UpdateUserPayload } from "support/utils";

export interface CreateUserResult {
    response: APIResponse;
    userPayload: Awaited<ReturnType<typeof createUserPayload>>;
}

export class UserAccountAPIClient {
    constructor(private readonly apiRequestContext: APIRequestContext) { }


    async createNewValidUser(): Promise<CreateUserResult> {
        const userPayload = await createUserPayload();
        const response = await this.apiRequestContext.post('/api/createAccount', {
            form: {
                name: userPayload.name,
                email: userPayload.email,
                password: userPayload.password,
                title: userPayload.title,
                birth_date: userPayload.birth_date,
                birth_month: userPayload.birth_month,
                birth_year: userPayload.birth_year,
                firstname: userPayload.firstname,
                lastname: userPayload.lastname,
                company: userPayload.company,
                address1: userPayload.address1,
                address2: userPayload.address2,
                country: userPayload.country,
                zipcode: userPayload.zipcode,
                state: userPayload.state,
                city: userPayload.city,
                mobile_number: userPayload.mobile_number,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return { response, userPayload };
    }


    async deleteUser(email: string, password: string): Promise<APIResponse> {
        return this.apiRequestContext.delete('/api/deleteAccount', {
            form: {
                email: email,
                password: password
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    async updateUser(email: string, password: string): Promise<APIResponse> {
        const updatedPayload = await UpdateUserPayload(email, password);
        return this.apiRequestContext.put('/api/updateAccount', {
            form: {
                name: updatedPayload.name,
                email: updatedPayload.email,
                password: updatedPayload.password,
                title: updatedPayload.title,
                birth_date: updatedPayload.birth_date,
                birth_month: updatedPayload.birth_month,
                birth_year: updatedPayload.birth_year,
                firstname: updatedPayload.firstname,
                lastname: updatedPayload.lastname,
                company: updatedPayload.company,
                address1: updatedPayload.address1,
                address2: updatedPayload.address2,
                country: updatedPayload.country,
                zipcode: updatedPayload.zipcode,
                state: updatedPayload.state,
                city: updatedPayload.city,
                mobile_number: updatedPayload.mobile_number,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }


    async getUser(email: string): Promise<APIResponse> {
        return this.apiRequestContext.get('/api/getUserDetailByEmail', {
            params: {
                email: email
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}