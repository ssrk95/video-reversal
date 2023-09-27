import { useRef } from 'react';
import uploadIcon from '../images/upload-icon.png';
import loaderIcon from '../images/loader.gif';

function Content({handleVideoReversal, handleFileChange, srcFile, srcFileKey, revFile, revFileKey, revStatus}){

    const fileInputRef = useRef(null);

    const handleSelectFile = e => {
        try{
            fileInputRef.current.click();
        }catch(err){
            console.log('error in handleSelectFile method in Content.js: ', err);
        }
    }

    return(
        <div className="content">
            <div className="selectFileCont">
                <div className="selectFile" onClick={handleSelectFile}>
                    <img src={uploadIcon} alt='upload icon'/>
                    <div className='label'>
                        <div className='main'>Select File</div>
                        <div className='formats'>(mp4,mov,webm)</div>
                    </div>
                </div>
                <input type="file" ref={fileInputRef} accept="video/*" style={{display: 'none'}} onChange={handleFileChange} />
            </div>
            <div className="videosCont">
                <div className='lhs'>
                {srcFile && 
                    <div className='srcVideoCont'>
                        <video key={srcFileKey} width="100%" height="80%" controls>
                            <source src={URL.createObjectURL(srcFile)} type="video/mp4" />
                            <source src={URL.createObjectURL(srcFile)} type="video/webm" />
                            <source src={URL.createObjectURL(srcFile)} type="video/quicktime" />
                            Your browser does not support the video tag.
                        </video>
                        {!revFile && <button className='reverseBtn' onClick={handleVideoReversal}>Reverse</button>}
                    </div>
                }
                </div>
                <div className='rhs'>
                {revFile && 
                    <div className='revVideoCont'>
                        <video key={revFileKey} width="100%" height="80%" controls>
                            <source src={URL.createObjectURL(revFile)} type="video/mp4" />
                            <source src={URL.createObjectURL(revFile)} type="video/webm" />
                            <source src={URL.createObjectURL(revFile)} type="video/quicktime" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                }
                {revStatus === 'reversing' && 
                    <img src={loaderIcon} alt='loader icon'/>
                }
                </div>
            </div>
        </div>
    )
}

export default Content;