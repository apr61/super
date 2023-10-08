import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useAddNewBusinessContext } from '../context/AddNewBusiness';


const AddNewBusinessPage = () => {
    document.title = 'Add new business'
    const { step, back, steps, currentStepIndex, isFirstStep } = useAddNewBusinessContext();
    const progess = Math.floor((currentStepIndex+ 1) / steps.length * 100)
    return (
        <form className='max-w-[40rem] mx-auto my-20'>
            <div className='flex items-center justify-between mb-2'>
                <div className='flex gap-4'>
                    {
                        !isFirstStep && (
                            <button type='button' onClick={back} className='p-4 w-12 h-12 rounded-full grid place-content-center hover:bg-primary-500'><ArrowBackIcon /></button>
                        )
                    }
                </div>
                <div className='ml-auto w-[40%]'>
                    <div className='h-1 rounded-full bg-primary-500 w-full'>
                        <div className={`h-1 rounded-full bg-primary-300 x`} style={{width: `${progess}%`}}></div>
                    </div>
                </div>
            </div>
            {step}
        </form>
    )
}

export default AddNewBusinessPage
