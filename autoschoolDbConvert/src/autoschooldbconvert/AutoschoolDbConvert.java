
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package autoschooldbconvert;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.apache.log4j.Logger;

/**
 *
 * @author vin
 */
public class AutoschoolDbConvert {

    private static final Logger log = Logger.getLogger(AutoschoolDbConvert.class);

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        try {

            log.info("start");
            MysqlDataSource dsMysql = new MysqlDataSource();
            dsMysql.setUser("root");
            dsMysql.setPassword("1q2w3e4r");
            dsMysql.setServerName("127.0.0.1");

            try (Connection connMysql = dsMysql.getConnection(); Statement stmtMysql = connMysql.createStatement()) {

                Connection connAccess = DriverManager.getConnection("jdbc:ucanaccess://D:/work/AvtoSchool.mdb");
                Statement stmtAccess = connAccess.createStatement();
                ResultSet rsAccess;
                log.info("delete");
                log.info("delete from autoschool.exam");
                stmtMysql.execute("delete from autoschool.exam");
                log.info("delete from autoschool.exam_group_student_operations");
                stmtMysql.execute("delete from autoschool.exam_group_student_operations");
                log.info("delete from autoschool.exam_groups");
                stmtMysql.execute("delete from autoschool.exam_groups");
                log.info("delete from autoschool.exam_motives");
                stmtMysql.execute("delete from autoschool.exam_motives");
                log.info("delete from autoschool.expulsion_reasons");
                stmtMysql.execute("delete from autoschool.expulsion_reasons");
                log.info("delete from autoschool.exam_results");
                stmtMysql.execute("delete from autoschool.exam_results");
                log.info("delete from autoschool.exam_types where parent_id is not null");
                stmtMysql.execute("delete from autoschool.exam_types where parent_id is not null");
                log.info("delete from autoschool.exam_types");
                stmtMysql.execute("delete from autoschool.exam_types");

                log.info("delete from autoschool.learning_group_staff");
                stmtMysql.execute("delete from autoschool.learning_group_staff");
                log.info("delete from autoschool.learning_group_vehicles");
                stmtMysql.execute("delete from autoschool.learning_group_vehicles");
                log.info("delete from autoschool.staff_salary");
                stmtMysql.execute("delete from autoschool.staff_salary");
                log.info("delete from autoschool.staff_operations");
                stmtMysql.execute("delete from autoschool.staff_operations");
                log.info("delete from autoschool.staff_salary_articles");
                stmtMysql.execute("delete from autoschool.staff_salary_articles");
                log.info("delete from autoschool.staff_disciplines");
                stmtMysql.execute("delete from autoschool.staff_disciplines");
                log.info("delete from autoschool.students_accruals");
                stmtMysql.execute("delete from autoschool.students_accruals");
                log.info("delete from autoschool.waybills_students");
                stmtMysql.execute("delete from autoschool.waybills_students");
                log.info("delete from autoschool.waybills");
                stmtMysql.execute("delete from autoschool.waybills");
                log.info("delete from autoschool.payments");
                stmtMysql.execute("delete from autoschool.payments");
                log.info("delete from autoschool.documents");
                stmtMysql.execute("delete from autoschool.documents");
                log.info("delete from autoschool.vehicles");
                stmtMysql.execute("delete from autoschool.vehicles");
                log.info("delete from autoschool.students_operations");
                stmtMysql.execute("delete from autoschool.students_operations");
                log.info("delete from autoschool.student_statuses");
                stmtMysql.execute("delete from autoschool.student_statuses");
                log.info("delete from autoschool.students");
                stmtMysql.execute("delete from autoschool.students");
                log.info("delete from autoschool.learning_groups");
                stmtMysql.execute("delete from autoschool.learning_groups");
                log.info("delete from autoschool.staff");
                stmtMysql.execute("delete from autoschool.staff");
                log.info("delete from autoschool.region where parent_id is not null");
                stmtMysql.execute("delete from autoschool.region where parent_id is not null");
                log.info("delete from autoschool.region");
                stmtMysql.execute("delete from autoschool.region");
                log.info("delete from autoschool.document_types where parent_id is not null");
                stmtMysql.execute("delete from autoschool.document_types where parent_id is not null");
                log.info("delete from autoschool.document_types");
                stmtMysql.execute("delete from autoschool.document_types");
                log.info("delete from autoschool.articles");
                stmtMysql.execute("delete from autoschool.articles");
                log.info("delete from autoschool.learning_program_price_history_payments");
                stmtMysql.execute("delete from autoschool.learning_program_price_history_payments");
                log.info("delete from autoschool.learning_program_price_history");
                stmtMysql.execute("delete from autoschool.learning_program_price_history");
                log.info("delete from autoschool.payment_types where parent_id is not null");
                stmtMysql.execute("delete from autoschool.payment_types where parent_id is not null");
                log.info("delete from autoschool.payment_types");
                stmtMysql.execute("delete from autoschool.payment_types");
                log.info("delete from autoschool.learning_programs_disciplines");
                stmtMysql.execute("delete from autoschool.learning_programs_disciplines");
                log.info("delete from autoschool.learning_programs");
                stmtMysql.execute("delete from autoschool.learning_programs");
                log.info("delete from autoschool.document_notes");
                stmtMysql.execute("delete from autoschool.document_notes");
                log.info("delete from autoschool.education");
                stmtMysql.execute("delete from autoschool.education");
                log.info("delete from autoschool.learning_disciplines where parent_id is not null");
                stmtMysql.execute("delete from autoschool.learning_disciplines where parent_id is not null");
                log.info("delete from autoschool.learning_disciplines");
                stmtMysql.execute("delete from autoschool.learning_disciplines");
                log.info("update autoschool.users set school_unit_id = null");
                stmtMysql.execute("update autoschool.users set school_unit_id = null");
                log.info("delete from autoschool.school_units");
                stmtMysql.execute("delete from autoschool.school_units");
                log.info("delete from autoschool.users_privileges");
                stmtMysql.execute("delete from autoschool.users_privileges");
                log.info("update autoschool.users set updated_by = null");
                stmtMysql.execute("update autoschool.users set updated_by = null");
                log.info("delete from autoschool.users");
                stmtMysql.execute("delete from autoschool.users");
                log.info("delete from autoschool.variables");
                stmtMysql.execute("delete from autoschool.variables");
                log.info("users");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_Users");
                StringBuilder sbQuery;
                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.users(id,firstname,middlename,lastname,login,pwd,school_unit_id,active)VALUES");

                while (rsAccess.next()) {
                    sbQuery.append("(").append(rsAccess.getString(1)).append(",")
                            .append("'").append(rsAccess.getString(4)).append("'").append(",")
                            .append("'").append(rsAccess.getString(5)).append("'").append(",")
                            .append("'").append(rsAccess.getString(3)).append("'").append(",")
                            .append("'").append(rsAccess.getString(2)).append("'").append(",md5('").append(rsAccess.getString(8)).append("'),null");
                    if (rsAccess.getString(10).equalsIgnoreCase("1")) {
                        sbQuery.append(",0),");
                    } else {
                        sbQuery.append(",1),");
                    }

                }
                try {
                    log.info(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("school_units");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_SubDivision");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.school_units(id,name_short,name_full,license_serial,"
                        + "license_number,license_giver,license_date_start,reg_number,active,updated,updated_by)VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",")
                            .append("'").append(rsAccess.getString(3)).append("'").append(",")
                            .append("'").append(rsAccess.getString(2)).append("'").append(",")
                            .append("'").append(rsAccess.getString(5)).append("'").append(",")
                            .append("'").append(rsAccess.getString(6)).append("'").append(",")
                            .append("'").append(rsAccess.getString(7)).append("'").append(",")
                            .append("'").append(rsAccess.getString(8)).append("'").append(",")
                            .append("'").append(rsAccess.getString(9)).append("'").append(",");
                    if (rsAccess.getString(12).equalsIgnoreCase("1")) {
                        sbQuery.append("0,");
                    } else {
                        sbQuery.append("1,");
                    }
                    sbQuery
                            .append("'").append(rsAccess.getString(13)).append("'").append(",")
                            .append(rsAccess.getString(14)).append("),");

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }

                log.info("users_schools");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_Users");

                while (rsAccess.next()) {
                    try {
                        stmtMysql.execute("UPDATE autoschool.users set school_unit_id = " + rsAccess.getString(9) + " where id = " + rsAccess.getString(1));
                    } catch (Exception e) {
                        log.error("UPDATE autoschool.users set school_unit_id = " + rsAccess.getString(9) + " where id = " + rsAccess.getString(1));
                        log.error(e.getMessage());
                    }
                }

//                0 теория 1 практика 2 другое
                log.info("learning_disciplines");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_Discipline order by kodparent");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.learning_disciplines (id,name,parent_id,updated,updated_by)VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",")
                            .append("'").append(rsAccess.getString(2)).append("'").append(",");
                    if (rsAccess.getString(3).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(3)).append(",");
                    }
                    sbQuery
                            .append("'").append(rsAccess.getString(6)).append("'").append(",");
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("education");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_Education");
                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.education (id,name,updated,updated_by)VALUES");

                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",")
                            .append("'").append(rsAccess.getString(2)).append("'").append(",")
                            .append("'").append(rsAccess.getString(6)).append("'").append(",");
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                
                log.info("document_notes");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_NoteDocum");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.document_notes (id,name,updated,updated_by)VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",")
                            .append("'").append(rsAccess.getString(2)).append("'").append(",")
                            .append("'").append(rsAccess.getString(6)).append("'").append(",");
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
//                0 начальная 1 индивидуальная

                log.info("learning_programs");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_ProgramSch");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.learning_programs"
                        + "(id,name_short,name_full,learning_program_type,category,days,"
                        + "drive_lessons,drive_lessons_length,drive_lessons_price,active,updated,updated_by)"
                        + "VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",")
                            .append("'").append(rsAccess.getString(3)).append("'").append(",")
                            .append("'").append(rsAccess.getString(2)).append("'").append(",");
                    if (rsAccess.getString(4).equalsIgnoreCase("1") || rsAccess.getString(4).equalsIgnoreCase("4")) {
                        sbQuery.append("'0',");
                    } else {
                        sbQuery.append("'1',");
                    }
                    sbQuery
                            .append("'").append(rsAccess.getString(5)).append("'").append(",")
                            .append(rsAccess.getString(6)).append(",")
                            .append(rsAccess.getString(10)).append(",");
                    if (rsAccess.getString(11).equalsIgnoreCase("0.0")) {
                        sbQuery.append("'00:00',");
                    } else {
                        if (rsAccess.getString(11).equalsIgnoreCase("0.8")) {
                            sbQuery.append("'00:50',");
                        } else {
                            if (rsAccess.getString(11).equalsIgnoreCase("1.25")) {
                                sbQuery.append("'01:15',");
                            } else {
                                if (rsAccess.getString(11).equalsIgnoreCase("60.0")) {
                                    sbQuery.append("'01:00',");
                                } else {
                                    sbQuery.append("'").append(rsAccess.getString(11)).append("'").append(",");
                                }
                            }
                        }
                    }
                    sbQuery.append(rsAccess.getString(15)).append(",");
                    if (rsAccess.getString(4).equalsIgnoreCase("4") || rsAccess.getString(17).equalsIgnoreCase("1")) {
                        sbQuery.append("0,");
                    } else {
                        sbQuery.append("1,");
                    }
                    sbQuery.append("'").append(rsAccess.getString(18)).append("'").append(",");
                    if (rsAccess.getString(19).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(19)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("payment_types");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_TypePayment order by 4,1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.payment_types(id,parent_id,name,"
                        + "bank_percent,updated,updated_by)"
                        + "VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",");
                    if (rsAccess.getString(4).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(4).equalsIgnoreCase("35")) {
                            sbQuery.append("39,");
                        } else {
                            sbQuery.append(rsAccess.getString(4)).append(",");
                        }
                    }

                    sbQuery.append("'").append(rsAccess.getString(2)).append("'").append(",");
                    if (rsAccess.getString(3).equalsIgnoreCase("1")) {
                        sbQuery.append("'1',");
                    } else {
                        sbQuery.append("'0',");
                    }
                    sbQuery.append("'").append(rsAccess.getString(7)).append("'").append(",");
                    if (rsAccess.getString(8).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(8)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }

                log.info("learning_program_price_history");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_ProgramContractCost");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.learning_program_price_history"
                        + "(id,learning_program_id,date_begin,price,updated,updated_by)"
                        + "VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",")
                            .append(rsAccess.getString(2)).append(",")
                            .append("'").append(rsAccess.getString(3)).append("'").append(",")
                            .append(rsAccess.getString(4)).append(",");

                    sbQuery.append("'").append(rsAccess.getString(6)).append("'").append(",");
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }

                log.info("learning_program_price_history_payments");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_ProgramSchCost");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.learning_program_price_history_payments"
                        + "(id,required,history_id,price_part_id,value,updated,updated_by)"
                        + "VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",0,")
                            .append(rsAccess.getString(3)).append(",");
                    if (rsAccess.getString(5).equalsIgnoreCase("43")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(5)).append(",");
                    }
                    sbQuery.append(rsAccess.getString(6)).append(",");

                    sbQuery.append("'").append(rsAccess.getString(8)).append("'").append(",");
                    if (rsAccess.getString(9).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(9)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }

                log.info("articles");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_Article where kodparent in (1,2)");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.articles"
                        + "(id,name,mode,article_type,staff_name_as_comment,updated,updated_by)"
                        + "VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",")
                            .append("'").append(rsAccess.getString(2)).append("',")
                            .append(rsAccess.getString(3)).append(",");
                    if (rsAccess.getString(4).equalsIgnoreCase("1")) {
                        sbQuery.append("'1',");
                    } else {
                        sbQuery.append("'0',");
                    }
                    sbQuery.append("'0',");

                    sbQuery.append("'").append(rsAccess.getString(7)).append("'").append(",");
                    if (rsAccess.getString(8).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(8)).append("),");
                    }
                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("document_types");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_TypeDocum order by 3,1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.document_types(id,parent_id,name,"
                        + "updated,updated_by)"
                        + "VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",");
                    if (rsAccess.getString(3).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(3)).append(",");
                    }

                    sbQuery.append("'").append(rsAccess.getString(2)).append("'").append(",");
                    sbQuery.append("'").append(rsAccess.getString(6)).append("'").append(",");
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
               
                log.info("region");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_Region order by 4,1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.region(id,parent_id,name,code,updated,updated_by)"
                        + "VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",");
                    if (rsAccess.getString(4).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(4)).append(",");
                    }
                    sbQuery
                            .append("'").append(rsAccess.getString(2)).append("'").append(",")
                            .append("'").append(rsAccess.getString(3)).append("'").append(",")
                            .append("'").append(rsAccess.getString(7)).append("'").append(",");
                    if (rsAccess.getString(6).equalsIgnoreCase("0") || rsAccess.getString(6).equalsIgnoreCase("13")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(6)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("staff");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_Staff");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.staff (id,firstname,middlename,"
                        + "lastname,post,birthdate,birthplace,gender,addr_index,addr_region,"
                        + "addr_district,addr_city,addr_street,addr_house,addr_build,addr_flat,"
                        + "education_id,comment,phone_work,phone_home,inn,snils,active,"
                        + "updated,updated_by) VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",")
                            .append("'").append(rsAccess.getString(5)).append("'").append(",")
                            .append("'").append(rsAccess.getString(6)).append("'").append(",")
                            .append("'").append(rsAccess.getString(4)).append("'").append(",")
                            .append("'").append(rsAccess.getString(22)).append("'").append(",")
                            .append("'").append(rsAccess.getString(8)).append("'").append(",")
                            .append("'").append(rsAccess.getString(9)).append("'").append(",");
                    if (rsAccess.getString(10).equalsIgnoreCase("М")) {
                        sbQuery.append("'1',");
                    } else {
                        sbQuery.append("'0',");
                    }
                    sbQuery.append("'").append(rsAccess.getString(11)).append("'").append(",");
                    if (rsAccess.getString(12).equals("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(12)).append(",");
                    }
                    if (rsAccess.getString(13).equals("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(13)).append(",");
                    }
                    sbQuery.append("'").append(rsAccess.getString(14)).append("'").append(",")
                            .append("'").append(rsAccess.getString(15)).append("'").append(",")
                            .append("'").append(rsAccess.getString(16)).append("'").append(",")
                            .append("'").append(rsAccess.getString(17)).append("'").append(",")
                            .append("'").append(rsAccess.getString(18)).append("'").append(",");
                    if (rsAccess.getString(21).equals("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(21)).append(",");
                    }
                    sbQuery.append("'").append(rsAccess.getString(23)).append("'").append(",")
                            .append("'").append(rsAccess.getString(19)).append("'").append(",")
                            .append("'").append(rsAccess.getString(20)).append("'").append(",")
                            .append("'").append(rsAccess.getString(2)).append("'").append(",")
                            .append("'").append(rsAccess.getString(3)).append("'").append(",");
                    if (rsAccess.getString(24).equalsIgnoreCase("1")) {
                        sbQuery.append("0,");
                    } else {
                        sbQuery.append("1,");
                    }
                    sbQuery.append("'").append(rsAccess.getString(25)).append("'").append(",");
                    if (rsAccess.getString(26).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(26)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("learning_groups");
                //confirmed = наличие исх номера регистрации в гибдд
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_GroupSch order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.learning_groups(id, number, learning_program_id, school_unit_id, "
                        + "date_start, date_end, theory_exam_date, practice_exam_date, gibdd_exam_date, reg_order_number, "
                        + "reg_order_date, gibdd_reg_staff, gibdd_reg_number, gibdd_reg_date, price, active, "
                        + "confirmed, updated, updated_by) VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",")
                            .append("'").append(rsAccess.getString(3)).append("'").append(",")
                            .append(rsAccess.getString(4)).append(",")
                            .append(rsAccess.getString(8)).append(",");
                    if (rsAccess.getString(6) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(6).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(6)).append("'").append(",");
                        }
                    }

                    if (rsAccess.getString(7) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(7).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(7)).append("'").append(",");
                        }
                    }
                    if (rsAccess.getString(14) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(14).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(14)).append("'").append(",");
                        }
                    }
                    if (rsAccess.getString(15) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(15).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(15)).append("'").append(",");
                        }
                    }

                    if (rsAccess.getString(16) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(16).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(16)).append("'").append(",");
                        }
                    }

                    if (rsAccess.getString(9) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(9).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(9)).append("'").append(",");
                        }
                    }
                    if (rsAccess.getString(10) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(10).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(10)).append("'").append(",");
                        }
                    }
                    if (rsAccess.getString(11).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(11)).append(",");
                    }
                    if (rsAccess.getString(12) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(12).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(12)).append("'").append(",");
                        }
                    }
                    if (rsAccess.getString(13) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(13).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(13)).append("'").append(",");
                        }
                    }
                    sbQuery.append(rsAccess.getString(5)).append(",1,");
                    if (rsAccess.getString(12) == null) {
                        sbQuery.append("0,");
                    } else {
                        if (rsAccess.getString(12).equalsIgnoreCase("")) {
                            sbQuery.append("0,");
                        } else {
                            sbQuery.append("1,");
                        }
                    }
                    sbQuery.append("'").append(rsAccess.getString(17)).append("'").append(",");
                    if (rsAccess.getString(18).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(18)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("students");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_BFL order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.students(id,firstname,middlename,lastname,birthdate,"
                        + "birthplace,gender,addr_index,addr_region,addr_district,"
                        + "addr_city,addr_street,addr_house,addr_build,addr_flat,"
                        + "education_id,phone_home,phone_cell,phone_work,work_place,"
                        + "post,active,INN,updated,updated_by) VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",")
                            .append("'").append(rsAccess.getString(4)).append("'").append(",")
                            .append("'").append(rsAccess.getString(5)).append("'").append(",")
                            .append("'").append(rsAccess.getString(3)).append("'").append(",")
                            .append("'").append(rsAccess.getString(6)).append("'").append(",")
                            .append("'").append(rsAccess.getString(7)).append("'").append(",");
                    if (rsAccess.getString(8).equalsIgnoreCase("М")) {
                        sbQuery.append("'1',");
                    } else {
                        sbQuery.append("'0',");
                    }
                    sbQuery
                            .append("'").append(rsAccess.getString(9)).append("'").append(",");
                    if (rsAccess.getString(10).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(10)).append(",");
                    }

                    if (rsAccess.getString(11).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(11)).append(",");
                    }
                    sbQuery.append("'").append(rsAccess.getString(12)).append("'").append(",")
                            .append("'").append(rsAccess.getString(13)).append("'").append(",")
                            .append("'").append(rsAccess.getString(14)).append("'").append(",")
                            .append("'").append(rsAccess.getString(15)).append("'").append(",")
                            .append("'").append(rsAccess.getString(16)).append("'").append(",");
                    if (rsAccess.getString(21).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(21)).append(",");
                    }
                    sbQuery
                            .append("'").append(rsAccess.getString(18)).append("'").append(",'',")
                            .append("'").append(rsAccess.getString(17)).append("'").append(",")
                            .append("'").append(rsAccess.getString(19)).append("'").append(",")
                            .append("'").append(rsAccess.getString(20)).append("'").append(",1,")
                            .append("'").append(rsAccess.getString(2)).append("'").append(",")
                            .append("'").append(rsAccess.getString(22)).append("'").append(",");

                    if (rsAccess.getString(23).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(23)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }

                log.info("student_statuses");
                try {
                    stmtMysql.execute("INSERT INTO autoschool.student_statuses(id,name) values (1,'под контролем АШ')");
                    stmtMysql.execute("INSERT INTO autoschool.student_statuses(id,name) values (2,'АШ окончена')");
                    stmtMysql.execute("INSERT INTO autoschool.student_statuses(id,name) values (3,'отчислен из АШ')");
                    stmtMysql.execute("INSERT INTO autoschool.student_statuses(id,name) values (4,'обучение приостановлено')");
                    stmtMysql.execute("INSERT INTO autoschool.student_statuses(id,name) values (5,'забрал документы')");
                } catch (Exception e) {
                    log.error(e.getMessage());
                }
                log.info("students_operations");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_Operation order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.students_operations("
                        + "id,student_id,staff_id,learning_program_id,learning_group_id,"
                        + "price,school_unit_id,number_in_group,card_number,category,"
                        + "date_start,date_end,group_reg,status_id,expulsion_order_number,"
                        + "expulsion_date,expulsion_reason,gearbox,comment,active,"
                        + "updated,updated_by) VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");

                    sbQuery.append(rsAccess.getString(3)).append(",");
                    if (rsAccess.getString(4).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(4)).append(",");
                    }

                    if (rsAccess.getString(5).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(5)).append(",");
                    }

                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append(",");
                    }
                    if (rsAccess.getString(6).equalsIgnoreCase("0")
                            || rsAccess.getString(6).equalsIgnoreCase("5")
                            || rsAccess.getString(6).equalsIgnoreCase("13")
                            || rsAccess.getString(6).equalsIgnoreCase("51")
                            || rsAccess.getString(6).equalsIgnoreCase("26")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(6)).append(",");
                    }
                    if (rsAccess.getString(8).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(8)).append(",");
                    }
                    if (rsAccess.getString(9).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(9)).append(",");
                    }
                    if (rsAccess.getString(10) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(10).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(10)).append("'").append(",");
                        }
                    }
                    sbQuery.append("'").append(rsAccess.getString(11)).append("'").append(",");
                    if (rsAccess.getString(13) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(13).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(13)).append("'").append(",");
                        }
                    }

                    if (rsAccess.getString(14) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(14).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(14)).append("'").append(",");
                        }
                    }

                    if (rsAccess.getString(15).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(15)).append(",");
                    }
                    sbQuery.append(rsAccess.getString(20)).append(",");
                    if (rsAccess.getString(21) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(21).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(21)).append("'").append(",");
                        }
                    }
                    if (rsAccess.getString(22) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(22).equalsIgnoreCase("")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(22)).append("'").append(",");
                        }
                    }
                    if (rsAccess.getString(23).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(23)).append(",");
                    }
                    if (rsAccess.getString(19).equalsIgnoreCase("0")) {
                        sbQuery.append("null,'',1,");
                    } else {
                        sbQuery.append(rsAccess.getString(19)).append(",'',1,");
                    }

                    sbQuery.append("'").append(rsAccess.getString(24)).append("'").append(",");

                    if (rsAccess.getString(25).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(25)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("vehicles");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_MotoCar order by 1");
                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.vehicles("
                        + "id,model,year,reg_number,VIN,engine_number,color,private,staff_id,active,"
                        + "updated,updated_by) VALUES");

                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",")
                            .append("'").append(rsAccess.getString(4)).append("'").append(",")
                            .append(rsAccess.getString(5)).append(",")
                            .append("'").append(rsAccess.getString(6)).append("'").append(",")
                            .append("'").append(rsAccess.getString(7)).append("'").append(",")
                            .append("'").append(rsAccess.getString(8)).append("'").append(",")
                            .append("'").append(rsAccess.getString(9)).append("'").append(",")
                            .append("0,");
                    if (rsAccess.getString(3).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(3)).append(",");
                    }
                    if (rsAccess.getString(10).equalsIgnoreCase("1")) {
                        sbQuery.append("0,");
                    } else {
                        sbQuery.append("1,");
                    }

                    sbQuery.append("'").append(rsAccess.getString(11)).append("'").append(",");

                    if (rsAccess.getString(12).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(12)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("documents");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_Docum order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.documents("
                        + "id,document_type_id,serial,number,date_start,"
                        + "date_end,given_by,code,category,comment,"
                        + "staff_id,student_operation_id,given_student_operation_id,vehicle_id,updated,"
                        + "updated_by"
                        + ") VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(")
                            .append(rsAccess.getString(1)).append(",");
                    if (rsAccess.getString(4).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(4)).append(",");
                    }

                    if (rsAccess.getString(6) == null) {
                        sbQuery.append("'',");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(6)).append("'").append(",");
                    }
                    if (rsAccess.getString(7) == null) {
                        sbQuery.append("'',");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(7)).append("'").append(",");
                    }

                    if (rsAccess.getString(8) == null) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(8)).append("'").append(",");
                    }

                    if (rsAccess.getString(9) == null) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(9)).append("'").append(",");
                    }
                    if (rsAccess.getString(11) == null) {
                        sbQuery.append("'',");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(11)).append("',");
                    }
                    if (rsAccess.getString(13) == null) {
                        sbQuery.append("'',");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(13)).append("',");
                    }
                    if (rsAccess.getString(10) == null) {
                        sbQuery.append("'',");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(10)).append("',");
                    }
                    if (rsAccess.getString(12) == null) {
                        sbQuery.append("'',");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(12)).append("',");
                    }

                    if (rsAccess.getString(2).equalsIgnoreCase("2")) {
                        sbQuery.append(rsAccess.getString(3)).append(",");
                    } else {
                        sbQuery.append("null,");
                    }

                    if (rsAccess.getString(2).equalsIgnoreCase("1") && rsAccess.getString(5).equalsIgnoreCase("1")) {
                        if (rsAccess.getString(3).equalsIgnoreCase("2811")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append(rsAccess.getString(3)).append(",");
                        }
                    } else {
                        sbQuery.append("null,");
                    }

                    if (rsAccess.getString(2).equalsIgnoreCase("1") && rsAccess.getString(5).equalsIgnoreCase("2")) {
                        if (rsAccess.getString(3).equalsIgnoreCase("2811")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append(rsAccess.getString(3)).append(",");
                        }
                    } else {
                        sbQuery.append("null,");
                    }

                    if (rsAccess.getString(2).equalsIgnoreCase("3")) {
                        sbQuery.append(rsAccess.getString(3)).append(",");
                    } else {
                        sbQuery.append("null,");
                    }

                    if (rsAccess.getString(14) == null) {
                        sbQuery.append("now(),");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(14)).append("'").append(",");
                    }
                    if (rsAccess.getString(15).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(15)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("payments");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_Payment order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.payments("
                        + "id,student_operation_id,staff_id,payment_date,school_unit_id,"
                        + "article_id,payment_type_id,value,comment,updated,"
                        + "updated_by) VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    if (rsAccess.getString(2) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(2).equals("0") || rsAccess.getString(2).equals("2811")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append(rsAccess.getString(2)).append(",");
                        }
                    }
                    if (rsAccess.getString(3) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(3).equalsIgnoreCase("0")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append(rsAccess.getString(3)).append(",");
                        }
                    }

                    if (rsAccess.getString(4) == null) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(4)).append("',");
                    }
                    sbQuery.append(rsAccess.getString(5)).append(",");
                    if (rsAccess.getString(7) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append(rsAccess.getString(7)).append(",");
                        }
                    }

                    if (rsAccess.getString(8) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(8).equalsIgnoreCase("0")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append(rsAccess.getString(8)).append(",");
                        }
                    }
                    sbQuery.append(rsAccess.getString(9)).append(",");
                    if (rsAccess.getString(10) == null) {
                        sbQuery.append("'',");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(10).replace("'", "\\'")).append("'").append(",");
                    }
                    if (rsAccess.getString(11) == null) {
                        sbQuery.append("now(),");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(11)).append("'").append(",");
                    }
                    if (rsAccess.getString(12).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(12)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("waybills");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_Waybill order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.waybills("
                        + "id,number,staff_id,date,odo,"
                        + "vehicle_id,active,updated,updated_by"
                        + ") VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    if (rsAccess.getString(2) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(2).equals("0")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(2)).append("',");
                        }
                    }
                    if (rsAccess.getString(5) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(5).equalsIgnoreCase("0")) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append(rsAccess.getString(5)).append(",");
                        }
                    }

                    if (rsAccess.getString(3) == null) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(3)).append("',");
                    }
                    sbQuery.append(rsAccess.getString(6)).append(",");
                    if (rsAccess.getString(4) == null) {
                        sbQuery.append("null,1,");
                    } else {
                        if (rsAccess.getString(4).equalsIgnoreCase("0")) {
                            sbQuery.append("null,1,");
                        } else {
                            sbQuery.append(rsAccess.getString(4)).append(",1,");
                        }
                    }

                    sbQuery.append("'").append(rsAccess.getString(7)).append("'").append(",");
                    if (rsAccess.getString(8).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(8)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("waybills_students");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_Practice order by 1");
                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.waybills_students("
                        + "id,waybill_id,student_operation_id,place,updated,"
                        + "updated_by"
                        + ") VALUES");
                while (rsAccess.next()) {

                    //1 город 2 полигон 3 доп
                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    sbQuery.append(rsAccess.getString(3)).append(",");
                    if (rsAccess.getString(2).equalsIgnoreCase("2811") || rsAccess.getString(2).equalsIgnoreCase("262") || rsAccess.getString(2).equalsIgnoreCase("758")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(2)).append(",");
                    }
                    sbQuery.append("'").append(rsAccess.getString(6)).append("',");

                    sbQuery.append("'").append(rsAccess.getString(7)).append("'").append(",");
                    if (rsAccess.getString(8).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(8)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(1, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("students_accruals");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_operationcost order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.students_accruals("
                        + "id,student_operation_id,payment_type,required,value,"
                        + "updated,updated_by"
                        + ") VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    if (rsAccess.getString(2).equalsIgnoreCase("2811")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(2)).append(",");
                    }
                    if (rsAccess.getString(3).equalsIgnoreCase("0")) {
                        sbQuery.append("null,'0',");
                    } else {
                        sbQuery.append(rsAccess.getString(3)).append(",'0',");
                    }
                    sbQuery.append(rsAccess.getString(4)).append(",");

                    sbQuery.append("'").append(rsAccess.getString(5)).append("'").append(",");
                    if (rsAccess.getString(6).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(6)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }

                log.info("staff_disciplines");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_staffdiscipline order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.staff_disciplines("
                        + "id,staff_id,learning_discipline_id,date_start,date_certification,"
                        + "updated,updated_by"
                        + ") VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    sbQuery.append(rsAccess.getString(2)).append(",");
                    sbQuery.append(rsAccess.getString(3)).append(",");
                    if (rsAccess.getString(5) == null) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(5)).append("',");
                    }
                    if (rsAccess.getString(4) == null) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append("'").append(rsAccess.getString(4)).append("',");
                    }

                    sbQuery.append("'").append(rsAccess.getString(10)).append("'").append(",");
                    if (rsAccess.getString(11).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(11)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("staff_salary_articles");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM S_wagesconst order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.staff_salary_articles("
                        + "id,staff_id,article_id_in,article_id_out,value,"
                        + "amount,coefficient,updated,updated_by"
                        + ")VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    sbQuery.append(rsAccess.getString(2)).append(",");
                    if (rsAccess.getString(3).equalsIgnoreCase("0") || rsAccess.getString(3).equalsIgnoreCase("43")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(3)).append(",");
                    }
                    if (rsAccess.getString(4).equalsIgnoreCase("0") || rsAccess.getString(4).equalsIgnoreCase("43")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(4)).append(",");
                    }

                    sbQuery.append(rsAccess.getString(5)).append(",");
                    sbQuery.append(rsAccess.getString(6)).append(",");
                    sbQuery.append(rsAccess.getString(7)).append(",");

                    sbQuery.append("'").append(rsAccess.getString(8)).append("'").append(",");
                    if (rsAccess.getString(9).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(9)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }

                log.info("staff_operations");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM r_wagesnote order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.staff_operations("
                        + "id,staff_id,article_id_in,article_id_out,date,"
                        + "value,comment,updated,updated_by"
                        + ")VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    sbQuery.append(rsAccess.getString(2)).append(",");
                    if (rsAccess.getString(3).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(3)).append(",");
                    }
                    if (rsAccess.getString(4).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(4)).append(",");
                    }

                    sbQuery.append("'").append(rsAccess.getString(5)).append("',");
                    sbQuery.append(rsAccess.getString(6)).append(",");
                    sbQuery.append("'").append(rsAccess.getString(7).replace("'", "\\'")).append("',");

                    sbQuery.append("'").append(rsAccess.getString(8)).append("'").append(",");
                    if (rsAccess.getString(9).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(9)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("staff_salary");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM r_wagesips order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.staff_salary("
                        + "id,staff_id,article_id_in,article_id_out,salary_month,"
                        + "salary_year,value,amount,learning_program_id,coefficient,"
                        + "updated,updated_by"
                        + ")VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    sbQuery.append(rsAccess.getString(2)).append(",");
                    if (rsAccess.getString(3).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(3)).append(",");
                    }
                    if (rsAccess.getString(4).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(4)).append(",");
                    }

                    sbQuery.append(rsAccess.getString(5)).append(",");
                    sbQuery.append(rsAccess.getString(6)).append(",");
                    sbQuery.append(rsAccess.getString(7)).append(",");
                    sbQuery.append(rsAccess.getString(8)).append(",");
                    if (rsAccess.getString(9).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(9)).append(",");
                    }
                    sbQuery.append(rsAccess.getString(10)).append(",");

                    sbQuery.append("'").append(rsAccess.getString(11)).append("'").append(",");
                    if (rsAccess.getString(12).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(12)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("variables");
                try {
                    stmtMysql.execute("INSERT INTO autoschool.variables VALUES \n"
                            + "(1,'certificate_type_id','15','тип документа \\\"сертификат автошколы\\\" ','2016-01-02 22:34:09',NULL),\n"
                            + "(2,'student_payment_article_id','3','статья \\\"поступления за учёбу\\\"','2016-01-02 22:34:09',NULL),\n"
                            + "(3,'drive_lesson_article_id','39','статья \\\"ставка за занятие по воздению\\\"','2016-01-02 22:46:41',NULL),"
                            + "(4,'drive_lesson_discipline_id','6','практика дисциплина','2016-01-02 22:46:41',NULL),"
                            + "(5, 'school_test_type_id', '8', 'зачёты АШ', '2016-01-08 12:01:06',NULL),"
                            + "(6, 'school_exam_type_id', '9', 'экзамены АШ', '2016-01-08 12:03:05',NULL),"
                            + "(7, 'gibdd_exam_type_id', '10', 'экзамены ГИБДД', '2016-01-08 12:03:05',NULL),"
                            + "(8, 'school_theory_exam', '3', 'экзамен теория АШ', '2016-01-12 15:43:15', NULL)," 
                            + "(9, 'school_city_exam', '5', 'экзамен город АШ', '2016-01-12 15:43:15', NULL)," 
                            + "(10, 'gibdd_theory_exam', '4', 'экзамен теория ГИБДД', '2016-01-12 16:09:33', NULL),"
                            + "(11, 'gibdd_polygon_exam', '6', 'экзамен площадка ГИБДД', '2016-01-12 16:09:33', NULL),"
                            + "(12, 'gibdd_city_exam', '7', 'экзамен город ГИБДД', '2016-01-12 16:09:33', NULL),"
                            + "(13, 'gibdd_exam_success', '1', 'успешная сдача экзамена', '2016-01-12 19:57:35', NULL),"
                            + "(14, 'exam_not_allowed', '5', 'не допущен к экзамену', '2016-01-14 20:36:25',  NULL),"
                            + "(15, 'gibdd_exam_default', '1', 'оценка гибдд по умолчанию', '2016-01-16 10:41:57',  NULL),"
                            + "(16, 'school_exam_default', '4', 'оценка АШ по умолчанию', '2016-01-16 10:41:57',  NULL),"
                            + "(17, 'as_control_status', '1', 'статус под контролем \\\"автошколы\\\"', '2016-01-16 11:33:38',  NULL),"
                            + "(18, 'school_theory_test', '2', '\\\"Теория - допуск к экзамену\\\" зачет', '2016-01-20 21:57:48', NULL),"
                            + "(19, 'school_polygon_test', '1', '\\\"Площадка\\\" зачет', '2016-01-20 21:57:48', NULL);");

                } catch (Exception e) {
                    log.error("INSERT INTO autoschool.variables VALUES \n"
                            + "(1,'certificate_type_id','15','тип документа \\\"сертификат автошколы\\\" ','2016-01-02 22:34:09',NULL),\n"
                            + "(2,'student_payment_article_id','3','статья \\\"поступления за учёбу\\\"','2016-01-02 22:34:09',NULL),\n"
                            + "(3,'drive_lesson_article_id','39','статья \\\"ставка за занятие по воздению\\\"','2016-01-02 22:46:41',NULL),"
                            + "(4,'drive_lesson_discipline_id','6','практика дисциплина','2016-01-02 22:46:41',NULL),"
                            + "(5, 'school_test_type_id', '8', 'зачёты АШ', '2016-01-08 12:01:06',NULL),"
                            + "(6, 'school_exam_type_id', '9', 'экзамены АШ', '2016-01-08 12:03:05',NULL),"
                            + "(7, 'gibdd_exam_type_id', '10', 'экзамены ГИБДД', '2016-01-08 12:03:05',NULL),"
                            + "(8, 'school_theory_exam', '3', 'экзамен теория АШ', '2016-01-12 15:43:15', NULL)," 
                            + "(9, 'school_city_exam', '5', 'экзамен город АШ', '2016-01-12 15:43:15', NULL)," 
                            + "(10, 'gibdd_theory_exam', '4', 'экзамен теория ГИБДД', '2016-01-12 16:09:33', NULL),"
                            + "(11, 'gibdd_polygon_exam', '6', 'экзамен площадка ГИБДД', '2016-01-12 16:09:33', NULL),"
                            + "(12, 'gibdd_city_exam', '7', 'экзамен город ГИБДД', '2016-01-12 16:09:33', NULL),"
                            + "(13, 'gibdd_exam_success', '1', 'успешная сдача экзамена', '2016-01-12 19:57:35', NULL),"
                            + "(14, 'exam_not_allowed', '5', 'не допущен к экзамену', '2016-01-14 20:36:25',  NULL),"
                            + "(15, 'gibdd_exam_default', '1', 'оценка гибдд по умолчанию', '2016-01-16 10:41:57',  NULL),"
                            + "(16, 'school_exam_default', '4', 'оценка АШ по умолчанию', '2016-01-16 10:41:57',  NULL),"
                            + "(17, 'as_control_status', '1', 'статус под контролем \\\"автошколы\\\"', '2016-01-16 11:33:38',  NULL),"
                            + "(18, 'school_theory_test', '2', '\\\"Теория - допуск к экзамену\\\" зачет', '2016-01-20 21:57:48', NULL),"
                            + "(19, 'school_polygon_test', '1', '\\\"Площадка\\\" зачет', '2016-01-20 21:57:48', NULL);");
                    log.error(e.getMessage());
                }

                log.info("learning_group_staff");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM r_staffgroupsch where id_motocar = 0 order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.learning_group_staff("
                        + "id,staff_id,learning_group_id,learning_discipline_id,updated,"
                        + "updated_by"
                        + ")VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    sbQuery.append(rsAccess.getString(2)).append(",");
                    sbQuery.append(rsAccess.getString(3)).append(",");
                    sbQuery.append(rsAccess.getString(4)).append(",");
                    sbQuery.append("'").append(rsAccess.getString(6)).append("'").append(",");
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("learning_group_vehicles");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM r_staffgroupsch where id_motocar <> 0 order by 1");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.learning_group_vehicles("
                        + "id,staff_id,learning_group_id,vehicle_id,updated,"
                        + "updated_by"
                        + ")VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    sbQuery.append(rsAccess.getString(2)).append(",");
                    sbQuery.append(rsAccess.getString(3)).append(",");
                    sbQuery.append(rsAccess.getString(5)).append(",");
                    sbQuery.append("'").append(rsAccess.getString(6)).append("'").append(",");
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append("),");
                    }

                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("exam_types");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM s_typeexamination order by kodparent");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.exam_types("
                        + "id,parent_id,name,updated,updated_by"
                        + ")VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    if (rsAccess.getString(3).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(3)).append(",");
                    }
                    sbQuery.append("'").append(rsAccess.getString(2)).append("',");
                    sbQuery.append("'").append(rsAccess.getString(6)).append("'").append(",");
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append("),");
                    }
                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("exam_results");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM s_resultexamination");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.exam_results("
                        + "id,name,updated,updated_by"
                        + ")VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    sbQuery.append("'").append(rsAccess.getString(2)).append("',");
                    sbQuery.append("'").append(rsAccess.getString(6)).append("'").append(",");
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append("),");
                    }
                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("exam_motives");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM s_motive");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.exam_motives("
                        + "id,name,updated,updated_by"
                        + ")VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    sbQuery.append("'").append(rsAccess.getString(2)).append("',");
                    sbQuery.append("'").append(rsAccess.getString(6)).append("'").append(",");
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append("),");
                    }
                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("expulsion_reasons");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM s_motive");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.expulsion_reasons("
                        + "id,name,updated,updated_by"
                        + ")VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    sbQuery.append("'").append(rsAccess.getString(2)).append("',");
                    sbQuery.append("'").append(rsAccess.getString(6)).append("'").append(",");
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append("),");
                    }
                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("exam_groups");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_GroupExam");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.exam_groups("
                        + "id,group_type,learning_group_id,number,exam_date,"
                        + "regist_date,staff_id,protocol_number,protocol_date,updated,"
                        + "updated_by"
                        + ")VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    sbQuery.append("'").append(rsAccess.getString(2)).append("',");
                    if (rsAccess.getString(3).equalsIgnoreCase("0") || rsAccess.getString(3).equalsIgnoreCase("200")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(3)).append(",");
                    }
                    sbQuery.append("'").append(rsAccess.getString(4)).append("',");
                    if (rsAccess.getString(5) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(5).isEmpty()) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(5)).append("',");
                        }
                    }
                    if (rsAccess.getString(6) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(6).isEmpty()) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(6)).append("',");
                        }
                    }
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append(",");
                    }
                    sbQuery.append("'").append(rsAccess.getString(8)).append("',");
                    if (rsAccess.getString(9) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(9).isEmpty()) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(9)).append("',");
                        }
                    }
                    sbQuery.append("'").append(rsAccess.getString(10)).append("'").append(",");
                    if (rsAccess.getString(11).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(11)).append("),");
                    }
                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("exam_group_student_operations");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_OperationGroupExam");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.exam_group_student_operations("
                        + "id,student_operation_id,exam_group_id,number,updated,"
                        + "updated_by"
                        + ")VALUES");
                while (rsAccess.next()) {
                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    if (rsAccess.getString(2).equalsIgnoreCase("35")
                            || rsAccess.getString(2).equalsIgnoreCase("251")
                            || rsAccess.getString(2).equalsIgnoreCase("254")
                            || rsAccess.getString(2).equalsIgnoreCase("262")
                            || rsAccess.getString(2).equalsIgnoreCase("311")
                            || rsAccess.getString(2).equalsIgnoreCase("407")
                            || rsAccess.getString(2).equalsIgnoreCase("467")
                            || rsAccess.getString(2).equalsIgnoreCase("469")
                            || rsAccess.getString(2).equalsIgnoreCase("489")
                            || rsAccess.getString(2).equalsIgnoreCase("524")
                            || rsAccess.getString(2).equalsIgnoreCase("525")
                            || rsAccess.getString(2).equalsIgnoreCase("526")
                            || rsAccess.getString(2).equalsIgnoreCase("547")
                            || rsAccess.getString(2).equalsIgnoreCase("559")
                            || rsAccess.getString(2).equalsIgnoreCase("561")
                            || rsAccess.getString(2).equalsIgnoreCase("562")
                            || rsAccess.getString(2).equalsIgnoreCase("563")
                            || rsAccess.getString(2).equalsIgnoreCase("677")
                            || rsAccess.getString(2).equalsIgnoreCase("775")
                            || rsAccess.getString(2).equalsIgnoreCase("811")
                            || rsAccess.getString(2).equalsIgnoreCase("813")
                            || rsAccess.getString(2).equalsIgnoreCase("1223")
                            || rsAccess.getString(2).equalsIgnoreCase("1290")
                            || rsAccess.getString(2).equalsIgnoreCase("1560")
                            || rsAccess.getString(2).equalsIgnoreCase("1590")
                            || rsAccess.getString(2).equalsIgnoreCase("1755")
                            || rsAccess.getString(2).equalsIgnoreCase("1775")
                            || rsAccess.getString(2).equalsIgnoreCase("2686")
                            || rsAccess.getString(2).equalsIgnoreCase("2693")
                            || rsAccess.getString(2).equalsIgnoreCase("2694")
                            || rsAccess.getString(2).equalsIgnoreCase("2695")
                            || rsAccess.getString(2).equalsIgnoreCase("2696")
                            || rsAccess.getString(2).equalsIgnoreCase("2697")
                            || rsAccess.getString(2).equalsIgnoreCase("2698")
                            || rsAccess.getString(2).equalsIgnoreCase("2699")
                            || rsAccess.getString(2).equalsIgnoreCase("2700")
                            || rsAccess.getString(2).equalsIgnoreCase("2701")
                            || rsAccess.getString(2).equalsIgnoreCase("2702")
                            || rsAccess.getString(2).equalsIgnoreCase("2703")
                            || rsAccess.getString(2).equalsIgnoreCase("2704")
                            || rsAccess.getString(2).equalsIgnoreCase("2705")
                            || rsAccess.getString(2).equalsIgnoreCase("2811")
                            || rsAccess.getString(2).equalsIgnoreCase("2885")
                            || rsAccess.getString(2).equalsIgnoreCase("7591")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(2)).append(",");
                    }
                    sbQuery.append(rsAccess.getString(3)).append(",");
                    sbQuery.append(rsAccess.getString(4)).append(",");
                    sbQuery.append("'").append(rsAccess.getString(5)).append("'").append(",");
                    if (rsAccess.getString(6).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(6)).append("),");
                    }
                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
                log.info("exam");
                rsAccess = stmtAccess.executeQuery("SELECT * FROM R_Examination");

                sbQuery = new StringBuilder();
                sbQuery.append("INSERT INTO autoschool.exam("
                        + "id,student_operation_id,exam_group_operation_id,exam_date,exam_type_id,"
                        + "category,exam_result_id,exam_ball,exam_motive_id,updated,"
                        + "updated_by"
                        + ")VALUES");
                while (rsAccess.next()) {

                    sbQuery.append("(").append(rsAccess.getString(1)).append(",");
                    if (rsAccess.getString(2).equalsIgnoreCase("262")
                            || rsAccess.getString(2).equalsIgnoreCase("677")
                            || rsAccess.getString(2).equalsIgnoreCase("1428")
                            || rsAccess.getString(2).equalsIgnoreCase("1590")
                            || rsAccess.getString(2).equalsIgnoreCase("1775")
                            || rsAccess.getString(2).equalsIgnoreCase("7591")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(2)).append(",");
                    }
                    if (rsAccess.getString(3).equalsIgnoreCase("0")
                            || rsAccess.getString(3).equalsIgnoreCase("3627")
                            || rsAccess.getString(3).equalsIgnoreCase("3628")
                            || rsAccess.getString(3).equalsIgnoreCase("3659")
                            || rsAccess.getString(3).equalsIgnoreCase("3661")
                            || rsAccess.getString(3).equalsIgnoreCase("3662")
                            || rsAccess.getString(3).equalsIgnoreCase("3663")
                            || rsAccess.getString(3).equalsIgnoreCase("3813")
                            || rsAccess.getString(3).equalsIgnoreCase("3814")
                            || rsAccess.getString(3).equalsIgnoreCase("3815")
                            || rsAccess.getString(3).equalsIgnoreCase("4235")
                            || rsAccess.getString(3).equalsIgnoreCase("4236")
                            || rsAccess.getString(3).equalsIgnoreCase("4297")
                            || rsAccess.getString(3).equalsIgnoreCase("4298")
                            || rsAccess.getString(3).equalsIgnoreCase("4299")
                            || rsAccess.getString(3).equalsIgnoreCase("4300")
                            || rsAccess.getString(3).equalsIgnoreCase("4374")
                            || rsAccess.getString(3).equalsIgnoreCase("4416")
                            || rsAccess.getString(3).equalsIgnoreCase("4575")
                            || rsAccess.getString(3).equalsIgnoreCase("4591")
                            || rsAccess.getString(3).equalsIgnoreCase("4882")
                            || rsAccess.getString(3).equalsIgnoreCase("4883")
                            || rsAccess.getString(3).equalsIgnoreCase("4912")
                            || rsAccess.getString(3).equalsIgnoreCase("4928")
                            || rsAccess.getString(3).equalsIgnoreCase("5316")
                            || rsAccess.getString(3).equalsIgnoreCase("5388")
                            || rsAccess.getString(3).equalsIgnoreCase("5586")
                            || rsAccess.getString(3).equalsIgnoreCase("6029")
                            || rsAccess.getString(3).equalsIgnoreCase("6241")
                            || rsAccess.getString(3).equalsIgnoreCase("6396")
                            || rsAccess.getString(3).equalsIgnoreCase("6555")
                            || rsAccess.getString(3).equalsIgnoreCase("6561")
                            || rsAccess.getString(3).equalsIgnoreCase("6669")
                            || rsAccess.getString(3).equalsIgnoreCase("6793")
                            || rsAccess.getString(3).equalsIgnoreCase("6959")
                            || rsAccess.getString(3).equalsIgnoreCase("7396")
                            || rsAccess.getString(3).equalsIgnoreCase("7397")
                            || rsAccess.getString(3).equalsIgnoreCase("7728")
                            || rsAccess.getString(3).equalsIgnoreCase("7729")
                            || rsAccess.getString(3).equalsIgnoreCase("7768")
                            || rsAccess.getString(3).equalsIgnoreCase("7859")
                            || rsAccess.getString(3).equalsIgnoreCase("7860")
                            || rsAccess.getString(3).equalsIgnoreCase("7986")
                            || rsAccess.getString(3).equalsIgnoreCase("7987")
                            || rsAccess.getString(3).equalsIgnoreCase("8020")
                            || rsAccess.getString(3).equalsIgnoreCase("8021")
                            || rsAccess.getString(3).equalsIgnoreCase("8022")
                            || rsAccess.getString(3).equalsIgnoreCase("8327")
                            || rsAccess.getString(3).equalsIgnoreCase("8328")
                            || rsAccess.getString(3).equalsIgnoreCase("8545")
                            || rsAccess.getString(3).equalsIgnoreCase("8612")
                            || rsAccess.getString(3).equalsIgnoreCase("10985")
                            || rsAccess.getString(3).equalsIgnoreCase("12848")
                            || rsAccess.getString(3).equalsIgnoreCase("12849")
                            || rsAccess.getString(3).equalsIgnoreCase("12850")
                            || rsAccess.getString(3).equalsIgnoreCase("12851")
                            || rsAccess.getString(3).equalsIgnoreCase("12852")
                            || rsAccess.getString(3).equalsIgnoreCase("12853")
                            || rsAccess.getString(3).equalsIgnoreCase("12854")
                            || rsAccess.getString(3).equalsIgnoreCase("12855")
                            || rsAccess.getString(3).equalsIgnoreCase("12856")
                            || rsAccess.getString(3).equalsIgnoreCase("12857")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(3)).append(",");
                    }
                    if (rsAccess.getString(4) == null) {
                        sbQuery.append("null,");
                    } else {
                        if (rsAccess.getString(4).isEmpty()) {
                            sbQuery.append("null,");
                        } else {
                            sbQuery.append("'").append(rsAccess.getString(4)).append("',");
                        }
                    }
                    sbQuery.append(rsAccess.getString(5)).append(",");
                    sbQuery.append("'").append(rsAccess.getString(6)).append("',");
                    if (rsAccess.getString(7).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(7)).append(",");
                    }
                    if (rsAccess.getString(8).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(8)).append(",");
                    }
                    if (rsAccess.getString(9).equalsIgnoreCase("0")) {
                        sbQuery.append("null,");
                    } else {
                        sbQuery.append(rsAccess.getString(9)).append(",");
                    }
                    sbQuery.append("'").append(rsAccess.getString(10)).append("'").append(",");
                    if (rsAccess.getString(11).equalsIgnoreCase("0")) {
                        sbQuery.append("null),");
                    } else {
                        sbQuery.append(rsAccess.getString(11)).append("),");
                    }
                }
                try {
                    stmtMysql.execute(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));

                } catch (Exception e) {
                    log.error(sbQuery.toString().substring(0, sbQuery.toString().length() - 1));
                    log.error(e.getMessage());
                }
            }

        } catch (SQLException ex) {
            log.error(ex.getMessage());
        }
    }

}
