import React, {useState}from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

import {Text,Container,Content,Card,Header,Body,H1,H3,Title, Button} from 'native-base';

import Icons from './components/Icons.js';
import Snackbar from 'react-native-snackbar';

const itemarray=new Array(9).fill('empty');

const App=()=>{
  const [isCross,setIsCross]=useState(false);
  const [winMessage,setWinMessage]=useState('');
  
  const changeItem=(itemNumber)=>{
      if(winMessage){
        return Snackbar.show({
          text:winMessage,
          backgroundColor:"#000",
          textColor:"#FFF"    
        })
      }
      if(itemarray[itemNumber]==='empty'){
        itemarray[itemNumber]= isCross ? 'cross' : 'circle';
        setIsCross(!isCross);
      }
      else{
        return  Snackbar.show({
          text:"Position is already filled !!",
          backgroundColor:"red",
          textColor:"#FFF"
        })
      }
      checkIsWinner();
      checkDraw();
  }
  const reloadGame=()=>{
    setWinMessage('');
    setIsCross(false);
    itemarray.fill('empty',0,9);
  }
  const checkDraw=()=>{
    let count=0;
    for(let i=0;i<itemarray.length;i++){
      if(itemarray[i]!='empty')
      count++;
    }
    if(count==9){
      setWinMessage("DRAW");
    }
  }

  const checkIsWinner=()=>{
      if(itemarray[0]==itemarray[1] && itemarray[1]==itemarray[2] && itemarray[0]!='empty'){
        setWinMessage(`${itemarray[0]} won`)
      }
      else if(itemarray[3]==itemarray[4] && itemarray[4]==itemarray[5] && itemarray[3]!='empty'){
        setWinMessage(`${itemarray[3]} won`)
      }
      else if(itemarray[6]==itemarray[7] && itemarray[7]==itemarray[8] && itemarray[6]!='empty'){
        setWinMessage(`${itemarray[6]} won`)
      }
      else if(itemarray[0]==itemarray[3] && itemarray[3]==itemarray[6] && itemarray[3]!='empty'){
        setWinMessage(`${itemarray[3]} won`)
      }
      else if(itemarray[1]==itemarray[4] && itemarray[4]==itemarray[7] && itemarray[4]!='empty'){
        setWinMessage(`${itemarray[4]} won`)
      }
      else if(itemarray[2]==itemarray[5] && itemarray[5]==itemarray[8] && itemarray[2]!='empty'){
        setWinMessage(`${itemarray[5]} won`)
      }
      else if(itemarray[0]==itemarray[4] && itemarray[4]==itemarray[8] && itemarray[4]!='empty'){
        setWinMessage(`${itemarray[4]} won`)
      }
      else if(itemarray[2]==itemarray[4] && itemarray[4]==itemarray[6] && itemarray[6]!='empty'){
        setWinMessage(`${itemarray[4]} won`)
      }
  }
  return (
    <Container style={{backgroundColor:"333945"}}>
      <Header>
        <Body>
          <Title>Tic Tac Toe</Title>
        </Body>
      </Header>
      <Content>
        <View style={styles.grid}>
        {itemarray.map((item,index)=>(
          <TouchableOpacity
          style={styles.box}
          key={index}
          onPress={()=>{changeItem(index)}}>
          <Card style={styles.card}>
            <Icons name={item}/>
          </Card>
          </TouchableOpacity>
        ))}
        </View>
        {winMessage ? (
          <View>
            <H1 style={styles.message}>{winMessage}</H1>
            <Button
            onPress={reloadGame}
            primary
            rounded
            block>
              <Text>Reload</Text>
            </Button>
          </View>
        ) : (
          <H3 style={styles.message}>
            {isCross ? 'Cross' : 'Circle'} turns
          </H3>
        )}
      </Content>
    </Container>
  )
}

export default App;

const styles=StyleSheet.create({
  grid:{
    flex:1,
    flexWrap:"wrap",
    flexDirection:"row",
    marginTop:20
  },
  box:{
    width:"33%",
    marginBottom:6
  },
  card:{
    height:120,
    justifyContent:"center",
    alignItems:"center"
  },
  message:{
    textTransform:"uppercase",
    textAlign:"center",
    color:"#FFF",
    marginTop:20,
    backgroundColor:"#4652B3",
    paddingVertical:10,
    marginVertical:20
  }
})