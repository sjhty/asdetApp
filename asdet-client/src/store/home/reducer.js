import * as home from './action-type'

export const switchMenu = (state,action) => {
    switch (action.type) {
        case home.SWITCH_MENU:
            return {
                ...state,
                menuName: action.menuName
            };
        default:
            return { ...state }
    }
}