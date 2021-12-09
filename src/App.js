import { useEffect, useState } from "react";
import { NFTStorage } from "nft.storage";
import { formatIpfsUrl } from "./utils";
import OneSignal from 'react-onesignal';

function App() {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [imageMetadata, setImageMetadata] = useState();

  async function toIPFS() {
    console.log(process.env.REACT_APP_IPFS_TOKEN);

    const client = new NFTStorage({ token: process.env.REACT_APP_IPFS_TOKEN });
    const metadata = await client.store({
      name: image.name,
      description: "nothing here",
      image,
    });    

    setImageMetadata(metadata);
  }

  function handleImage(file) {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleInput(e) {
    e.preventDefault();
    let file = e.target.files[0];
    handleImage(file);
    console.log(file);
  }

  useEffect(() => {
    if (!imageMetadata) return;
    console.log(
      "https://ipfs.io/ipfs/" +
        imageMetadata.ipnft +
        "/image/" +
        imageMetadata.data.name.replaceAll(" ", "%20")
    );
    console.log(imageMetadata);
  }, [imageMetadata]);

  return (
    <div className="App" width="500px" height="500px">
      <div>
        <input onChange={(e) => handleInput(e)} type="file" id="file" />
      </div>
      <div>
        <h1>This is a preview:</h1>
        {preview && (
          <img
            style={{ maxHeight: "500px", maxWidth: "auto" }}
            src={preview}
            alt=""
          />
        )}
      </div>
      <div>
        <button onClick={() => toIPFS()}>To IPFS</button>
        {imageMetadata && JSON.stringify(imageMetadata)}
        <h1>This is a the IPFS Image: </h1>
        {imageMetadata && (
          <img
            style={{ maxHeight: "500px", maxWidth: "auto" }}
            src={"ipfs.io/ipfs" + imageMetadata.ipnft}
            alt=""
          />
        )}
      </div>
      <img
        style={{ maxHeight: "500px", maxWidth: "auto" }}        
        src={imageMetadata ? formatIpfsUrl(imageMetadata) : ""}
        alt=""
      />
    </div>
  );
}

export default App;
