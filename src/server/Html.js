export default (obj) => {
  return(
    `
      <html>
        <head>
          <title>${obj.title}</title>
          <link rel="stylesheet" type="text/css" href="/static/css/bundle.css">
        </head>

        <body>
          <div id="root">${obj.body}</div>

          <script src="/static/js/bundle.js" async defer ></script>
        </body>
      </html>
    `
  )
}