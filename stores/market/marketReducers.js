import * as marketActins from './marketActions'

const initialState = {
    myHoldings: [],
    coins: [],
    error: null,
    loading: false
}

const marketReducer = (state = initialState, action) => {
    switch(action.type) {
        case marketActins.GET_HOLDING_BEGIN:
            return {
                ...state,
                loading: true
            }
        case marketActins.GET_HOLDING_SUCCESS:
            console.log('hoooooo', action.payload.myHoldings)
            return {
                ...state,
                myHoldings: action.payload.myHoldings
            }
        case marketActins.GET_HOLDING_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        case marketActins.GET_COIN_MARKET_BEGIN:
            return {
                ...state,
                loading: true
            }
        case marketActins.GET_COIN_MARKET_SUCCESS:
            return {  
                ...state,
                coins: action.payload.coins
            }
        case marketActins.GET_COIN_MARKET_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return {
                state
            }
    }
}

export default marketReducer;