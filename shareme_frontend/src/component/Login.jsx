import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';

import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

import { client } from '../client';



const Login = () => {
  
  
  const navigate = useNavigate();
  const responseGoogle = (response) => {

    localStorage.setItem('user', JSON.stringify(response.credential));
    

    // let res = localStorage.getItem
    // console.log('Res:',res)
    let decodedHeader = jwt_decode(response.credential)
    console.log(decodedHeader)
    const { name, sub, picture } = decodedHeader ;
    
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    // console.log('id:',doc._id)
    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt='Shareme Logo' width="130px" />
          </div>

          <div className="shadow-2xl">
            
{/* one correct version */}
            <GoogleOAuthProvider clientId= {process.env.REACT_APP_GOOGLE_API_TOKEN}>
              <GoogleLogin
                
                onSuccess={responseGoogle}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;