export const constructDbUrl = (processEnv:any)=>{
    if(processEnv.DATABASE_URL) return processEnv.DATABASE_URL;
    return `postgresql://${processEnv.DB_USER}:${processEnv.DB_PASSWORD}@${processEnv.DB_HOST}:${processEnv.DB_PORT}/${processEnv.DB_NAME}`;
}
