import { APIRequestContext, APIResponse } from '@playwright/test';
export class BrandsApiClient {
    constructor(private readonly apiRequestContext: APIRequestContext) { }
    async getBrandsList(): Promise<APIResponse> {
        return this.apiRequestContext.get('/api/brandsList');
    }

    async putBrandsList(): Promise<APIResponse> {
        return this.apiRequestContext.put('/api/brandsList');
    }
}
