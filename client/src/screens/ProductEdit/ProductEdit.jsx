import { useState, useEffect } from 'react'
import './ProductEdit.css'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from '../../components'
import { getProduct, updateProduct } from '../../services/products'

const ProductEdit = (props) => {

  let navigate = useNavigate()

  const [product, setProduct] = useState({
    name: '',
    description: '',
    imgURL: '',
    price: '',
  })

  let { id } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(id)
      setProduct(product)
    }
    fetchProduct()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setProduct({
      ...product,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await updateProduct(id, product)
    navigate(`/products/${id}`)
  }

  return (
    <Layout user={props.user}>
      <div className='product-edit'>
        <div className='image-container'>
          <img
            className='edit-product-image'
            src={product.imgURL}
            alt={product.name}
          />
          <form onSubmit={handleSubmit}>
            <input
              className='edit-input-image-link'
              placeholder='Image Link'
              value={product.imgURL}
              name='imgURL'
              required
              onChange={handleChange}
            />
          </form>
        </div>
        <form className='edit-form' onSubmit={handleSubmit}>
          <input
            className='input-name'
            placeholder='Name'
            value={product.name}
            name='name'
            required
            autoFocus
            onChange={handleChange}
          />
          <input
            className='input-price'
            placeholder='Price'
            value={product.price}
            name='price'
            required
            onChange={handleChange}
          />
          <textarea
            className='textarea-description'
            rows={10}
            cols={78}
            placeholder='Description'
            value={product.description}
            name='description'
            required
            onChange={handleChange}
          />
          <button type='submit' className='save-button'>
            Save
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ProductEdit
