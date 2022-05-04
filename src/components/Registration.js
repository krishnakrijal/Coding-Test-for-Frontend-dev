import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import zxcvbn from 'zxcvbn'



const data = [
  { 
    id:1,
    name: "firstName",
    label: "First Name",
    required: true,
    hidden: true,
    data_type: "fName",
    html_element: "TextField",
    error: true,
    variant: "outlined"
  },


  {
    id:2,
    name: "lastName",
    label: "Last Name",
    required: true,
    hidden: true,
    data_type: "lName",
    html_element: "TextField",
    error: true,
    variant: "outlined"
  },

  {
    id:3,
    name: "email",
    label: "Email",
    hidden: false,
    required: true,
    data_type: "email",
    html_element: "TextField",
    error: TouchRipple,
    variant: "outlined"
  },

  {
    id:4,
    name: "password",
    label: "Password",
    hidden: false,
    required: true,
    data_type: "password",
    html_element: "TextField",
    error: TouchRipple,
    variant: "outlined"
  },
  {
    id:5,
    name: "country",
    label: "Country",
    hidden: false,
    required: true,
    data_type: "Image",
    error: false,
    variant: "outlined",
    placeholder: "Choose Country",
    html_element: "Select",
    
  }

]




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Registration = () => {

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    country: "",
    email: "",
  
  })
  const [error, setError] = useState(
    {fNameError:null,
      lNameError:null,
      emailError:null,
      passwordError:null,
      countryError:null});
  
  const [helperText,setHelperText]= useState(
    {fNameHelperText:"",
    lNameHelperText:"",
    emailHelperText:"",
    passwordHelperText:"",
    countryHelperText:""})
  
  const [countries,setCountries]= useState([]);
  const [show,setShow]= useState(false)

 useEffect(()=>{
   console.log("render")
  const getData = async () => {
    const data = await fetch("https://restcountries.com/v2/all");
    const data1 = await data.json();
    console.log(data1);
    setCountries(data1);
  }
    getData()
    .catch(console.error)
 },[])

 const emailValidity=(value)=>{
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
   return regex.test(value)
 }

 const passwordValidity =(password)=>zxcvbn(password,[values.firstName,values.lastName])
 

  const onHandleChange = e => {
    const { name, value } = e.target;
    console.log(name,value)
    setValues({ ...values, [name]: value });
    if(!name){
      setError({fNameError:false,
        lNameError:false,
        emailError:false,
        passwordError:false,
      countryError:false});
      setHelperText({...helperText})
      console.log("error",error)
    }else if(name==="firstName" ) {
      let fName = /^[a-zA-Z]+$/;
       if(fName.test(value)){
        setError({fNameError:false,
          lNameError:false,
          emailError:false,
          passwordError:false,
          countryError:false});
        setHelperText({...helperText,fNameHelperText:"Valid First Name"})
        
       }else{
        setError({...error,fNameError:true});
        setHelperText({...helperText,fNameHelperText:"First Name should only be alphabet"})
        
       }
    }else if(name==="lastName" ) {
      let fName = /^[a-zA-Z]+$/;
       if(fName.test(value)){
        setError({fNameError:false,
          lNameError:false,
          emailError:false,
          passwordError:false});
        setHelperText({...helperText,lNameHelperText:"Valid Last Name"})
        
       }else{
        setError({...error,lNameError:true});
        setHelperText({...helperText,lNameHelperText:"Last Name should only be alphabet"})
        
       }
      }else if(name==="email"){
       
      if( emailValidity(value))
      {
        setError({fNameError:false,
          lNameError:false,
          emailError:false,
          passwordError:false});
         setHelperText({...helperText,emailHelperText:"Valid email"})
      } else {
        setError({...error,emailError:true});
        setHelperText({...helperText,emailHelperText:"Invalid email"})
      }
    }else if(name==="password"){
       const pass = passwordValidity(values.password);
      console.log("zxcvbn",pass)
      if(pass.score<2){
        setError({...error,passwordError:true});
        setHelperText({...helperText,passwordHelperText:pass.feedback.suggestions.map(suggestion=><li>{suggestion}</li>)})
      }else{
        setError({fNameError:false,
          lNameError:false,
          emailError:false,
          passwordError:false});
        setHelperText({...helperText,passwordHelperText:`Valid password and Strength:${pass.score}`})
      }

    }else if(name==="country"){
      if(value !==countries.value){
        setError({fNameError:false,
          lNameError:false,
          emailError:false,
          passwordError:false,countryError:false});
         setHelperText({...helperText,countryHelperText:""})
      }else{
        setError({...error,countryError:true});
        setHelperText({...helperText,countryHelperText:"Select Country"})
      }
    }
    

  }
  console.log("error",error)
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const {firstName,lastName,email,password,country}= values;
   console.log("krishna");
   if (firstName !==""  && lastName !==""  && email !=="" && password !==""  && country !=="" ){
    setShow(true)
    setError({fNameError:false,
      lNameError:false,
      emailError:false,
      passwordError:false,
      countryError:false});
    setHelperText({fNameHelperText:"",
    lNameHelperText:"",
    emailHelperText:"",
    passwordHelperText:"",
    countryHelperText:""})
    }else {
    setError({fNameError:true,
      lNameError:true,
      emailError:true,
      passwordError:true,
      countryError:true});
    setHelperText({fNameHelperText:"Required",
    lNameHelperText:"Required",
    emailHelperText:"Required",
    passwordHelperText:"Required",
    countryHelperText:"Required"})
   
    
  }
   
  
    

    
    
    console.log(values)
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AppRegistrationIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box component="form" noValidate  onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {
                data.map(d1 => {
                  return (
                  <Grid item xs={12} sm={6} key={d1.id}>
                    {
                    d1.data_type === "fName" ?
                    
                      <TextField fullWidth={true} 
                        error={error.fNameError}
                         variant={d1.variant}
                        label={d1.label} 
                        name={d1.name}
                        type={d1.data_type}
                        onChange={onHandleChange}
                        helperText={helperText.fNameHelperText} /> 
                        
                        :d1.data_type === "lName" ?
                    
                        <TextField fullWidth={true} 
                          error={error.lNameError}
                           variant={d1.variant}
                          label={d1.label} 
                          name={d1.name}
                          type={d1.data_type}
                          onChange={onHandleChange}
                          helperText={helperText.lNameHelperText} /> 
                          :
                         d1.data_type ==="email" ?
                        
                       <TextField
                        key={d1.id}
                        fullWidth={true}
                        error={error.emailError}
                        variant={d1.variant}
                        label={d1.label}
                        name={d1.name}
                        type={d1.data_type}
                        onChange={onHandleChange} 
                        helperText={helperText.emailHelperText} /> :
                        d1.data_type ==="password" ?  
                        <TextField
                        key={d1.id}
                        fullWidth={true}
                        error={error.passwordError}
                        variant={d1.variant}
                        label={d1.label}
                        name={d1.name}
                        type={d1.data_type}
                        onChange={onHandleChange} 
                        helperText={helperText.passwordHelperText} /> :d1.html_element === "Select" ?
                        (<Box width='250px'>
                        <TextField
                        key={d1.id}
                        fullWidth={true}
                        error={error.countryError}
                        label={d1.label}
                        select
                        name={d1.name}
                        type={d1.data_type}
                        onChange={onHandleChange} 
                        value={values.country}
                        helperText={helperText.countryHelperText} >
                          {countries.map(countryName =>
                          <MenuItem value={countryName.alpha3Code} key={countryName.numericCode}>{countryName.name}</MenuItem>)}
                        
                        </TextField>
                        </Box>):""
                      }

                    </Grid>)})
              
              }
            

            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>

          </Box>
        </Box>
        <Box>
        {show ?
                (<ul style={{listStyle:'none'}}>
                    <li> First Name:{values.firstName}</li>
                    <li>Last Name: {values.lastName}</li>
                    <li>Email:{values.email}</li>
                    <li>Password:{values.password}</li>
                    <li>Country:{values.country}</li>

                </ul>):"All TextField Should Be Filled"}
                
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}

export default Registration