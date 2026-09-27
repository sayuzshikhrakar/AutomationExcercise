import { setWorldConstructor, World, IWorldOptions, Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';

setDefaultTimeout(30 * 10000);

export interface CustomWorldContext extends World {
    browser?: Browser;
    context?: BrowserContext;
    page: Page;
    targetUrl: string;
    randomProduct?: any;
    selectedSubCategory?: string;
}


export class CustomWorld extends World implements CustomWorldContext {
    browser?: Browser | undefined;
    context?: BrowserContext | undefined;
    page!: Page;
    targetUrl: string = '';
    randomProduct?: any;
    selectedSubCategory?: string;
    selectedBrand?: string;

    constructor(options: IWorldOptions) {
        super(options);
    }

}

setWorldConstructor(CustomWorld);

let globalBrowser: Browser;

setWorldConstructor(CustomWorld);

BeforeAll(async function () {
    const browserType = process.env.BROWSER || 'chromium';
    const isHeadless = process.env.HEADLESS !== 'false';

    switch (browserType.toLowerCase()) {
        case 'firefox':
            globalBrowser = await firefox.launch({ headless: isHeadless });
            break;
        case 'webkit':
            globalBrowser = await webkit.launch({ headless: isHeadless });
            break;
        default:
            globalBrowser = await chromium.launch({ headless: isHeadless });
            break;
    }
});

Before(async function (this: CustomWorld, scenario) {
    const tags = scenario.pickle.tags.map((t) => t.name.toLowerCase());

    //App routing verification per Skill.md
    const isWebScenario = tags.some((t) => t.startsWith('@web'));
    if (!isWebScenario) {
        throw new Error(`No app tag found for scenario:"${scenario.pickle}". Expected @web* tag.`);
    }
    this.targetUrl = process.env.WEB_URL || 'https://automationexercise.com';

    //Instantiate context & Page
    this.context = await globalBrowser.newContext({
        viewport: { width: 1280, height: 720 },
        baseURL: this.targetUrl
    });

    // Start tracing before creating the page
    await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });

    this.page = await this.context.newPage();

    // Block Google Ads that obscure elements and cause timeouts
    await this.page.route('**/*', (route) => {
        const url = route.request().url();
        if (url.includes('googleads') || url.includes('googlesyndication') || url.includes('doubleclick') || url.includes('ad.doubleclick')) {
            route.abort();
        } else {
            route.continue();
        }
    });
});

After(async function (this: CustomWorld, scenario) {
    //Capture scerenshot on failure
    if (scenario.result?.status === Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot({
            path: `reports/screenshots/${scenario.pickle.name.replace(/\s+/g, '_')}.png`,
            fullPage: true
        });
        await this.attach(screenshot, 'image/png');
    }

    if (this.context) {
        // Stop tracing and save it for this specific scenario
        const tracePath = `reports/traces/${scenario.pickle.name.replace(/\s+/g, '_')}-trace.zip`;
        await this.context.tracing.stop({ path: tracePath });
    }

    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
});

AfterAll(async function () {
    if (globalBrowser) {
        await globalBrowser.close();
    }
})


