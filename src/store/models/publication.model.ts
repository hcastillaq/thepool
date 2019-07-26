export interface IPUBLICATIONMODEL{
	title: String,
	description: String,
	tags : String,
	created_at : String,
	updated_at : String
}

export const PublicationModel : IPUBLICATIONMODEL = {
	title: "Publicaciones de prueba",
	description: "Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.	",
	tags: "categoria 1, categoria 2",
	created_at: "2019-08-07",
	updated_at: "2019-08-07" 
}