exports.queryList = {
    GET_STORE_LIST_QUERY: "SELECT STORE_ID, STORE_NAME, STORE_CODE FROM BMS.STORE;",

    SAVE_STORE_LIST_QUERY: 'INSERT INTO BMS.STORE (STORE_NAME, STORE_CODE, ADDRESS , CREATED_BY , CREATED_ON) VALUES($1, $2, $3, $4, $5)',


}