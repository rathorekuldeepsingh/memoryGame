import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Modal
} from 'react-native';


const screenDimention = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const alphabetUsing = ["F", "A", "G", "C", "E", "B", "D", "H",]

const App = () => {
  const [machedCount, setMachedCount] = useState(0)
  const [attemptCount, setAttemptCount] = useState(0)
  const [cardData, setCardData] = useState([])
  const [selectedCards, setCardSelection] = useState([])
  const [modalText, setModalText] = useState(null)


  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  useEffect(() => {
    if(selectedCards.length == 0) {
      let data = [...alphabetUsing, ...alphabetUsing]
      data = data.map((e, i) => { return { "id": i, "char": e } })
      setCardData(shuffleArray(data))
    }
  }, [selectedCards])

  function renderModal() {
    return (
      <Modal
        visible={modalText ? true : false}
        transparent
      >
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'transparent' }}>
          <Text style={{ fontSize: 18 }}>{modalText}!</Text>
        </View>
      </Modal>
    )
  }

  function renderCards() {
    return (
      <FlatList
        data={cardData}
        keyExtractor={item => item.char}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        ListFooterComponent={() => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
            <Text style={{ fontSize: 18 }}>Attempts: {attemptCount}</Text>
            <Text style={{ fontSize: 18 }}>Matches: {machedCount}</Text>
          </View>
        )}
        renderItem={({ item, index }) => {
          let isDisabled = selectedCards.some(e => e.id == item.id)
          return (
            <TouchableOpacity
              disabled={isDisabled || selectedCards.length > 1 ? true : false }
              onPress={() => {
                if (selectedCards.length == 0) {
                  setCardSelection([item])
                } else {
                  let data = selectedCards
                  data.push(item)
                  setCardSelection(data)

                  setAttemptCount(attemptCount + 1)
                  if (selectedCards[0].char == selectedCards[1].char) {
                    setMachedCount(machedCount + 1)
                    setModalText("Matched")
                  }
                  setTimeout(() => {
                    setCardSelection([])
                    setModalText(null)
                  }, 2000)
                }
              }}

              style={{ backgroundColor: 'red', width: screenDimention.width / 4 - 20, height: screenDimention.width / 3, marginBottom: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 7 }}>
              {isDisabled && <Text style={{ fontSize: 30, color: 'white', fontWeight: '500' }}>{item.char}</Text>}
            </TouchableOpacity>
          )
        }
        }
      />
    )
  }

  return (
    <SafeAreaView>
      <View>
        {renderModal()}
        {renderCards()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
