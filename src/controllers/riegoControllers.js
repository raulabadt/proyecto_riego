const controller={};

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

 module.exports = controller