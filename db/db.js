import postgres from 'postgres';

// Using PG env variables
const sql = postgres();

export default sql;
