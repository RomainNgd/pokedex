import useThemeColors from "@/hooks/useThemeColors"
import { Image, StyleSheet, TextInput } from "react-native"
import Row from "./Row"

type Props = {
    value: string, 
    onChange: (s: string ) => void
}

export default function SearchBar({value, onChange}: Props){
    const colors = useThemeColors()
    return (
        <Row gap={8} style={[styles.wrapper, {backgroundColor: "#fff"}]}>
            <Image source={require("@/assets/images/search.png")} width={16} height={16}/>
            <TextInput 
            style={styles.input} 
            onChangeText={onChange} value={value} />
    </Row>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        flex : 1,
        borderRadius: 16,
        height: 32,
        paddingHorizontal: 12
    },
    input : {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        height: 40,
        color: '#000'
    }
})