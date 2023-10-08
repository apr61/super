import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';

function Modal({ children }) {
    const navigate = useNavigate()
    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-50 h-full">
                <div className="bg-white max-w-md w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg">
                    <div className='realtive mt-8'>
                        <button className='absolute top-4 right-4 text-xl hover:bg-gray-200 rounded-full w-10 h-10' title="Close" onClick={() => navigate(-1)}><CloseRoundedIcon /></button>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal