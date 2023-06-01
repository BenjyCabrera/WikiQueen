import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import config from '../config.json'
import Form from '../components/common/Form'
import newsService from '../services/newsService'
import { Link } from '../components/lib'
import { isEmpty } from 'lodash'
import { Spinner } from 'react-bootstrap'

function UpdateNews() {
  let { id } = useParams()

  const [news, setNews] = useState({})
  const navigate = useNavigate()

  useEffect(() => {

    newsService
      .getNewById(id)
      .then(({ data }) => {
        
        setNews(data)
        
   
      })
      .catch(() => navigate(-1))
  }, [id, navigate])

  const handleUpdate = (data) => {
    newsService
      .updateNews(id, data)
      .then(() => {
        toast.success('Actualizado', config.toast)
      })
      .finally(() => {})
  }

  if(isEmpty(news)) return <Spinner />

  return (
    <>
      <Form
        inputs={[
            { name: 'titular', label: 'Título' },
            { name: 'texto', label: 'Texto' },
           
        ]}
        defaultValues={{
          titular: news.titular,
          texto: news.texto
        }}
        header={`Actualizar Noticia: "${news.titular}"`}
        submitLabel="Actualizar"
        onSubmit={handleUpdate}
      />
      <Link to="/news">Volver</Link>
    </>
  )
}

export default UpdateNews