function getFileName(req, res) {
    let apiAction = req.params.filename;
    //console.log(apiAction);
    return apiAction;
};

module.exports = getFileName;