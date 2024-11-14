import { Formik } from 'formik';
import * as yup from 'yup';
import styles from '../styles/authStyles';
import { Text , Input , CheckBox, Button } from 'react-native-elements';
import MapViewContainer from './MapViewComponent';

export default function ProfileForm(props){
    const validationSchema = yup.object().shape({
        name : yup
           .string()
           .required('اسم المستخدم مطلوب'),
        email : yup
          .string()
          .email('يجب ادخال بريد الكتروني صحيح')
          .required('البريد الالكتروني مطلوب'),
        password : yup
          .string()
          .required('يجب عليك ادخال كلمة مرور صالحة')
          .min(5," يجب ان تكون كلمة المرور اكثر من خمسة محارف"),
        usertype : yup.boolean(),
        specialization : yup.string().when('usertype',{
            is: true,
            then: (schema) => schema.required('يجب عليك ادخال التخصص')
            }),
        address : yup.string().when('usertype',{
            is: true,
            then: (schema) => schema.required('يجب عليك ادخال العنوان')
            }),
        workingHours : yup.string().when('usertype',{
            is: true,
            then: (schema) => schema.required('يجب عليك ادخال ساعات العمل')
            }),
        phon : yup.string().when('usertype',{
            is: true,
            then: (schema) => schema.required('يجب عليك ادخال رقم الجوال')
            }),

    })

    return(
        <Formik
        initialValues={{
            name: props.user?.name || '',
            email:props.user?.email || '',
            password:'',
            usertype:props.user?.usertype =='doctor',
            specialization:props.user?.profile?.specialization || '',
            workingHours:props.user?.profile?.workingHours || '',
            address:props.user?.profile?.address || '',
            phon:props.user?.profile?.phon || '',
            latitude:props.user?.latitude ||null,
            longitude: props.user ?.longitude ||null
        }}
        validationSchema={validationSchema}
        onSubmit={values => props.submit(values)}
        >
            {

                ({handleChange, handleBlur , handleSubmit , errors , values , setFieldValue , isValid}) =>(

                    <>
                       <Input 
                         name="name"
                         placeholder='الاسم'
                         value = {values.name}
                         onChangeText={handleChange('name')}
                         onBlur={handleBlur('name')}
                         style={[styles.textInput , errors.name && styles.errorInput]}
                       />
                       {errors.name && <Text p style={styles.textError}>{errors.name}</Text>}
                       <Input 
                         name="email"
                         placeholder='البريد الالكتروني'
                         keypoardType="email address"
                         value = {values.email}
                         onChangeText={handleChange('email')}
                         disabled={props.disabled}
                         onBlur={handleBlur('email')}
                         style={[styles.textInput , errors.name && styles.errorInput]}
                       />
                       {errors.email && <Text p style={styles.textError}>{errors.email}</Text>}
                       <Input 
                         name="password"
                         secureTextEntry
                         placeholder='كلمةالمرور'
                         value = {values.password}
                         onChangeText={handleChange('password')}
                         onBlur={handleBlur('password')}
                         style={[styles.textInput , errors.name && styles.errorInput]}
                       />
                        {errors.password && <Text p style={styles.textError}>{errors.password}</Text>}
                        {
                          props.CheckBox && 

                          <CheckBox
                            title="انا طبيب"
                            name="usertype"
                            checked={values.usertype}
                            onPress={() => setFieldValue('usertype' , !values.usertype)}
                         />
                        }
                       
                       { values.usertype && (

                          <>
                            <Input 
                               name="specialization"
                               placeholder='التخصص'
                               value={values.specialization}
                               onChangeText={handleChange('specialization')}
                               onBlur={handleBlur('specialization')}
                               style={[styles.textInput , errors.name && styles.errorInput]}
                            />
                            {errors.specialization && <Text p style={styles.textError}>{errors.specialization}</Text>}
                       <Input 
                         name="workingHours"
                         placeholder='ساعات العمل'
                         value={values.workingHours}
                         onChangeText={handleChange('workingHours')}
                         onBlur={handleBlur('workingHours')}
                         style={[styles.textInput , errors.name && styles.errorInput]}
                       />
                        {errors.workingHours && <Text p style={styles.textError}>{errors.workingHours}</Text>}
                       
                       <Input 
                         name="address"
                         placeholder='العنوان' 
                         value={values.address}
                         onChangeText={handleChange('address')}
                         onBlur={handleBlur('address')}
                         style={[styles.textInput , errors.name && styles.errorInput]}
                       />
                        {errors.address && <Text p style={styles.textError}>{errors.address}</Text>}
                       <Input 
                         name="phon"
                         placeholder='رقم الجوال'
                         value={values.phon}
                         onChangeText={handleChange('phon')}
                         onBlur={handleBlur('phon')}
                         style={[styles.textInput , errors.name && styles.errorInput]}
                       />
                        {errors.phon && <Text p style={styles.textError}>{errors.phon}</Text>}
                        { values.latitude && 
                          <MapViewContainer 
                          location={{latitude : values.latitude , longitude : values.longitude }}
                          lat={value => setFieldValue('latitude' , value)}
                          lng={value => setFieldValue('longitude' , value)}
                          />
                        }
            

                          </>
                       )}
                       <Button title={props.buttonTittle} style={{marginTop: '20px'}} onPress={handleSubmit} disabled={!isValid} />
                      
                    </>
                )
            }
        </Formik>
    )
}