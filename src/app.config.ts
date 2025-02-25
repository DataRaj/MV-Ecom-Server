export default () =>({
    env: process.env.NODE_ENV || 'development',
    database : {
        neondb: process.env.POSTGRESQL_NEON_DB_URL!,
        
    },
})