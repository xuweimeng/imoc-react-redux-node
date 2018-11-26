export const ADD_GUN = '加机关枪'
export const REMOVE_GUN = '减机关枪'

export  function counter(state=0, action) {
    switch (action.type) {
        case ADD_GUN:
            return state+1
        case REMOVE_GUN:
            return state-1
        default:
            return 10
    }
}

export function add_Gun() {
    return {
        type: ADD_GUN
    }
}

export function remove_Gun() {
    return {
        type: REMOVE_GUN
    }
}

export function two_Gun() {
    return dispatch => {
        setTimeout(function() {
            dispatch(add_Gun())
        }, 2000)
    } 
}

