import {Ban} from 'lucide-react'
import {useNavigate} from "react-router";

const Failure = () => {

    setTimeout(function() {
        window.location.href = '/checkout';
    }, 3000);

    return (
        <div className={'w-screen h-screen bg-[#f04037] flex items-center justify-center'}>
            <div className={'w-2/4 h-2/4 bg-white rounded-3xl flex flex-col items-center justify-center py-5'}>
                <Ban className={'size-30 text-[#f04037]'}/>
                <h1 className={'font-bold font-[Pixelify_Sans] text-[40px] mb-0'}>Uh Oh!</h1>
                <h2 className={'text-[20px] font-bold'}>There was an issue with your payment</h2>
                <h3>Redirecting....</h3>
            </div>
        </div>
    );
};

export default Failure;