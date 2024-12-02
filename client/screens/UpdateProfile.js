import React ,{useEffect ,useState} from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  View    
} from 'react-native';
import styles from "../styles/authStyles";
import { Text , Icon } from "react-native-elements";
import axios from "../config/axios";
import { PROFILE_URL , UPDATE_PROFILE_URL } from "../config/urls";
import Loader from "../component/loader";
import Alert from "../component/Alert";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileForm from "../component/ProfileForm";

function UpdateProfileScreen( props) {
    const [loading , setLoading ] = useState(false)
    const [ visible , setVisible ] = useState(false)
    const [ user , setUser ] = useState(null)
    const [ alert , setAlert ] = useState({
        title: '',
        message: '',
        type : ''
    })
    

    const _getProfile = async() => {
        setLoading(true)
        
        try {
            const token = await AsyncStorage.getItem('accessToken')        
            axios.defaults.headers.common.Authorization = `JWT ${token}`
            const response =await axios.get(PROFILE_URL);
            setUser(response.data)
            setLoading(false)
            
        
            
        } catch (error) {
            console.log(error);
            setLoading(false)          
            
        }
    }
    
      useEffect( () => {
        _getProfile()
      }, [])

    const _updateProfile = async (values) =>{
        setLoading(true)
        const body = {
            name : values.name,
            password : values.password,
            usertype : values.usertype? 'doctor' : 'normal',
            specialization : values.specialization,
            address : values.address,
            phon :values.phon,
            workingHours : values.workingHours,
            location : {
                latitude : values.latitude || null ,
                longitude : values.longitude || null
            }
        }
        try { 
            const response = await axios.put(UPDATE_PROFILE_URL , body)
            setLoading(false)
            setAlert({ title:"تنبيه!" , message:"تم تعديل حسابك بنجاح" , type :"alert"})
            setVisible(true)
            
        } catch (error) {
            console.log(error);
            setLoading(false)  
            setAlert({ title:"خطاء!" , message : error.response.data.errors[0], type :"alert"})  
            setVisible(true)       
            
        }
    }
    return(
        <ScrollView >
        <Loader loading={loading}/>
        <Alert visible={visible} title={alert.title} message={alert.message} type={alert.type} onClose={() => setVisible(false)}/>

        { 
            user &&
            
            
            <>
                <View style={styles.container} >
                    <Icon 
                        raised
                        name='user'
                        type='font-awesome'
                        color='#f50'
                        size={50}
                    />
                    <Text h4>تعديل بيانات المستخدم</Text>
                </View>
                <KeyboardAvoidingView behavior="padding" enabled>
                   <View style={styles.container}>
                        <ProfileForm 
                            user={user}
                            submit={(values) => _updateProfile(values)}
                            disabled={true}
                            buttonTittle="تعديل البيانات"
                            CheckBox={false}
                       />
                   </View>
                </KeyboardAvoidingView>

            </>
        }
        </ScrollView>
    )
}

export default UpdateProfileScreen;