import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Button , CheckBox, Input, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../styles/authStyles";
import ProfileForm from '../component/ProfileForm'
import axios from '../config/axios';
import { SIGNUP_URL } from '../config/urls';
import * as Location from 'expo-location';
import { useState , useEffect} from 'react';
import Loader from '../component/loader'
import Alert from '../component/Alert';


export default function SignUpScreen(props) {
  const {navigation} = props;

  const [location , setLocation ] = useState(null)
  const [errorMsg,setErrorMsg] = useState(null)
  const [ loading , setLoading] = useState(false)
  const [ visible , setVisible] = useState(false)
  const [alert , setAlert] = useState({
    title : '',
    message : '',
    type : ''
  })

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      
    })();
  }, []);
   
    const _signUp = async (valuse) => {
      setLoading(true)
      const body = {
        name : valuse.name,
        email : valuse.email,
        password : valuse.password,
        usertype : valuse.usertype ? 'doctor' : 'normal',
        specialization:valuse.specialization,
        workingHours:valuse.workingHours,
        address:valuse.address,
        phon:valuse.phon,
        location:{
        latitude:location ? location.latitude : null,
        longitude:location ? location.longitude : null
        }
      }   
      console.log(process.env.API_URL); 

      try {
        const response = await axios.post(SIGNUP_URL , body)
        setLoading(false) 
        setAlert({
          title:"تسجيل ناجح", 
          message:"لقد قمت بتسجيل حساب بشكل صحيح ويمكنك الانتقال الى صفحة تسجيل الدخول، هل تريد الانتقال الى صفحة تسجيل الدخول",
          type:"question"})
        setVisible(true)        
        
      } catch (e){
        console.log(e.response);
        setLoading(false);
        setAlert({title : 'تنبيه' , message : e.response.data.errors[0].message , type: "alert"});
        setVisible(true) 
      }
    }
  return (
    <ScrollView>
        <Loader title="جاري انشاء حساب جديد" loading={loading} />
        <Alert visible={visible}
        title={alert.title} 
        message={alert.message} 
        type={alert.type} 
        onClose={() => setVisible(false)} 
        onClick={() => {
          setVisible(false)
          navigation.navigate("SignIn");
        }} />
        <View style={styles.container}>
            <Icon 
            raised
            name= 'user'
            type="font-awesome"
            color="#f50"
            size={50}
            />
            <Text h4>تسجيل حساب جديد</Text>
        </View>
        <KeyboardAvoidingView 
          behavior='padding' enabled>
          <View style={styles.container}>
            <ProfileForm 
              submit ={( valuse => _signUp(valuse))}
              user={null}
              disabled={false}
              buttonTittle="تسجيل حساب"
              CheckBox={true}              
             />
          </View>
        </KeyboardAvoidingView>
    </ScrollView>
  );
}


