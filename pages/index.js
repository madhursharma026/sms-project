import * as React from "react";
import { Alert } from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {

    const [open, setOpen] = React.useState(false);
    const [btnStatusDisabled, setBtnStatusDisabled] = React.useState("false");
    const [collection, setCollection] = React.useState("");
    const [mobileNumber, setMobileNumber] = React.useState("");
    const [AlertMessage, setAlertMessage] = React.useState("");
    const [AlertMessageBg, setAlertMessageBg] = React.useState("");

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function sendSMS(e) {
        e.preventDefault()
        setBtnStatusDisabled("true")
        axios.get(`https://2factor.in/API/R1/?module=TRANS_SMS&apikey=e22905d7-a75a-11ec-a4c2-0200cd936042&to=${mobileNumber}&from=DTDTDT&templatename=DTDTDT&var1=${collection}`).then((resp) => {
            // if (resp.Status === "success") {
            //     setTimeout(
            //         function () {
            //             setAlertMessageBg('success')
            //             setAlertMessage("SMS Sent!")
            //             handleClick()
            //             setBtnStatusDisabled(false)
            //             setCollection("")
            //             setMobileNumber("")
            //         }.bind(this),
            //         5000
            //     );
            // } else {
            //     setTimeout(
            //         function () {
            //             setAlertMessageBg('danger')
            //             setAlertMessage(resp.Details)
            //             handleClick()
            //             setBtnStatusDisabled(false)
            //         }.bind(this),
            //         5000
            //     );
            // }
        });
        setAlertMessageBg('success')
        setAlertMessage("SMS Sent")
        handleClick()
        setTimeout(
            function () {
                setBtnStatusDisabled(false)
                setCollection("")
                setMobileNumber("")
            }.bind(this),
            5000
        );
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} className={`text-white bg-${AlertMessageBg}`}>
                    {AlertMessage}
                </Alert>
            </Snackbar>
            <div className="login-screen">
                <div>
                    <div className="text-center">
                        <img src="https://www.pngitem.com/pimgs/m/485-4852378_sample-logo-png-transparent-png.png" alt="#ImgNotFound" width="100px" height="70px" />
                    </div>
                    <div>
                        <form onSubmit={(e) => sendSMS(e)} className='mt-5'>
                            <label for="mobile_number" className="form-label" style={{ fontSize: "18px" }}><b>Mobile Number</b></label>
                            <input type="text" className="form-control mb-3" id="mobile_number" autoFocus style={{ width: "100%", fontSize: "18px" }} minLength="10" maxLength="10" required value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} autoComplete='off' />
                            <label for="new_password" className="form-label" style={{ fontSize: "18px" }}><b>Select Collection</b></label>
                            <select className="form-select" aria-label="Default select example" required onChange={(e) => setCollection(e.target.value)} value={collection}>
                                <option value="">Select Collection</option>
                                <option value="ST">ST</option>
                                <option value="FTV">FTV</option>
                                <option value="MF">MF</option>
                            </select>
                            <button type="submit" className="btn btn-primary w-100 mt-3" disabled={(btnStatusDisabled === "true") ? true : false}>Continue</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
