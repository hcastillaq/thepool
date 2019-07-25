
/**
 * Funcion que retorna una maqueta html utilizada para el SSR
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
					
				</head>

				<body>
					<div id="root">${obj.body}</div>

					<!-- Store  -->
					<script>
						window.__PRELOADED_STATE__ = ${JSON.stringify(obj.store).replace(
							/</g,
							'\\u003c'
						)}
					</script>
				</body>
				
			</html>
		`
	)
}

export default html; 