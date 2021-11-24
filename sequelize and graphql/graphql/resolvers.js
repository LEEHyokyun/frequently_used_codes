const {getAllUserInfor, getUserInfor, setUserData, deleteUserData} = require('./db.js'); 

const resolvers = {
    Query: {
        //named by resolvers => named by declared
        getAllUserInfor: () => getAllUserInfor(),
        getUserInfor: (_, {userID}) => getUserInfor(userID),
        setUserData: (_, {userID, userPW}) => setUserData(userID, userPW),
        deleteUserData: (_, {userID}) => deleteUserData(userID)
    }
}

module.exports = resolvers;