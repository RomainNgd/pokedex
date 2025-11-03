import Card from "@/components/Card";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { RootView } from "@/components/RootView";
import Row from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/colors";
import { formatSize, formatWeight, getPokemonArtWork } from "@/functions/pokemons";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import useThemeColors from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

export default function AbouPokemont(){
    const colors = useThemeColors()
    const params = useLocalSearchParams() as {id: string}
    const { data : pokemon } = useFetchQuery("/pokemon/[id]", {id: params.id} )
    const maintype = pokemon?.types?.[0]?.type.name
    const colorType = maintype ? Colors.type[maintype] : colors.tint
    const types = pokemon?.types ?? []
    return (
        <RootView style={{backgroundColor: colorType}}>
            <View>
                <Image style={styles.pokeball} source={require("@/assets/images/pokeball-art.png")}/>
                <Row style={styles.header}>
                    <Pressable onPress={router.back}>
                        <Row gap={8}>
                            <Image 
                                source={require("@/assets/images/back.png")} 
                                width={32} 
                                height={32}
                            />
                            <ThemedText color="grayWhite" variant="headline" style={{textTransform: "capitalize"}}>
                                {pokemon?.name}
                            </ThemedText>
                        </Row>
                    </Pressable>
                    <ThemedText color="grayWhite" variant="subtitle2">#{params.id.padStart(3,'0')}</ThemedText>
                </Row>
                <View style={styles.body}>
                    <Image 
                        style={styles.artWork}
                        source={{uri: getPokemonArtWork(params.id) }}
                        width={200}
                        height={200}
                    />
                    <Card style={styles.card}>
                        <Row gap={16}>
                            {types.map((type) => (
                                <PokemonType name={type.type.name} key={type.type.name}/>
                            ))}
                        </Row>
                        <ThemedText style={{color: colorType}} variant="subtitle1">
                            About
                        </ThemedText>
                        <Row>
                            <PokemonSpec title={formatWeight(pokemon?.weight)} description="Weight" image={require('@/assets/images/weight.png')} style={{ borderStyle:'solid', borderRightWidth:1, borderColor: colors.grayLight}}/>
                            <PokemonSpec title={formatSize(pokemon?.height)} description="size" image={require('@/assets/images/straighten.png')} style={{ borderStyle:'solid', borderRightWidth:1, borderColor: colors.grayLight}} />
                            <PokemonSpec title={pokemon?.moves.slice(0,2).map((m) => m.move.name).join("\n")} description="size"/>
                        </Row>
                        <ThemedText style={{color: colorType}} variant="subtitle1">Stats</ThemedText>
                    </Card>
                </View>
            </View>
        </RootView>
    );
}

const styles = StyleSheet.create({
    header : {
        margin: 20,
        justifyContent: "space-between"
    },
    pokeball: {
        position: "absolute",
        right: 8,
        top: 8
    },
    artWork: {
        alignSelf: "center",
        position: "absolute",
        top: -140,
        zIndex: 2
    },
    body: {
        marginTop: 144
    }, 
    card: {
        paddingHorizontal: 20,
        paddingTop: 60,
        gap: 16,
        alignItems: "center"
    }
})