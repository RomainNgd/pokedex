import { StyleSheet, View, ViewProps, ViewStyle } from "react-native"

type Props = ViewProps & {
    gap ?: number
}

export default function Row({style, gap, ...rest}: Props) {
    return <View style={[styles.rowStyle, style, gap ? {gap: gap} : undefined]} {...rest} ></View>
}

const styles = StyleSheet.create({
    rowStyle : {
        flex: 0,
        flexDirection : 'row',
        alignItems : "center"
    } satisfies ViewStyle
}) 