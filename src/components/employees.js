const db =require ('../connector/db');

module.exports={
    getEmployees : async (request,response)=>{
        try{
        const data = await getEmployeesModel();
         return response.status(200).json(data)
        } catch(error){
           return  response.status(500).json({error: 'unable to get data'})
        }
    },
    getEmployeesById: async (request,response)=>{
        try{
        const id =request.params.id;    
        const data = await getEmployeesByIdModel(id);
        if(!data){
            return response.status(400).json({message:'no data found'})
        }
        return response.status(200).json(data)
        } catch(error){
            return response.status(500).json({error: 'unable to get data'})
        }
    },
    insertEmployees:async (request,response)=>{
        try{
        const data =request.body; 
        if (!data.NAME || !data.DESIGNATION || !data.EXPERIENCE || !data.EMAIL) {
            return response.status(400).json({ message: "please pass all the required fields" });
        }   
        await insertEmployeesModel(data);
        return response.status(201).json({message:'data posted successfully'})
        } catch(error){
            return response.status(500).json({error: 'unable to insert data'})
        }
    },
    updateEmployeesById:async (request,response)=>{
        try{
        const id =request.params.id;
        const data =request.body;  
        if (!data.NAME || !data.DESIGNATION || !data.EXPERIENCE || !data.EMAIL) {
            return response.status(400).json({ message: "please pass all the required fields" });
        }   
        const employeesExists=await getEmployeesByIdModel(id)
        if(!employeesExists){
            return response.status(400).json({message:'employee does not exists'})
        }
        await updateEmployeesByIdModel(data,id);
        return response.status(200).json({message:'data updated(put) successfully'})
        } catch(error){
            return response.status(500).json({error: 'unable to update data'})
        }
    },
    deleteEmployeesById:async (request,response)=>{
        try{
        const id =request.params.id; 
        const employeesExists=await getEmployeesByIdModel(id)
        if(!employeesExists){
            return response.status(400).json({message:'employee does not exists'})
        }
        await deleteEmployeesByIdModel(id);
        return response.status(200).json({message:'data delete successfully'})
        } catch(error){
            return response.status(500).json({error: 'unable to delete data'})
        }
    }
}
    

/**
 * Models 
 */ 

const getEmployeesModel =()=>{
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT*FROM EMPLOYEES'
        db.appDatabase.all(
            sql,
            [],
            (err,rows)=>{
                if(err){
                return reject('[getEmployeesModel]: something went wrong')
                }
                resolve(rows)
            }
        )

    })
}
// camelcase
const getEmployeesByIdModel =(id)=>{
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT*FROM EMPLOYEES WHERE ID =?'
        db.appDatabase.get(
            sql,
            [id],
            (err,row)=>{
                if(err){
                return reject('[getEmployeesByIdModel]: something went wrong')
                }
                resolve(row)
            }
        )

    })
}



const insertEmployeesModel=(data)=>{
    return new Promise((resolve,reject)=>{
    const sql ='INSERT INTO EMPLOYEES(NAME,DESIGNATION,EXPERIENCE,EMAIL) VALUES (?,?,?,?)';
    db.appDatabase.run(
        sql,
        [data.NAME,data.DESIGNATION,data.EXPERIENCE,data.EMAIL],
        (err,result)=>{
            if(err){
                console.log(err);
                return reject('[insertEmployeesModel]:unable to insert data')
            }
            resolve('success')
        }
    )
})
}
const updateEmployeesByIdModel=(data,id)=>{
    return new Promise((resolve,reject)=>{
        const sql= 'UPDATE EMPLOYEES SET NAME=?,DESIGNATION=?,EXPERIENCE=?,EMAIL=? WHERE ID=?';
        db.appDatabase.run(
            sql,
            [data.NAME,data.DESIGNATION,data.EXPERIENCE,data.EMAIL,id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    return reject('[updateEmployeesByIdModel]:unable to update data')
                }
                resolve('success')
            }
        )
    })
}
const deleteEmployeesByIdModel=(id)=>{
    return new Promise((resolve,reject)=>{
        const sql= 'DELETE FROM EMPLOYEES WHERE ID=?';
        db.appDatabase.run(
            sql,
            [id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    return reject('[deleteEmployeesByIdModel]:unable to delete data')
                }
                resolve('success')
            }
        )
    })
}