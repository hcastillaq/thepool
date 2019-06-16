
/**
 * Funcion que retorna una maquetalla html, utilizada para el SSR
 * @param {Object} obj contenido necesario para rellenar la maqueta del html 
 */
const html = (obj ) => {
	return(
		`
			<!DOCTYPE html>
			<html>
				<head>
					
					<title>${obj.title}</title>

					<style id="jss-server-side">${obj.css}</style>

					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					
					<link rel="stylesheet" type="text/css" href="/static/css/bundle.css" async>
					
					<script> window.initialData = ${JSON.stringify(obj.initialData)}</script>
				</head>

				<body>
					<div id="root">${obj.body}</div>
				</body>

				 
				<script src="/static/js/bundle.js" async ></script>

			</html>
		`
	)
}

export default html; 