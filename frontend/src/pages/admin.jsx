import {useUser} from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {axiosInstance} from "../lib/axios.js";
import {Alert, Snackbar} from "@mui/material";

const Admin = () => {

    const {user} = useUser()
    const admin = useLocation().state
    const navigate = useNavigate()
    const[postImage, setPostImage] = useState({src: null})

    const[snackOpen, setSnack] = useState(false)
    const[createResult, setResult] = useState(false)

    useEffect(() => {
        if (!user || !admin) navigate('/')
    }, []); // protect admin

    const formSubmit = () => {
        event.preventDefault()
        let title = document.querySelector('#card-title').value
        let complete = true
        let card = {
            title: title.substring(0, 1).toUpperCase() + title.substring(1, title.length).toLowerCase(),
            cardNumber: Number(document.querySelector('#card-number').value),
            price: Number(document.querySelector('#card-price').value),
            qty: Number(document.querySelector('#card-qty').value),
            set: document.querySelector('#card-set').value,
            image: postImage.src
        }

        for (const key in card) {
            if (card.hasOwnProperty(key)) {
                if (key === null || '') {
                    complete = false
                }
            }
        } // check all fields filled
        if (complete) {
            axiosInstance.post('/cards/create', card).then((res) => {
                console.log(res.data.success)
                if (res.data.success) {
                    setResult(true)
                    setSnack(true)
                    document.querySelector('#info-maker').reset()
                    handleClear()
                }
            })
        } else {
            setResult(false)
            setSnack(true)
        }
    }

    function convert64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64 = await convert64(file)
        setPostImage( {...postImage, src: base64, datePosted: new Date().toISOString()})
    } // Image Functions
    const handleClear = (e) => {
        document.querySelector('#file-input').value =''
        setPostImage({src: null})
    }

    return (
        <div className={'relative w-screen h-screen bg-[#f04037] overflow-hidden flex justify-around items-center py-10 px-5'}>
            <div id={'card-maker'} className={'w-2/5 h-full px-5 py-3 flex flex-col items-center gap-3'}>
                <div id={'card-placeholder'} className={'w-3/4 h-4/4 bg-slate-300 rounded-3xl flex items-center justify-center'}><img src={postImage.src} alt=""/></div>
                <div className={'bg-white rounded-xl w-3/4 py-3 px-5'}>
                    <input autoComplete={'false'} id={'file-input'} onChange={handleFileUpload} type="file" className={'w-3/4'}/>
                    <button onClick={handleClear} className={'bg-[#f04037] text-white rounded-xl h-full w-1/4'}>Clear</button>
                </div>
            </div>
            <form onSubmit={formSubmit} id={'info-maker'} className={'bg-white w-3/7 h-full rounded-3xl px-5 py-3 flex items-center flex-col justify-between'}>
                <h1 className={'font-bold text-[40px]'}>Card Creator</h1>
                <div>
                    <input autoComplete={'false'} id={'card-title'} type="text" placeholder={'Card Title'} className={'text-[20px] border-b-2 mr-5 outline-none'}/>
                    <input autoComplete={'false'} id={'card-number'} type="text" placeholder={'Card Number'} className={'text-[20px] border-b-2 outline-none'}/>
                </div>
                <div>
                    <input autoComplete={'false'} id={'card-price'} type="text" placeholder={'Price'} className={'text-[20px] border-b-2 mr-5 outline-none'}/>
                    <input autoComplete={'false'} id={'card-qty'} type="text" placeholder={'Qty'} className={'text-[20px] border-b-2 outline-none'}/>
                </div>
                <input autoComplete={'false'} id={'card-set'} type="text" placeholder={'Set'} className={'text-[20px] border-b-2 outline-none'}/>
                <button className={'w-full h-1/10 bg-[#f04037] text-white font-bold rounded-xl'}>Upload Card</button>
            </form>
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={snackOpen} onClose={() => setSnack(false)} autoHideDuration={3000}><Alert severity={createResult ? 'success' : 'error'} variant={'filled'}>{createResult ? 'Card Successfully Uploaded' : 'Error Uploading Card | Check Fields'}</Alert></Snackbar>
            <button onClick={() => navigate('/')} className={'fixed top-5 left-5 bg-white rounded-xl px-5 py-3'}>Back</button>
        </div>
    );
};

export default Admin;