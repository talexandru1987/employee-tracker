//select all from a table
const selectAll = (aTable) => `SELECT * FROM ${aTable}`;
//select using where
const selectAllWhere = (aTable, aName) => `SELECT * FROM ${aTable} WHERE name = ${aName}`;

module.exports = { selectAll, selectAllWhere };
