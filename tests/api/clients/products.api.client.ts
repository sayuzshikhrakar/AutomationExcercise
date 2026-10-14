import { APIRequestContext, APIResponse } from '@playwright/test';
export class ProductsApiClient {
    constructor(private readonly apiRequestContext: APIRequestContext) { }

    async getProducts(): Promise<APIResponse> {
        return this.apiRequestContext.get('/api/productsList');
    }

    async postProducts(): Promise<APIResponse> {
        return this.apiRequestContext.post('/api/productsList');
    }

    async searchProduct(searchTerm: string): Promise<APIResponse> {
        if (searchTerm == '') {
            return this.apiRequestContext.post(`/api/searchProduct`);
        }
        return this.apiRequestContext.post(`/api/searchProduct`, {
            form: {
                search_product: searchTerm
            }
        });
    }


}