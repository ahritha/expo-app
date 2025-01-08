import { create } from 'zustand'

interface WebMapState {
    webmap: any
    setWebMap: (payload : any) => void
}

export const useWebMap = create<WebMapState>()((set) => ({
    webmap: {},
    setWebMap: (payload) => set(() => ({ webmap: payload })),
}))