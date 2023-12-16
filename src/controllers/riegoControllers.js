const controller={};
const PDFDocument = require('pdfkit');
const fs = require('fs');
const PDFDocumentWithTables = require('pdfkit-table');

controller.list = (req,res)=>{
    req.getConnection((err,conn)=>{
     conn.query('SELECT * FROM tablariego', (err,riego)=>{
         if(err){
             res.json(err);
         }
         console.log(riego);
         res.render('riego',{
             data: riego
         });
     });
    });
 }
 
 controller.save = (req,res) =>{
     const data = req.body;
     req.getConnection((err,conn)=>{
         conn.query('INSERT INTO tablariego set ?', [data], (err,riego)=>{
             console.log(riego);
             res.redirect('/');
         })
 
     })
     
 }
 controller.edit = (req,res) =>{

    const {id} = req.params;
   
    req.getConnection((err,conn)=>{
        conn.query('SELECT *  FROM tablariego WHERE id = ?', [id], (err,riego)=>{
            res.render('riego_edit',{
                data:riego[0]
            });
        })

    })
    
}
controller.update = (req,res) =>{

    const {id} = req.params;
    const newRiego = req.body;
    req.getConnection((err,conn)=>{
        conn.query('UPDATE tablariego set ? WHERE id = ?', [newRiego,id], (err,riego)=>{
            res.redirect('/');
        })

    })
    
}

controller.delete = (req,res) =>{

    const {id} = req.params;
   
    req.getConnection((err,conn)=>{
        conn.query('DELETE FROM tablariego WHERE id = ?', [id], (err,riego)=>{
            console.log(riego);
            res.redirect('/');
        })

    })
    
}

controller.exportarPDF = (req, res) => {
   
    req.getConnection((err, conn) => {
        if (err) {
            return res.json(err);
        }

        conn.query('SELECT * FROM tablariego', (err, data) => {
            if (err) {
                return res.json(err);
            }

            // Crear un nuevo documento PDF
            const doc = new PDFDocument({ layout: 'portrait' });

            // Crear una instancia de PDFDocumentWithTables y pasarle el documento PDF
            const pdfWithTables = new PDFDocumentWithTables({ pdf: doc });

            const filename = 'tabla_exportada.pdf';
            const stream = fs.createWriteStream(filename);

            // Pipe PDFKit al flujo de respuesta
            pdfWithTables.pipe(stream);

            // Establecer opciones de estilo para la tabla
            const tableOptions = {
                margins: { top: 50, bottom: 50, left: 50, right: 50 },
                headerBackgroundColor: '#2c3e50',
                headerColor: '#ecf0f1',
                colors: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'],
                fontSize: 10,
                fontColor: '#34495e',
            };

            // Agregar contenido a partir de los datos utilizando pdfkit-table
            const dataTable = {
                headers: ['Propietario', 'Arrendatario', 'Iban', 'Teléfono', 'Email', 'Euros', 'Uso'],
                // rows: data.map(item => [item.propietario, item.arrendatario, item.iban, item.phone, item.address, item.euros, item.uso]),
                rows: data.map(item => [item.propietario, item.arrendatario, item.iban, item.phone, item.address, item.euros, item.uso]),
            };

            // Crear la tabla y agregarla al documento con opciones de estilo
            pdfWithTables.table(dataTable, tableOptions);

            // Finalizar el documento y cerrar el flujo
            pdfWithTables.end();
            
            stream.on('finish', () => {
                res.status(200).json({ filename });
            });
        });
    });
};



 module.exports = controller