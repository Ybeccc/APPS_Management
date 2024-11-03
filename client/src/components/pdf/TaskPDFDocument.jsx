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
    color: "#7b2cbf",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
  },
});

const TaskPDFDocument = ({ tasks }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Manajemen Tugas</Text>
      <View style={styles.table}>
        {/* Table Headers */}
        <View style={styles.tableRow}>
          {["Tanggal", "Nama Tugas", "Deskripsi Tugas", "Catatan", "Nama Asisten"].map((header, index) => (
            <View style={styles.tableCol} key={index}>
              <Text style={styles.tableCell}>{header}</Text>
            </View>
          ))}
        </View>
        {/* Table Data */}
        {tasks.map((task, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {new Date(task.tskCreatedAt).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{task.tskTaskName || "N/A"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{task.tskDescription || "N/A"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{task.tskNotes || "N/A"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{task.tskCreatedBy || "N/A"}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default TaskPDFDocument;