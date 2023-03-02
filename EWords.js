require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import Web3 from 'web3';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {scheme} from './app.json';

import {
  useWalletConnect,
  withWalletConnect,
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { EWordContract } from './EWord';
import  EWordContractt  from './utils/EWordContract.json';

const ewordAddress = "0x047F65031c8aBf370FDBfEf667B0b1fd702F09Ef"

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
var Contract = require('web3-eth-contract');

//Using HTTPS
////////const web3 = createAlchemyWeb3("https://eth-mainnet.g.alchemy.com/1NkuHJk9fySa1xwgPZ21rwqkGJbh_9Cm");

// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(alchemyKey); 

//////console.warn(web3);

//console.warn(web3);

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length,
  )}`;
};

const Section: React.FC<{
    title: string;
  }> = ({children, title}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
      </View>
    );
  };

  const EWords = () => {

    const connector = useWalletConnect();

    const [data, setData] = React.useState([]);

    ewords_result: Number;

    // const web3 = React.useMemo(
    //   () => new Web3('https://alfajores-forno.celo-testnet.org')
    // );


    useEffect(()=>{

      // console.log("web3", web3);

      Contract.setProvider('wss://eth-goerli.g.alchemy.com/v2/1NkuHJk9fySa1xwgPZ21rwqkGJbh_9Cm');

      const contractt = new Contract(EWordContractt.abi, ewordAddress);
       
      //const account = contract.methods.accounts
       // console.log("account", account)

      console.log("contract", contractt);

      var result1 = contractt.methods.getEWords().call((error, result1) => {

        console.log("result1", result1.length);
         var data = result1.length;     
     
        const min = Math.ceil(1);
        // max = Math.floor(data.length);
      const max = Math.floor(data);
    
        // return Math.floor(Math.random() * (max - min) + min);
        const dataa =  Math.floor(Math.random() * (max - min) + min);
        console.log("random_int", dataa)


        var result = contractt.methods.getEngWordPlWord(dataa).call((error, result) => {
          console.log(result);
          console.log(result[0]);
          console.log(result[1]);
      });
      

    });



      var result = contractt.methods.getEngWordPlWord(1).call((error, result) => {
        console.log(result);
        console.log(result[0]);
        console.log(result[1]);
    });

  //   var result = contractt.methods.getEngWordPlWord(1).call((error, result) => {
  //     console.log(result);
  //     console.log(result[0]);
  //     console.log(result[1]);
  // });


          //  const result =  contract.methods.getEngWordPlWord(1)
         /////// const result =  contract.methods.getEngWordPlWord(1)
             // const result1 = contract[getEngWordPlWord](1)

           ///////console.log("result", result);
            //console.log("result1", result1);

      // loadEWordContract();

    },[],[data])

    // const connector = useWalletConnect();

    const connectWallet = React.useCallback(() => {
      return connector.connect();
    }, [connector]);
  
    const killSession = React.useCallback(() => {
      return connector.killSession();
    }, [connector]);

    return (
        <View>

<Section title="Connect your wallet">
            {!connector.connected && (
              <TouchableOpacity
                onPress={connectWallet}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
              </TouchableOpacity>
            )}
            {!!connector.connected && (
              <>
                <Text>{shortenAddress(connector.accounts[0])}</Text>
                <TouchableOpacity
                  onPress={killSession}
                  style={styles.buttonStyle}>
                  <Text style={styles.buttonTextStyle}>Log out</Text>
                </TouchableOpacity>
              </>
            )}
          </Section>

        </View>
    )
  }

  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
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
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    buttonStyle: {
      backgroundColor: '#3399FF',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#3399FF',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      fontWeight: '600',
    },
  });
export const loadEWordContract = async() => {

  const ewords = await EWordContract.methods.getEWords().call();
  setData(ewords);
  console.warn(ewords);
 
  // const ewordss =  JSON.parse(ewords)
    // setData(ewordss)
    // console.warn(ewordss.getEngWordPlWord(2));

   // const result = JSON.parse(ewordss);
    // setData(result);
    // console.warn(result);



   // console.debug(ewordss)
   // console.warn(data.getEWords());
   // console.warn(ewordss);
  return ewords;
};

  ////export default EWords;

  // export default App;
export default withWalletConnect(EWords, {
  clientMeta: {
    description: 'Connect with WalletConnect',
  },
  redirectUrl: Platform.OS === 'web' ? window.location.origin : `${scheme}://`,
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});