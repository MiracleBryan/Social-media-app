import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';

import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

import { client } from '../client';



const Login = () => {
  const clientID = '257306832534-u4rr6eis21h2sn1pmpmem4ts6r3o55j7.apps.googleusercontent.com'
  
  const navigate = useNavigate();
  const responseGoogle = (response) => {

    localStorage.setItem('user', JSON.stringify(response.credential));
    let res = localStorage.getItem
    console.log(res)
    let decodedHeader = jwt_decode(response.credential)
    console.log(decodedHeader)
    const { name, sub, picture } = decodedHeader ;
    
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    
    console.log('doc:'+doc._id)
    console.log('doc:'+doc.userName)
    console.log('doc:'+doc.image)

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace: true });
    });
    
    
    
    
    // navigate('/', { replace: true });
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
            <GoogleOAuthProvider clientId= {clientID}>
              <GoogleLogin
                
                onSuccess={responseGoogle}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>


              {/* <GoogleLogin
                clientId={clientID}
                buttonText='Welcome to login with Google'
                onSuccess={responseGoogle}
                onFailure={(fail)=>{
                  console.log('Login Failed');
                  console.log(fail);
                }}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              /> */}
            
              
            
            {/* <GoogleLogin
              
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;