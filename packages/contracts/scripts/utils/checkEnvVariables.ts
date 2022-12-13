export function checkAllEnvVariables(env: any) {
    for (const key in env) {
        if (env[key] === undefined) {
            throw new Error(`Missing env variable: ${key}`)
        }
        console.log(`${key}: ${env[key]}`)
    }
}
