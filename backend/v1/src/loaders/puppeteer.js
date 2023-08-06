import { Cluster } from 'puppeteer-cluster';
import { restrictionConfig } from "../config/puppeteer.js";

let clusterInstance = null;

const getClusterInstance = async () => {
  if (!clusterInstance) {
    clusterInstance = await Cluster.launch({
      
      concurrency: Cluster.CONCURRENCY_PAGE, 
      maxConcurrency: 3, 
      puppeteerOptions: {
        headless: "new",
        ignoreHTTPSErrors: true,
        defaultViewport: null,
        args: restrictionConfig.args,
        userDataDir: restrictionConfig.userDataDir,
      },
      timeout:200000,
    });
  }
  return clusterInstance;
};


export { getClusterInstance };
