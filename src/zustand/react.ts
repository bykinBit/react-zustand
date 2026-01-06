import createStore from "./vanilla";
import { useCallback, useRef, useSyncExternalStore } from "react";
export function useStore<T>(api: { subscribe: (listener: () => void) => () => void; getState: () => T }, selector: (state: T) => T): T {
    const lastSnapshotRef = useRef<T>(null);
    const lastSelectionRef = useRef<T>(null);
    const getSelection = useCallback(() => {
        let lastSelection = lastSnapshotRef.current;
        if (lastSelection === null) {
            const nextSnapShot = api.getState();
            const nextSelection = selector(nextSnapShot);
            lastSelectionRef.current = nextSelection;
            lastSnapshotRef.current = nextSnapShot;
            return nextSelection;
        } else {
            const lastSnapShot = lastSelectionRef.current;
            const nextSnapShot = api.getState();
            if (Object.is(lastSnapShot, nextSnapShot)) {
                return lastSnapShot;
            }
            const nextSelection = selector(nextSnapShot);
            lastSelectionRef.current = nextSelection;
            lastSnapshotRef.current = nextSnapShot;
            return nextSelection;
        }
    }, [])
    const value = useSyncExternalStore(api.subscribe, api.getState);
    return value;
}
export const create = <T>(createState: (set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void, get: () => T, api: any) => T) => {
    const api = createStore(createState);
    return (selector: (state: T) => T) => useStore<T>(api, selector);
};
export default create;