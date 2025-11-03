import Card from "@/components/Card";
import PokemonCard from "@/components/pokemon/PokemonCard";
import { RootView } from "@/components/RootView";
import Row from "@/components/Row";
import SearchBar from "@/components/SearchBar";
import { SortButton } from "@/components/SortButton";
import { ThemedText } from "@/components/ThemedText";
import { getPokemonId } from "@/functions/pokemons";
import { useInfinitFetchQuery } from "@/hooks/useFetchQuery";
import useThemeColors from "@/hooks/useThemeColors";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";

export default function Index() {
  const colors = useThemeColors();
  const {data, isFetching, fetchNextPage} = useInfinitFetchQuery("/pokemon?limit=21")
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('')
  const pokemons = data?.pages.flatMap((page) => page.results.map(r => ({name : r.name, id: getPokemonId(r.url)}))) ?? []
  const filteredPokemons = [
    ...(search 
      ? pokemons.filter(
        p => 
          p.name.includes(search.toLowerCase()) || 
        getPokemonId(p.url).toString() === search
      ) : pokemons),
  ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1))
  return (
    <RootView>
      <Row style={styles.header} gap={16}> 
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}/>
        <ThemedText variant="headline" color="grayLight">Pokedex</ThemedText>
      </Row>
      <Row gap={16}>
        <SearchBar value={search} onChange={setSearch}/>
        <SortButton value={sortKey} onChange={setSortKey} ></SortButton>
      </Row>
      <Card style={styles.body}>
        <FlatList 
        data={filteredPokemons}
        numColumns={3}
        contentContainerStyle={[styles.gridGap, styles.list]}
        columnWrapperStyle={styles.gridGap}
        ListFooterComponent={
          isFetching ? <ActivityIndicator color={colors.tint}/> : null
        }
        onEndReached={search ? undefined : () => fetchNextPage()}
        renderItem={({item}) => 
        <PokemonCard id={item.id} name={item.name} style={{flex: 1/3,}} />
        } keyExtractor={(item) => item.id.toString()}/>
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  body: {
    marginTop: 16,
    flex: 1
  },
  gridGap: {
    gap: 8
  },
  list: {
    padding: 12
  }
})
