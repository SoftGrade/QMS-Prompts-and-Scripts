import os

# Obtener la lista de archivos en el directorio actual
files = [f for f in os.listdir('.') if f.endswith('.txt')]

# Crear el contenido del index.html
html_content = '''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lista de archivos de texto</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    ul {
      list-style-type: none;
    }
    li {
      margin: 10px 0;
    }
    a {
      text-decoration: none;
      color: blue;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <h1>Archivos disponibles</h1>
  <ul>
'''

# Añadir cada archivo a la lista de enlaces en el HTML
for file in files:
    html_content += f'    <li><a href="{file}" target="_blank">{file}</a></li>\n'

html_content += '''
  </ul>

</body>
</html>
'''

# Guardar el archivo index.html
with open('index.html', 'w') as f:
    f.write(html_content)

print("Archivo index.html generado con éxito.")
