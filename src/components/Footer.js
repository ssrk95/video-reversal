import { useRef } from "react";

function Footer({revStatus, revFile, srcFile}){

    const downloadBtnRef = useRef(null);

    const handleDownload = e => {
        try{
            downloadBtnRef.current.click();
        }catch(err){
            console.log('error in handleDownload method in Footer.js: ', err);
        }
    }

    return(
        <div className="footer">
            {revFile &&
                <div className="downloadFileCont" onClick={handleDownload}>
                    <span>Download Reversed Video</span>
                    <a ref={downloadBtnRef} href={URL.createObjectURL(revFile)} download={`${srcFile.name.split('.').shift()}_reversed.mp4`}>
                        <button>Download Reversed Video</button>
                    </a>
                </div>
            }
            {revStatus === 'failed' &&
                <div className="failureMsg">Failed to reverse video. Please try again.</div>
            }
        </div>
    )
}

export default Footer;