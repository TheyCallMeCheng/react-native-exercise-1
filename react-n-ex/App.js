import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import Product from './components/product';

export default function App() {
    const URL = "https://dummyjson.com/products"
    const URL_RICERCA = "https://dummyjson.com/products/search?q="

    const [text, onChangeText] = useState("Useless Text")
    const [products, setProducts] = useState([])

    useEffect(() => {
        try{
            fetch(URL)
                .then(res => res.json())
                .then(json => setProducts(json.products))
        }catch(e){
            console.log(e)
        } 
    }, [])

    function handleTextChange(){
        console.log("Chiamo: ", URL_RICERCA + text)
        
        try{
            fetch(URL_RICERCA + text)
                .then(res => res.json())
                .then(json => setProducts(json.products))
        }catch(e){
            console.log(e)
        } 
    }

    const Item = ({id, title, description, price, thumbnail}) => {
        return(
            <View>
                <Image 
                    style={styles.image}
                    source={{
                        uri: thumbnail,
                    }}
                />
                <Text>{id}</Text>
                <Text>{title}</Text>
                <Text>{description}</Text>
                <Text>Price: {price} $</Text>
                
            </View>
        )
    } 

    return (
        <View style={styles.container}>
           <TextInput 
            value={text}
            style={styles.input} 
            onChangeText={onChangeText}
            onEndEditing={handleTextChange}
            />
            <FlatList
                data={products}
                renderItem={({item}) =>
                    <Item 
                    id={item.id} 
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    thumbnail={item.thumbnail}
                    />}
            
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  input: {
    width: "100%",
    paddingTop: 50,
  },
  image: {
    height: 50,
    width: 100
  }
});
