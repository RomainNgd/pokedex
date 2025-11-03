import { getPokemonArtWork } from "@/functions/pokemons"
import useThemeColors from "@/hooks/useThemeColors"
import { Link } from "expo-router"
import { Image, Pressable, StyleSheet, View, ViewStyle } from "react-native"
import Card from "../Card"
import { ThemedText } from "../ThemedText"

type Props = {
    style?: ViewStyle
    id: number,
    name: string
}

export default function PokemonCard({style, id, name}: Props){
    const colors = useThemeColors()

    return <Link href={{pathname: '/pokemon/[id]', params: {id: id}}} asChild>
        <Pressable android_ripple={{ color: colors.tint, foreground: true}} style={style}>
            <Card style={styles.card}>
                <ThemedText variant="caption" color="grayMedium" style={styles.id}>#{id.toString().padStart(3, '000')}</ThemedText>
                <Image 
                    source={{uri: getPokemonArtWork(id) }}
                    width={72}
                    height={72}
                />
                <ThemedText>{name}</ThemedText>
                <View style={[styles.shadow, {backgroundColor: colors.grayLight} ]}></View>
            </Card>
        </Pressable>
    </Link>
}

const styles = StyleSheet.create({
    card: {
        position: "relative",
        alignItems: 'center',
        padding: 2
    },
    id: {
        alignItems: 'flex-end'
    },
    shadow : {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 44,
        borderRadius: 7,
        zIndex: -1
    }
})