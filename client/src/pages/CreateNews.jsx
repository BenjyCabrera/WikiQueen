import Form from '../components/common/Form'
import newsService from '../services/newsService'
import { toast } from 'react-toastify'
import config from '../config.json'
import { Link } from '../components/lib'

function CreateNews() {
	const handleCreate = (data) => {
		newsService
			.addNews(data)
			.then(() => {
				toast.success('Creado', config.toastSettings)
			})
			.catch((err) => console.log('Error'))
	}

	return (
		<>
			<Form
				inputs={[{ name: 'titular', label: 'Titular'},{ name: 'texto', label: 'Contenido'}]}
				
				header="Crear Noticia"
                texto="texto" 
				submitLabel="Crear"
				onSubmit={handleCreate}
				isResetAfterSubmit
			/>

			<Link to="/news">Volver</Link>
		</>
	)
}
export default CreateNews