import { useState } from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function App(){

    const [file, setFile] = useState(null);
    const [fileKey, setFileKey] = useState(0);
    const [revFile, setRevFile] = useState(null);
    const [revFileKey, setRevFileKey] = useState(0);
    const [revStatus, setRevStatus] = useState(null);

    const handleVideoReversal = e => {
        try{
            if(file){
                setRevStatus('reversing');
                const formData = new FormData();
                formData.append('video', file);
                fetch('http://localhost:3001/reverseVideo', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => {
                    console.log('response received: ', response.ok, '--', response.status);
                    if(response.ok && response.status === 200){
                        return response.blob();
                    }else{
                        throw new Error('Request failed with status: ' + response.status);
                    }
                })
                .then(revVideoBlob => {
                    setRevFile(revVideoBlob);
                    setRevFileKey(revFileKey + 1);
                    setRevStatus('reversed');
                })
                .catch(err => {
                    console.log('error reversing video: ', err);
                    setRevStatus('failed');
                });
            }
        }catch(err){
            console.log('error in handleVideoReversal method in App.js component: ', err);
            setRevStatus('failed');
        }
    }

    const validateFormat = inFile => {
        try{
            const acceptedFormats = ['video/mp4', 'video/webm', 'video/quicktime'];

            if (!acceptedFormats.includes(inFile.type)) {
                alert('File format not supported for upload. Please choose a different video format.');
                return false;
            }

            return true;

        }catch(err){
            console.log('error in validateFormat method in App.js: ', err);
        }
    }

    const handleFileChange = e => {
        try{
            let inputFile = e.target.files[0];
            let fileSizeLimitExceed = inputFile.size > (250 * 1024 * 1024);
            
            if(fileSizeLimitExceed){
                alert('File size exceeds the limit of 250MB. Please choose a smaller file.');
            }

            if(inputFile && validateFormat(inputFile) && !fileSizeLimitExceed){
                setFile(inputFile);
                setFileKey(fileKey + 1);
                if(revFile){
                    setRevFile(null);
                    setRevFileKey(revFileKey + 1);
                }
            }
        }catch(err){
            console.log('error in handleFileChange method in App.js: ', err);
        }
    }

    return(
        <div className="mainDiv">
            <Header/>
            <Content handleVideoReversal={handleVideoReversal} handleFileChange={handleFileChange} srcFile={file} srcFileKey={fileKey} revFile={revFile} revFileKey={revFileKey} revStatus={revStatus}/>
            <Footer srcFile={file} revFile={revFile} revStatus={revStatus}/>
        </div>
    );
}

export default App;