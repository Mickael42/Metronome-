import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Slider } from 'react-native';
import { Audio } from 'expo-av';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 130,
      statutButton: "Play"
    };
    this.audioPlayer = new Audio.Sound();

  }

  loadingSound = async () => {
    try {
      await this.audioPlayer.loadAsync(require('./assets/audio/soundMetronome.wav'));
      console.log('chargé')
    }
    catch (error) {
      console.log(error)
    }
  }

  playSound = async () => {
    try {
      console.log(this.state.value)
      await this.audioPlayer.replayAsync();

    }
    catch (error) {
      console.log(error)
    }
  }


  stopSound = async () => {
    try {
      await this.audioPlayer.stopAsync()
      console.log('t')
      await this.audioPlayer.unloadAsync()
    }
    catch (error) {
      console.log(error)
    }
  }


  handlingAudio = async () => {

    if (this.state.statutButton === 'Play') {
      await this.loadingSound();
      var soundSpeed = setInterval(() => {
        this.playSound()
      }, (60 / this.state.value) * 1000);

     

      this.setState({
        statutButton: "Pause"
      })

    } else if (this.state.statutButton === 'Pause') {
      clearInterval(soundSpeed);
      await this.stopSound()
      
      this.setState({
        statutButton: "Play"
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Slider
          style={{ width: 250, height: 100 }}
          minimumValue={0}
          maximumValue={500}
          minimumTrackTintColor="black"
          maximumTrackTintColor="#000000"
          value={this.state.value}
          step={1}
          onValueChange={value => this.setState({ value })}

        />
        <Text>{this.state.value} BPM</Text>

        <TouchableOpacity style={styles.button} onPress={() => this.handlingAudio()}>
          <Text style={styles.buttonText}> {this.state.statutButton} </Text>
        </TouchableOpacity>

      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: 'white'
  }
});

export default App;




