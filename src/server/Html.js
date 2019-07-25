
/**
 * Funcion que retorna una maqueta html utilizada para el SSR
 * @param {Object} obj contenido necesario para rellenar la maqueta del html 
 */
const html = (obj ) => {
	return(
		`
			<!DOCTYPE html lang="es-ES">
			<html>
				<head>
					
					<title>${obj.title}</title>

					<style id="jss-server-side">${obj.css}</style>

					<meta name="viewport" content="width=device-width, initial-scale=1.0">

					<link href="/static/css/bundle.css" rel="stylesheet" />

					<!-- Loadable Styles -->
					${obj.styles.map(style => {
						return `<link href="/static/${style.file}" rel="stylesheet" />`;
					}).join('\n')}

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
					
					<!-- Loadable Scrips -->
					${obj.scripts.map(script => {
						return `<script src="/static/${script.file}" async></script>`
					}).join('\n')}

					<!-- Bundle -->
					<script src="/static/js/bundle.js" async></script>
					
				</body>
				
			</html>
		`
	)
}

export default html; 