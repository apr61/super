import React from 'react'
import { useAddNewBusinessContext } from '../../context/AddNewBusiness'
import { SET_BUSINESS_CATEGORY } from '../../reducers/AddNewBusiness'
import Button from '../Button'
import { CategoriesList } from '../../constants/Categories'
import { SubCategoriesList } from '../../constants/Categories'
import CloseIcon from '@mui/icons-material/Close';

const BusinessCategory = () => {
  const { businessCategory, reducerHelper, next } = useAddNewBusinessContext()
  const handleOnChange = (value, name) => {
    if (name === "category") {
      reducerHelper(SET_BUSINESS_CATEGORY, { category: value, subcategory: []})
    }
    if (name === "subcategory") {
      if (value === "NA") {
        reducerHelper(SET_BUSINESS_CATEGORY, { ...businessCategory, subcategory: [] })
        return
      }
      if (businessCategory.subcategory.indexOf(value) === -1) {
        reducerHelper(SET_BUSINESS_CATEGORY, { ...businessCategory, subcategory: [...businessCategory.subcategory, value] })
      }
    }
  }
  const handleRemoveSubCategory = (subcategory) => {
    let temp = businessCategory.subcategory.filter(category => category != subcategory)
    reducerHelper(SET_BUSINESS_CATEGORY, { ...businessCategory, subcategory: [...temp] })
  }
  const isCategorySelected = businessCategory.category !== "NA" && businessCategory.category.length !== 0
  const isSubCategorySelected = businessCategory.subcategory.indexOf("NA") === -1 && businessCategory.subcategory.length > 0
  const isDisabled = isCategorySelected && isSubCategorySelected

  return (
    <>
      <div className='flex flex-col gap-2 ml-auto'>
        <h1 className='text-2xl font-medium'>Enter a business category</h1>
        <p className='text-gray-500'>Help Customers discover your business by industry by adding a business category</p>
        <div className='flex flex-col my-2'>
          <label htmlFor='business-category' className='mb-2 cursor-pointer text-lg'>Business Category</label>
          <select id='business-category' name='category' onChange={(e) => handleOnChange(e.target.value, e.target.name)}
            className='border rounded-md p-4 focus:outline-none' value={businessCategory.category}>
            <option value="NA">Select Category</option>
            {
              CategoriesList.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))
            }
          </select>
        </div>
        {
          isCategorySelected && (
            <div className='flex flex-col my-2'>
              <label htmlFor='business-sub-category' className='mb-2 cursor-pointer text-lg'>Business Sub Category</label>
              <select id='business-sub-category' name='subcategory' onChange={(e) => handleOnChange(e.target.value, e.target.name)}
                className='border rounded-md p-4 focus:outline-none' value={businessCategory.subcategory[0]}>
                <option value="NA">Select Sub Category</option>
                {
                  SubCategoriesList[businessCategory.category].map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))
                }
              </select>
            </div>
          )
        }
        {
          isSubCategorySelected && (
            <div className='flex gap-2 flex-wrap'>
              {
                businessCategory.subcategory.map(category => (
                  <button type='button' key={category} onClick={() => handleRemoveSubCategory(category)}
                    className='px-4 py-2 bg-primary-500 rounded-md hover:bg-opacity-75'>
                    <span className='mr-2'>
                      {category}
                    </span>
                    <CloseIcon />
                  </button>
                ))
              }
            </div>
          )
        }
      </div>
      <Button text={'Next'} handleOnClick={next} isDisabled={!isDisabled} />
    </>
  )
}

export default BusinessCategory