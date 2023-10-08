import React from 'react'
import Button from '../Button'
import { useAddNewBusinessContext } from '../../context/AddNewBusiness';
import { SET_BUSINESS_WORKING_HOURS } from '../../reducers/AddNewBusiness';

const allDays = [
  {
    day: 'sunday',
    opens: 'sunday-opens',
    closes: 'sunday-closes'
  },
  {
    day: 'monday',
    opens: 'monday-opens',
    closes: 'monday-closes'
  },
  {
    day: 'tuesday',
    opens: 'tuesday-opens',
    closes: 'tuesday-closes'
  },
  {
    day: 'wednesday',
    opens: 'wednesday-opens',
    closes: 'wednesday-closes'
  },
  {
    day: 'thursday',
    opens: 'thursday-opens',
    closes: 'thursday-closes'
  },
  {
    day: 'friday',
    opens: 'friday-opens',
    closes: 'friday-closes'
  },
  {
    day: 'saturday',
    opens: 'saturday-opens',
    closes: 'saturday-closes'
  },
]

const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const BusinessHours = () => {
  const { businessWorkingHours, reducerHelper, next } = useAddNewBusinessContext()
  const handleOnChange = (value, name) => {
    if (daysOfWeek.includes(name)) {
      const updatedDay = {
        [name]: { ...businessWorkingHours[name], isOpen: value }
      }
      reducerHelper(SET_BUSINESS_WORKING_HOURS, { ...businessWorkingHours, ...updatedDay })
    } else if (name.endsWith('-opens') || name.endsWith('-closes')) {
      const [day, type] = name.split('-')
      if (daysOfWeek.includes(day)) {
        const updatedDay = {
          [day]: { ...businessWorkingHours[day], [type]: value }
        }
        reducerHelper(SET_BUSINESS_WORKING_HOURS, { ...businessWorkingHours, ...updatedDay })
      }
    }

  }
  const isDisabled = daysOfWeek.reduce((acc, curr) => {
    return acc ||= (businessWorkingHours[curr].isOpen && businessWorkingHours[curr].opens && businessWorkingHours[curr].closes)
  }, false)

  return (
    <>
      <div className='flex flex-col gap-2 ml-auto'>
        <h1 className='text-2xl font-medium'>Add Business hours</h1>
        <p className='text-gray-500'>Let Customers know when you are open for business</p>
        <div className='max-w-[20rem]'>
          {
            allDays.map(({ day, opens, closes }) => (
              <div key={day}>
                <div className='flex my-2 items-center justify-between'>
                  <label htmlFor={day} className='cursor-pointer text-lg w-full capitalize'>{day}</label>
                  <input type='checkbox' id={day} name={day} checked={businessWorkingHours[day]['isOpen']}
                    onChange={(e) => handleOnChange(e.target.checked, e.target.name)}
                    className='border cursor-pointer rounded-md p-4 focus:outline-none w-4 h-4' />
                </div>
                {
                  businessWorkingHours[day]['isOpen'] && (
                    <div className='grid grid-cols-2 place-items-center'>
                      <div className='flex flex-col gap-2'>
                        <label htmlFor={opens} className='cursor-pointer text-md'>Opens At </label>
                        <input type='time' id={opens} name={opens} value={businessWorkingHours[day]['opens']}
                          onChange={(e) => handleOnChange(e.target.value, e.target.name)} />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <label htmlFor={closes} className='cursor-pointer text-md'>Closes At </label>
                        <input type='time' id={closes} name={closes} value={businessWorkingHours[day]['closes']}
                          onChange={(e) => handleOnChange(e.target.value, e.target.name)} />
                      </div>
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>
      </div>
      <Button text={'Next'} handleOnClick={next} isDisabled={!isDisabled} />
    </>
  )
}

export default BusinessHours