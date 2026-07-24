interface ConfigKeysInterface {
  MODE: "development" | "production" | "test" | "staging" | "qa";
  VITE_API_DEV_BACKEND_URL: string;
  VITE_API_PROD_BACKEND_URL: string;
}

type ConfigKeys = keyof ConfigKeysInterface; // | keyof NodeJS.ProcessEnv

class TisiniConfig {
  private readonly envConfig: ConfigKeysInterface;
  constructor() {
    const config = import.meta.env;
    this.envConfig = config as unknown as ConfigKeysInterface;
  }
  public getKey(key: ConfigKeys): string {
    const val = this.envConfig[key];
    if (!val) {
      throw new Error(
        `Config Error: ${key} is not defined, please check your .env file`
      );
    }
    return val;
  }
}

const TisiniconfigService = new TisiniConfig();

export default TisiniconfigService;
