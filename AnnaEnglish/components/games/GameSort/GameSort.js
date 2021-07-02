import React from "react";
import { View, FlatList, Text, TouchableOpacity,Image } from "react-native";
import { colors,randomColor } from "../../../config/colors";
// import { styles } from "../../../shared/styles";
import { styles } from "./styles";
import { PrimaryButton } from "../../buttons/PrimaryButton/PrimaryButton";
import { shuffle } from "../../../Utils/shuffle";

const WordButton = ({ word, backgroundColor }) => {

  const handleClick = () => {};
  return  (
    <TouchableOpacity style={{ flex: 1 }} onPress={handleClick}>
      <View
        style={[
          styles.card,{backgroundColor:backgroundColor}
        ]}
      >
        <Text style={[styles.label]}>{word}</Text>
      </View>
    </TouchableOpacity>
  ) 
};

const ResultWordButton = ({ answer, backgroundColor }) => {
  const handleClick = () => {};

  return  (
    <TouchableOpacity style={{ flex: 1 }} onPress={handleClick}>
      <View
        style={[
          styles.card,{backgroundColor:backgroundColor}
        ]}
      >
        <Text style={[styles.label]}></Text>
      </View>
    </TouchableOpacity>
  ) 
};


const GameSort = ({ data,onComplete  }) => {

  const backgroundColorWords=randomColor();
  const backgroundColorResult=randomColor();

  // nếu nó là cái string thì ?? viết thêm tách ra chứ sao giờ :D 
  const result = ["B", "E", "Y", "Y", "B","E"];
  const words = ["B", "E", "Y", "Y", "B","E","B", "E", "Y", "Y", "B","E"];

  //data.question
  const question = "______, see you again!";

  const numcolWordButton=(words.length<8)?7:Math.floor((words.length+1)/2);
  const numcolResultWordButton=(result.length<8)?7:Math.floor((result.length+1)/2);

  //data.image
  const imageUrl ={ uri: 'https://tiengtrunganhduong.com/Images/images/635766289191430000.jpg'};
  
  const handleButton = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 28 }}>
          {question}
        </Text>
        {imageUrl?<Image source={imageUrl} style = {{ height:120, resizeMode : 'center', margin: 5 }}></Image>:<></>}
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop:10,
          }}
          numColumns={ numcolResultWordButton}
          data={result}
          renderItem={({ item }) => <ResultWordButton answer={item} backgroundColor={backgroundColorResult} />}
        />
        <FlatList  style={{flexDirection:"column-reverse"}}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 10,
          }}
          numColumns={numcolWordButton}
          data={ words}
          renderItem={({ item }) => <WordButton word={item} backgroundColor={backgroundColorWords} />}
        />
      </View>
      <View style={styles.getStartedbtnItemWrapper}>
        <PrimaryButton label={"SUBMIT"} onPress={handleButton} />
      </View>
    </View>
  );
};

export default GameSort;
