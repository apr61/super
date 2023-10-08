import React from 'react'
import { CategoriesList } from "../constants/Categories"
import { SubCategoriesList } from "../constants/Categories"
import { useSearchParams } from 'react-router-dom';
import { useBusinesses } from '../context/Businesses';

const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { rating, filterHelper, handleFilterClear, categorySelected, prevSearchParams: { subcategory } } = useBusinesses()
    const handleSubCategoriesChange = (value) => {
        let tempArray = [...subcategory]
        if (tempArray.indexOf(value) !== -1) {
            tempArray = tempArray.filter(category => category !== value)
        } else {
            tempArray.push(value)
        }
        tempArray = tempArray.join(',')
        if (tempArray.length > 0) {
            filterHelper('subcategory', tempArray)
        } else {
            searchParams.delete("subcategory")
            setSearchParams(searchParams)
        }
    }
    return (
        <section className='my-4 relative'>
            <h2 className='text-xl font-medium'>Filters</h2>
            <button onClick={handleFilterClear}
                className='absolute top-0 right-2 text-sm bg-gray-400 text-white px-2 py-1 rounded-md hover:bg-gray-500 transition duration-200'
            >
                Clear all
            </button>
            <section className='border-b my-2 py-4 px-2'>
                <h3 className='pb-2 text-lg font-medium'>Rating</h3>
                <div className='flex gap-3'>
                    <input type='radio' id='5-rating' value="5" name='rating' checked={+rating === 5}
                        onChange={(e) => filterHelper(e.target.name, e.target.value)} className='scale-125' />
                    <label htmlFor='5-rating' className='text-gray-600 cursor-pointer'>5 Stars</label>
                </div>
                <div className='flex gap-3'>
                    <input type='radio' id='4-rating' value="4" name='rating' checked={+rating === 4}
                        onChange={(e) => filterHelper(e.target.name, e.target.value)} className='scale-125' />
                    <label htmlFor='4-rating' className='text-gray-600 cursor-pointer'>4 Stars +</label>
                </div>
                <div className='flex gap-3'>
                    <input type='radio' id='3-rating' value="3" name='rating' checked={+rating === 3}
                        onChange={(e) => filterHelper(e.target.name, e.target.value)} className='scale-125' />
                    <label htmlFor='3-rating' className='text-gray-600 cursor-pointer'>3 Stars +</label>
                </div>
            </section>
            <section className='border-b my-2 py-4 px-2'>
                <h3 className='pb-2 text-lg font-medium'>Categories</h3>
                {
                    CategoriesList.map(category => (
                        <div className='flex gap-3' key={category}>
                            <input type='radio' id={category} value={category} name='find_desc' checked={categorySelected === category}
                                onChange={(e) => filterHelper(e.target.name, e.target.value)} className='scale-125' />
                            <label htmlFor={category} className='text-gray-600 cursor-pointer capitalize'>{category}</label>
                        </div>
                    ))
                }
            </section>
            {
                CategoriesList.indexOf(categorySelected) !== -1 && (
                    <section className='border-b my-2 py-4 px-2'>
                        <h3 className='pb-2 text-lg font-medium'>Sub Categories</h3>
                        {
                            SubCategoriesList[categorySelected].map(category => (
                                <div className='flex gap-3' key={category}>
                                    <input type='checkbox' id={category} value={category} name='subcategory' checked={subcategory.indexOf(category) !== -1} onChange={(e) => handleSubCategoriesChange(e.target.value)} className='scale-125' />
                                    <label htmlFor={category} className='text-gray-600 cursor-pointer capitalize'>{category}</label>
                                </div>
                            ))
                        }
                    </section>
                )
            }
        </section>
    )
}

export default Filter