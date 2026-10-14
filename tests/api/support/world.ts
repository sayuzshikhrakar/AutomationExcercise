
import { World } from '@cucumber/cucumber/lib';


export interface CustomWorldContext extends World {
    // ...
    currentUser?: any;
}

export class CustomWorld extends World implements CustomWorldContext {
    // ...
    currentUser?: any;
}
