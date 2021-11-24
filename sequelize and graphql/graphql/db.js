const { Model } = require('sequelize/dist');
let userDB = require('../models/model.js');

module.exports = {
    userDB,
    
    getAllUserInfor: () => {
        
        let findedDB = userDB.findAll()
        
        console.log(findedDB);
        
        return findedDB;

        //return userDB;
    },

    //외부DB를 가져오는 것은 적절한 method와 비구조화를 통해 진행
    getUserInfor: async (userID) => {
        let selectedDB =[];
        selectedDB = await userDB.findOne({
            where: {
                userID: userID
            }
        })

        console.log(selectedDB);

        return selectedDB;
    },

    //data update
    setUserData: async (userID, userPW) => {
        
        await userDB.create({
            userID: userID,
            userPW: userPW
        });

        let newDB = userDB.findAll();

        if(newDB) return newDB;
    },

    deleteUserData: async (userID) => {
        
        await userDB.destroy({
            where: {
                userID: userID
            }
        })

        let newDB = userDB.findAll();

        if(newDB) return newDB;
    }
    
    
}