const logger = (createState: any) => {
    return (set: any, get: any, api: any) => {
        return createState((...args: any) => {
            console.log('previous state', get());
            set(...args);
            console.log('next state', get());
        }, get, api);
    }
}
export default logger;