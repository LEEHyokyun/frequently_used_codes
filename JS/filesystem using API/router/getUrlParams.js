function getUrlParams(req, res) {
    let apiAction = req.params.action;
    //console.log(apiAction);
    return apiAction;
};

module.exports = getUrlParams;