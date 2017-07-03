module.exports = function ( app ) {

    require('./page')(app);
    require('./home')(app);
    require('./administration')(app);
    require('./user')(app);
    require('./userInfo')(app);
    require('./room')(app);
};