import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import { MainLayout } from './'
import { connect } from 'react-redux';
import { getCoinMarket, getHoldings } from '../stores/market/marketActions';
import { useFocusEffect } from '@react-navigation/native';
import { SIZES, COLORS, FONTS, dummyData, icons } from '../constants';
import { BalanceInfo, IconTextButton, Chart } from '../components';


const Home = ({
    getHoldings,
    getCoinMarket,
    myHoldings,
    coins
}) => {
    const [ selectedCoin, setSelectedCoin ] = React.useState(null)
    useFocusEffect(React.useCallback(() => {
        getHoldings(dummyData.holdings)
        getCoinMarket()
    },[]))


    let totalWallet = myHoldings?.reduce((a,b) => {
        return a+(b.total || 0)
    }, 0)

    let valueChange = myHoldings?.reduce((a,b) => a + (b.holding_value_change_7d || 0), 0)
    let precChange = valueChange / (totalWallet - valueChange) * 100

    function renderWalletInfoSection() {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: COLORS.gray
                }}
            >
                {/* Balance info */}
                <BalanceInfo
                    title="Your wallet"
                    displayAmount={totalWallet}
                    changePct={precChange}
                    containerStyle={{
                        marginTop: 50
                    }}
                />
                {/* Buttons */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginBottom: -15,
                        paddingHorizontal: SIZES.radius
                    }}
                >
                    <IconTextButton
                        label="Transfer"
                        icon={icons.send}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                            marginRight: SIZES.radius
                        }}
                        onPress={() => console.log('Transfer')}
                    />

                    <IconTextButton
                        label="Transfer"
                        icon={icons.withdraw}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                        }}
                        onPress={() => console.log('Withdraw')}
                    />

                </View>

            </View>
        )
    }
    return (
        <MainLayout>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.black
                }}
            >
                {/* wallet info */}
                {renderWalletInfoSection()}
                {/* chart */}
                <Chart
                    containerStyle={{
                        marginTop: SIZES.padding * 2,
                    }}
                    chartPrice={ selectedCoin ? selectedCoin?.sparkline_in_7d?.price : coins?.[0]?.sparkline_in_7d?.price}
                />
                {/* Top Crypto list */}
                <FlatList
                    data={coins}
                    keyExtractor={ item => item.id}
                    contentContainStyle={{
                        marginTop: 20,
                        paddingHorizontal: SIZES.padding
                    }}
                    ListHeaderComponent={ () => (
                        <View style={{
                            marginBottom: SIZES.radius
                        }}>
                            <Text style={{
                                color: COLORS.white,
                                ...FONTS.h3,
                                fontSize: 18
                            }}>Top Cryptocurrency</Text>
                        </View>
                    )}
                    renderItem={({item}) => {
                        let priceColor = (item.price_change_percentage_7d_in_currency == 0 ? COLORS.lightGray3 : item.price_change_percentage_7d_in_currency > 0 ? COLORS.lightGreen : COLORS.red)
                        return (
                            <TouchableOpacity
                                style={{
                                    height: 55,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => setSelectedCoin(item)}
                            >
                                {/* logo */}
                                <View style={{ width: 35}}>
                                    <Image
                                        source={{uri: item.image}}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                </View>
                                {/* name */}
                                <View
                                    style={{
                                        flex: 1,
                                    }}
                                >
                                    <Text style={{ color: COLORS.white, ...FONTS.h3}} >
                                        {item.name}
                                    </Text>
                                </View>
                                {/* figures */}
                                <View>
                                    <Text style={{ textAlign: 'right', color: COLORS.white, ...FONTS.h4 }}>$ {item.current_price}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        {
                                            item.price_change_percentage_7d_in_currency !== 0 &&
                                            <Image
                                                source={icons.upArrow}
                                                style={{
                                                    height: 10,
                                                    width: 10,
                                                    tintColor: priceColor,
                                                    transform: item.price_change_percentage_7d_in_currency > 0 ? [{ rotate: '45deg'}] : [{ rotate: '125deg'}]
                                                }}
                                            />
                                        }
                                        <Text style={{ marginLeft: 5, color: priceColor, ...FONTS.body5, lineHeight: 15 }}>{item.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ListFooterComponent={
                        <View
                            style={{ marginBottom: 50 }}
                        />
                    }
                />
            </View>
        </MainLayout>
        
    )
}

function mapStateToProps(state) {
    return {
        myHoldings: state.marketReducer.myHoldings,
        coins: state.marketReducer.coins

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePrec, perPage, page) => {
            return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePrec, perPage, page))
        },
        getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePrec, perPage, page) => {
            return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePrec, perPage, page))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);