import { useEffect, useState } from "react";

export default function Toast(props) {

    const { Toastmsg } = props;
    const [show, setShow] = useState('show');

    useEffect(() => {
        let timer1 = setTimeout(() => setShow('hide'), 2000);
        return () => {
            clearTimeout(timer1);
        };
    }, []);

    return (
        <>
            <div className="toast-section">
                <div className="toast-block  p-3" >
                    <div className={`${Toastmsg.messageType === 'success' ? 'toast success' : 'toast failed'} w-100 mx-auto ${show}`} role="alert" data-bs-autohide="true" data-bs-delay="3000">
                        <div className="d-flex justify-content-center">
                            <div className="toast-body">{Toastmsg.message}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}