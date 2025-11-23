package dialect;



import org.hibernate.MappingException;
import org.hibernate.dialect.PostgreSQLDialect;
import org.hibernate.dialect.identity.IdentityColumnSupport;
import org.hibernate.dialect.sequence.SequenceSupport;
import org.hibernate.engine.jdbc.dialect.spi.DialectResolutionInfo;
import org.hibernate.id.insert.GetGeneratedKeysDelegate;
import org.hibernate.persister.entity.EntityPersister;


/**
 * Custom Hibernate Dialect for DuckDB. this dialect extends PostgreSQLDialect
 * but overrides key methods related to table creation, sequences, and identity columns
 * to match DuckDB's specific behavior.
 */
public class DuckDBDialect extends PostgreSQLDialect {



    public DuckDBDialect(DialectResolutionInfo info) {
        super(info);
    }

    /**
     * DuckDB does not support some PostgreSQL-specific drop statements, returning null
     * avoids issues during schema export/update operations.
     */
    @Override
    public String getBeforeDropStatement(){
        return null;
    }

    /**
     * Overrides the default PostgreSQL query to correctly retrieve sequence information
     * specifically from DuckDB's catalog function (duckdb_sequences()).
     */
    @Override
    public String getQuerySequencesString() {
        return "SELECT "
                + "database_name AS sequence_catalog, "
                + "schema_name AS sequence_schema, "
                + "sequence_name, "
                + "start_value, "
                + "min_value AS minimum_value, "
                + "max_value AS maximum_value, "
                + "increment_by AS increment, "
                + "cycle "
                + "FROM duckdb_sequences()";
    }

    /**
     * Forces Hibernate to use "CREATE TABLE IF NOT EXISTS" for table creation.
     */
    @Override
    public String getCreateTableString() {
        return "CREATE TABLE IF NOT EXISTS ";
    }

    /**
     * DuckDB has limited support for complex schema modification operations.
     * Returning false prevents Hibernate from attempting to use `ALTER TABLE`.
     */
    @Override
    public boolean hasAlterTable() {
        return false;
    }

    /**
     * Provides the custom support implementation for IDENTITY columns (auto-incrementing IDs).
     */
    @Override
    public IdentityColumnSupport getIdentityColumnSupport() {
        return new DuckDBIdentityColumnSupport();
    }

    /**
     * Provides the custom support implementation for SEQUENCE generation.
     */
    @Override
    public SequenceSupport getSequenceSupport() {
       return new DuckDBSequenceSupport();
   }

    /**
     * Inner class implementing specific support for DuckDB IDENTITY columns.
     */
    private static class DuckDBIdentityColumnSupport implements IdentityColumnSupport {

        @Override
        public boolean supportsIdentityColumns() {
            return true;
        }

        @Override
        public boolean supportsInsertSelectIdentity() {
            return false;
        }

        @Override
        public boolean hasDataTypeInIdentityColumn() {
            return false;
        }


        @Override
        @SuppressWarnings("all")
        public String appendIdentitySelectToInsert(String s) {
            return "";
        }

        @Override
        public String getIdentitySelectString(String s, String s1, int i) throws MappingException {
            return "";
        }

        @Override
        public String getIdentityColumnString(int type) throws MappingException {
            return "BIGINT";
        }

        @Override
        public String getIdentityInsertString() {
            return "";
        }

        @Override
        public GetGeneratedKeysDelegate buildGetGeneratedKeysDelegate(EntityPersister entityPersister) {
            return null;
        }
    }

    /**
     * Inner class implementing specific support for DuckDB SEQUENCE generation syntax.
     */
    private static class DuckDBSequenceSupport implements SequenceSupport {

        @Override
        public String getSelectSequenceNextValString(String s) throws MappingException {
            return "nextval('" + s + "')";
        }

        @Override
        public String getDropSequenceString(String sequenceName) throws MappingException {
            return "DROP SEQUENCE IF EXISTS " + sequenceName;
        }

        @Override
        public String getCreateSequenceString(String sequenceName) throws MappingException {
            return "CREATE SEQUENCE " + sequenceName;
        }

        @Override
        public String getCreateSequenceString(String sequenceName, int initialValue, int incrementSize){
            return "CREATE SEQUENCE " + sequenceName + " START WITH " + initialValue + " INCREMENT BY " + incrementSize ;
        }

    }
}