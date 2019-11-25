import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ErrorMessage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import api from '../services/api';
import PropTypes from 'prop-types';
import {AsyncStorage} from 'react-native';


export default class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  //salvando nome token
  async setItem(key, value) {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // console.error('AsyncStorage#setItem error: ' + error.message);
    }
}
async getItem(key) {
    return await AsyncStorage.getItem(key)
        .then((result) => {
            if (result) {
                try {
                    result = JSON.parse(result);
                } catch (e) {
                    // console.error('AsyncStorage#getItem error deserializing JSON for key: ' + key, e.message);
                }
            }
            return result;
        });

}

// async setItem(key, value) {
//   this.setState({ email });
// };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };


  handleCreateAccountPress = () => {
    this.props.navigation.navigate('Cadastro');
  };

  state = {
    email: 'toninho@gmail.com',
    password: '12345',
    error: '',
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };



  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      alert('Preencha usuário e senha para continuar!', () => false);
    } else {
      try {
        
        const usuario = {
          email: this.state.email,
          password: this.state.password
        }

        const response = await api.post('http://10.0.3.2:3333/auth/authenticate', usuario);

        if (response.status == 200) {
          let nome = response.data.user.name;
          alert('Bem vindo ' + nome);
          
        // salvando nome token
        await this.setItem('@OtakuApp:token', response.data.token);
        await this.setItem('@OtakuApp:nome', response.data.user.name);
        
        cu = await this.getItem('@OtakuApp:nome');
        await this.setItem('@OtakuApp:logado', true );

        console.log(cu);
        

        }


        
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
             NavigationActions.navigate({ routeName: 'Feed', params: {token: response.data.token } }),
           ],
         });

         this.props.navigation.dispatch(resetAction);
      } catch (_err) {

        let mensagem = 'Houve um problema no login: '
        if (_err.response.status == 400) {
          mensagem += _err.response.data.error;
          alert(mensagem);
        }
          
      }
    }
  };

  render() {
    return (   

      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>


        <View style={styles.form}>
          <Text style={styles.label}> Usuario: </Text>
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#999"
            onChangeText={this.handleEmailChange}
            value={this.state.email}


          />

          <Text style={styles.label}> Senha: </Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Sua senha"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#999"
            onChangeText={this.handlePasswordChange}
            value={this.state.password}


          />

          {this.state.error.length !== 0 && <ErrorMessage style={styles.error}>{this.state.error}</ErrorMessage>}

          <TouchableOpacity style={styles.button} onPress={this.handleSignInPress}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cadastro} onPress={this.handleCreateAccountPress}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B2EBF2'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
    backgroundColor: '#fff'
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  button: {
    height: 42,
    backgroundColor: '#039BE5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    textAlign: 'center',
    color: '#ce2029',
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 20
  }

});