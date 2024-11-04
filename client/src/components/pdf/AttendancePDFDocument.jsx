import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeaderNo: {
    width: "5%",  // Reduced width for "No" column
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    backgroundColor: "#f0f0f0",
  },
  tableColHeaderKelas: {
    width: "10%",  // Reduced width for "Kelas" column
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    backgroundColor: "#f0f0f0",
  },
  tableColHeader: {
    width: "21.25%",  // Evenly divided width for remaining columns
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    backgroundColor: "#f0f0f0",
  },
  tableColNo: {
    width: "5%",  // Reduced width for "No" data
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  tableColKelas: {
    width: "10%",  // Reduced width for "Kelas" data
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  tableCol: {
    width: "21.25%",  // Adjusted width for other columns
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    fontSize: 10,
    textAlign: "center",
  },
  leftAlignCell: {
    fontSize: 10,
    textAlign: "left",
  },
});

const AttendancePDFDocument = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Kehadiran</Text>
      <View style={styles.table}>
        {/* Table Headers */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeaderNo}>
            <Text style={styles.tableCellHeader}>No</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Tanggal</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Nama Asisten</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Mata Kuliah</Text>
          </View>
          <View style={styles.tableColHeaderKelas}>
            <Text style={styles.tableCellHeader}>Kelas</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Check-in</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Check-out</Text>
          </View>
        </View>
        
        {/* Table Data */}
        {data.map((attendance, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableColNo}>
              <Text style={styles.tableCell}>{index + 1}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {new Date(attendance.created_date).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.leftAlignCell}>{attendance.user_fullname || "N/A"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.leftAlignCell}>{attendance.course_name || "N/A"}</Text>
            </View>
            <View style={styles.tableColKelas}>
              <Text style={styles.tableCell}>{attendance.class_name || "N/A"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{attendance.check_in || "N/A"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{attendance.check_out || "N/A"}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default AttendancePDFDocument;