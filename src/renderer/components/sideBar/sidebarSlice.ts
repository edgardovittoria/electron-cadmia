import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SidebarState = {
    sidebarVisible: boolean,
    meshesWithBordersVisible: number[]
}

export const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState:{
    sidebarVisible: false,
    meshesWithBordersVisible: []
  } as SidebarState,
  reducers: {
    openSidebar(state: SidebarState){
        state.sidebarVisible = true
    },
    closeSidebar(state: SidebarState){
        state.sidebarVisible = false
    },
    toggleSidebar(state: SidebarState){
        state.sidebarVisible = !state.sidebarVisible
    },
    enableBordersForComponent(state: SidebarState, action: PayloadAction<number>){
        state.meshesWithBordersVisible.push(action.payload)
    },
    disableBordersForComponent(state: SidebarState, action: PayloadAction<number>){
        state.meshesWithBordersVisible = state.meshesWithBordersVisible.filter(mb => mb !== action.payload)
    }
  }
});

export const {closeSidebar, disableBordersForComponent, enableBordersForComponent, openSidebar, toggleSidebar} = SidebarSlice.actions

export const sidebarVisibilitySelector = (state: {sidebar: SidebarState}) => state.sidebar.sidebarVisible
export const meshesWithBordersVisibleSelector = (state: {sidebar: SidebarState}) => state.sidebar.meshesWithBordersVisible