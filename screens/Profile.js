import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Switch
} from 'react-native';
import { MainLayout } from './'
import { HeaderBar } from '../components';
import { SIZES, FONTS, COLORS, dummyData, icons } from '../constants';

const SectionTitle = ({title}) => {
    return (
        <View
            style={{ marginTop: SIZES.padding}}
        >
            <Text style={{ color: COLORS.lightGray3, ...FONTS.h4}}>{title}</Text>
        </View>
    )
}

const Setting = ({ title, value, type, onPress }) => {
    if (type === 'button') {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center'
                }}
                onPress={onPress}
            >
                <Text style={{ flex:1, color: COLORS.white, ...FONTS.h4}}>{title}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{ marginRight: SIZES.radius, color: COLORS.lightGray3, ...FONTS.h3}}>{value}</Text>
                    <Image
                        source={icons.rightArrow}
                        style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.white
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center'
                }}
            >
                <Text style={{ flex:1, color: COLORS.white, ...FONTS.h4}}>{title}</Text>
                <Switch
                    value={value}
                    onValueChange={value => onPress(value)}
                />
            </View>
        )
    }
}

const Profile = () => {
    const [faceId, setFaceId] = React.useState(true)
    return (
        <MainLayout>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.black,
                paddingHorizontal: SIZES.padding
            }}>
                <HeaderBar title="Profile" />
                <ScrollView>
                    {/* user & email */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.radius
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: COLORS.white, ...FONTS.h3}}>{dummyData.profile.email}</Text>
                            <Text style={{ color: COLORS.lightGray, ...FONTS.body5}}>{dummyData.profile.id}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                source={icons.verified}
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.base, color: COLORS.lightGreen}}>Verified</Text>
                        </View>
                    </View>
                    {/* App section  */}
                    <SectionTitle title="App" />
                    <Setting
                        title="Launch Screen"
                        value="Home"
                        type="button"
                        onPress={() => {}}
                    />
                    <Setting
                        title="Appearance"
                        value="Dark"
                        type="button"
                        onPress={() => {}}
                    />

                    <SectionTitle title="Account" />
                    <Setting
                        title="Payment"
                        value="USD"
                        type="button"
                        onPress={() => {}}
                    />
                    <Setting
                        title="Language"
                        value="English"
                        type="button"
                        onPress={() => {}}
                    />

                    <SectionTitle title="Security" />
                    <Setting
                        title="FaceId"
                        value={faceId}
                        type="switch"
                        onPress={() => {setFaceId(!faceId)}}
                    />
                    <Setting
                        title="Password Setting"
                        value=""
                        type="button"
                        onPress={() => {}}
                    />
                    <Setting
                        title="2-Factor Authentication"
                        value=""
                        type="button"
                        onPress={() => {}}
                    />
                </ScrollView>
            </View>
        </MainLayout>
        
    )
}

export default Profile;