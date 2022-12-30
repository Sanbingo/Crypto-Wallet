import React from "react";
import { View, Text} from 'react-native'
import {
    ChartDot, ChartPath, ChartPathProvider, ChartXLabel, ChartYLabel, monotoneCubicInterpolation
} from '@rainbow-me/animated-charts'
import { SIZES, COLORS, FONTS } from "../constants";
import moment from 'moment';

const Chart = ({ containerStyle, chartPrice }) => {
    
    // points
    let startUnixTimestamp = moment().subtract(7, 'day').unix()
    let data = chartPrice ? chartPrice?.map((item, index) => {
        return {
            x: startUnixTimestamp + (index+1)*3600,
            y: item
        }
    }) : []

    
    let points = monotoneCubicInterpolation({ data, range: 40 })
    console.log('chartPrice', points)

    return (
        <View
            style={{...containerStyle}}
        >
            {
                data.length > 0 &&
                <ChartPathProvider
                    data={{
                        points,
                        smoothingStrategy: 'bezier'
                    }}
                >
                    <ChartPath
                        height={150}
                        width={SIZES.width}
                        stroke={COLORS.lightGreen}
                        strokeWidth={2}
                    />
                </ChartPathProvider>
            }
        </View>
    )
}

export default Chart;