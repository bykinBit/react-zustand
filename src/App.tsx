import { create } from './zustand';
import logger from './zustand/middleware/logger';
const createState = (set: any, get?: any, api?: any) => {
  return {
    number: 0,
    name: 'Counter',
    add: () => set((state: any) => ({ number: state.number + 1 })),
    minus: () => set((state: any) => ({ number: state.number - 1 })),
    asyncAdd: () => {
      setTimeout(() => {
        set((state: any) => ({ number: state.number + 1 }))
      }, 1000)
    }
  }
}
const useStore = create(logger(createState));

function App() {
  const { number, name, add, minus, asyncAdd } = useStore((state: any) => {
    return {
      number: state.number,
      add: state.add
    }
  })
  return (
    <>
      <p>{name}:{number}</p>
      <button onClick={add}>+</button>
      {/* <button onClick={minus}>-</button>
      <button onClick={asyncAdd}>Async+</button> */}
    </>
  )
}

export default App
