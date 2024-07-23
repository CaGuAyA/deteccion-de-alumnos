from flask import Flask, request, jsonify, send_file
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from datetime import datetime

app = Flask(__name__)

def generar_pdf(datos):
    pdf = SimpleDocTemplate("reporte.pdf", pagesize=letter)
    
    estilo_titulo = ParagraphStyle(
        name='Titulo',
        fontSize=16,
        textColor=colors.black,
        alignment=1,
        spaceAfter=20
    )
    
    estilo_producto = ParagraphStyle(
        name='producto',
        textColor=colors.black,
        spaceBefore=10,
        spaceAfter=10
    )

    title = Paragraph(datos['titulo'], estilo_titulo)
    nombre_completo = "Usuario: " + datos['datos_user'][0]['nombre'] + " " + datos['datos_user'][0]['apellidoPaterno'] + " " + datos['datos_user'][0]['apellidoMaterno']
    usuario = Paragraph(nombre_completo)
    ciNit = Paragraph("C.I./NIT: " + datos['datos_user'][0]['ciNit'])
    correo = Paragraph("Correo: " + datos['datos_user'][0]['correo'])
    telefono = Paragraph("Telefono: " + datos['datos_user'][0]['telefono'])
    direccion = Paragraph("Dirección: " + datos['datos_user'][0]['direccion'])
    ocupacion = Paragraph("Ocupación: " + datos['datos_user'][0]['ocupacion'])
    tipo = Paragraph("Productos: ", estilo_producto)
    fecha_actual = Paragraph("Fecha de reporte: " + datetime.now().strftime("%d-%m-%Y"))
    

    table_data = [
        ["Fecha", "Dirección", "Descripción", "Costo Bs.", "Unidades", "Categoria", "Estado"]
    ]

    for producto in datos['productos']:
        fila = [
            producto['fecha'][:10],
            producto['direccion'],
            producto['descripcion'],
            producto['valorMonetario'],
            producto['cantidad'],
            producto['categoria'],
            producto['estadoDonacion']
        ]
        table_data.append(fila)

    tabla = Table(table_data)
    tabla.setStyle(
        TableStyle(
            [
                ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 5),
                ('GRID', (0, 0), (-1, -1), 0.2, colors.grey),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                ('FONTSIZE', (0, 0), (-1, 0), 8.5),
                ('FONTSIZE', (0, 1), (-1, -1), 7.5),
            ]
        )
    )

    pdf.build([title, usuario, ciNit, correo, telefono, direccion, ocupacion, fecha_actual, tipo, tabla])

    return "reporte.pdf"

@app.route('/crear_pdf', methods=['POST'])
def crear_pdf():
    datos = request.json
    archivo_pdf = generar_pdf(datos)
    return send_file(archivo_pdf, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=3030)