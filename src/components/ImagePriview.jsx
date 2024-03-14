/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";

const ImagePriview = (props) => {
  const urlEndpoint = props.urlEndpoint;

  return (
    <>
      <div className=" w-fit h-fit">
        <IKContext urlEndpoint={urlEndpoint}>
          <IKImage
            src={props.imgUrl}
            width={props.width}
          />
        </IKContext>
      </div>
    </>
  );
};

export default ImagePriview;
