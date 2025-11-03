import useThemeColors from "@/hooks/useThemeColors";
import { Image, ImageSourcePropType, StyleSheet, View, ViewProps } from "react-native";
import Row from "../Row";
import { ThemedText } from "../ThemedText";

type Props = ViewProps & {
    title?: string,
    description?: string, 
    image?: ImageSourcePropType
}

export function PokemonSpec({style,image, title, description, ...rest}: Props){
    const colors = useThemeColors()
    return (
        <View style={[style, styles.rootStyle]} {...rest}>
            <Row style={styles.row}>
                { image && <Image source={image} height={16} width={16}/>}
                <ThemedText variant="caption" color="grayMedium">{title}</ThemedText>
            </Row>
            <ThemedText variant="caption" color="grayMedium">{description}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    rootStyle: {
        flex : 1,
        gap: 4,
        alignItems: "center"
    },
    row: {
        height: 32,
        alignItems: "center"
    }
}
)