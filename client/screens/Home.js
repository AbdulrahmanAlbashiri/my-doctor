import React , {useState , useEffect } from 'react';
import { StyleSheet, View , ImageBackground} from 'react-native';
import { Button , Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/homeStyles';

export default function HomeScreen(props) {
    const {navigation} = props;


    const [ token ,setToken ] = useState('');

    useEffect(() => {
      const refreshToken = navigation.addListener('focus', () => {
        _checkToken();
      })
     return refreshToken
    }, [navigation])

    const _checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setToken(token)
    }
  return (
    <ImageBackground 
    source={require('../assets/doc-bg.png')}
    style={styles.background}
    >
     <View style={styles.container}>
      <Text style={styles.title}>اهلاً بك في تطبيق طبيبي</Text>
      <Text style={styles.text}>التطبيق الاول للربط بين الاطباء والمرضى</Text>
      {token ? 
      <>
      <Button title="استعراض قائمة الأطباء" onPress={() => navigation.navigate('Doctors')}/>
      <Button type='clear' title="الصفحة الشخصية" onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.labelButton}>استعراض الملف الشخصي</Text>
      </Button>
      </>
      :
      <>
      <Button title="تسجيل الدخول " onPress={() => navigation.navigate('SignIn')}/>
      <Button  type='clear' title="تسجيل مستخدم جديد" onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.labelButton}>انشاء حساب جديد</Text>
      </Button>
      </>
      }
     </View>

    </ImageBackground>
  );
}

