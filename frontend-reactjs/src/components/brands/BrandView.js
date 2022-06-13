import React, { useState, useEffect } from 'react'
import { getBrand } from '../../services/brandService'
import { CardBrands } from './CardBrands'
import { BrandNew } from './BrandNew'

export const BrandView = () => {

    const [brands, setBrands] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const listBrands = async () => {
        try {
            const { data } = await getBrand();
            console.log(data);
            setBrands(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listBrands();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <section className="container-fluid">
            <article className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
                {
                    brands.map((brand) => {
                        return <CardBrands key={ brand._id } brand={ brand } />
                    })
                }
            </article>
            {
                openModal ? <BrandNew
                    handleOpenModal={ handleOpenModal }
                    listBrands={ listBrands } /> :
                    (<button className='btn btn-dark fab' onClick={ handleOpenModal }>
                        <i className="fa-solid fa-plus"></i>
                    </button>)
            }
        </section>
    )
}