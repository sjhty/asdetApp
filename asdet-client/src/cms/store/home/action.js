import * as home from './action-type'

export const switchMenu = (menuName) => {
    return {
        type: home.SWITCH_MENU,
        menuName
    }
}