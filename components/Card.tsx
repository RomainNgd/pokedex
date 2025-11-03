import { shadows } from "@/constants/shadows";
import useThemeColors from "@/hooks/useThemeColors";
import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps

export default function Card({style, ...rest}: Props){
    const colors = useThemeColors()
    return <View style={[style, styles, {backgroundColor: colors.grayWhite}]} {...rest}/>
}

const styles = {
    borderRadius: 8,
    ...shadows.dp2,
    overflow: 'hidden'
} satisfies ViewStyle