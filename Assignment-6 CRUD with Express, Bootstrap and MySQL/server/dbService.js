const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
//dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'Purposedatabase',
    database:'university'
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM studentinfo;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewRecord(data) {
        try {
            // const dateAdded = new Date();
            const {courseid, coursename, deptname, institutename, Universityname}=data;
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO studentinfo (courseid, coursename, deptname, institutename, Universityname) VALUES (?,?,?,?,?);";

                connection.query(query, [courseid, coursename, deptname, institutename, Universityname] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id:insertId,
                courseid : courseid,
                coursename : coursename,
                deptname:deptname,
                institutename:institutename,
                Universityname:Universityname
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); //base decimal 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";
    
                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name like ? ;"; // Like opr [%]

                connection.query(query, ['%'+name+'%'], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;