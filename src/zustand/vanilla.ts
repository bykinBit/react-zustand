export const createStore = (createState: any) => {
    let state: any;
    const listeners = new Set();
    const getState = () => state;
    const setState = (partial: any) => {
        const nextState = typeof partial === 'function' ? partial(state) : partial;
        const previousState = state;
        if (!Object.is(nextState, state)) {
            state = Object.assign({}, previousState, nextState);
            listeners.forEach((listener: any) => listener(state, previousState));
        }
    }
    const subscribe = (listener: any) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
    const api = {
        getState,
        setState,
        subscribe
    }
    state = createState(setState, getState, api);
    return api;
}
export default createStore;