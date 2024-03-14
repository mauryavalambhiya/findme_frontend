/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { IKImage, IKContext, IKUpload } from "imagekitio-react";

const ImageUpload = (props) => {
  const urlEndpoint = props.urlEndpoint;
  const publicKey = "public_Q8St8zn2dBdliKfLT06L60XDm9Q=";

const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:5000/v1/image-service/auth');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const onError = err => {
    console.log("Error", err);
    props.errorListener(err)
  };
  
  const onSuccess = res => {
    console.log("Success", res);
    props.successListener(res)
  };


  return (
    <>
      <div className=" w-fit h-fit">
        <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey}>
        <IKUpload
          validateFile={file => file.size < 2000000}
          folder={`${props.folderPath}`}
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          authenticator={authenticator}  
        />
        </IKContext>
      </div>
    </>
  );
};

export default ImageUpload;
