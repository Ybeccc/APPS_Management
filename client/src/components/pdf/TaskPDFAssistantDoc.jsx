import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10, // Reduce bottom margin for a tighter layout
  },
  logoContainer: {
    marginRight: 5, // Reduce space between logo and text
  },
  logo: {
    width: 100, // Increase width
    height: 100, // Increase height to keep a square shape
    objectFit: "contain", // Ensures the image scales without being cropped
},
  textContainer: {
    textAlign: "center",
  },
  institutionName: {
    fontSize: 10, // Smaller font size
    fontWeight: "bold",
    marginBottom: 2, // Smaller spacing between text lines
  },
  address: {
    fontSize: 7, // Smaller font size for address
    marginBottom: 1,
  },
  website: {
    fontSize: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 10,
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
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 4,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    fontSize: 8, // Smaller font size in table headers
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 4,
    fontSize: 8, // Smaller font size for content
    textAlign: "center",
  },
  tableColLeftAlign: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 4,
    fontSize: 8,
    textAlign: "left",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 8, // Smaller font size for "no data" text
    color: "#555",
  },
});

const TaskPDFAssistantDoc = ({ tasks, selectedMonth, selectedYear }) => {
  const monthName = new Date(`${selectedYear}-${selectedMonth}-01`).toLocaleDateString("id-ID", {
    month: "long",
  });

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image src="/logo.png" style={styles.logo} />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.institutionName}>FAKULTAS TEKNOLOGI INFORMASI</Text>
            <Text style={styles.institutionName}>UNIVERSITAS TARUMANAGARA</Text>
            <Text style={styles.address}>Jl. Let. Jend. S. Parman No.1, Blok R Lantai XI, Jakarta 11440</Text>
            <Text style={styles.address}>Telp :021 - 5676260 - 5677949, Fax : 56941924</Text>
            <Text style={styles.website}>Website : https://fti.untar.ac.id</Text>
          </View>
        </View>
        
        {/* Report Title with Month and Year */}
        <Text style={styles.title}>
          LAPORAN BULANAN REKAPITULASI KEHADIRAN ASISTEN DOSEN {monthName.toUpperCase()} {selectedYear}
        </Text>

        {/* Table Header */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Tanggal</Text>
            <Text style={styles.tableColHeader}>Nama Tugas</Text>
            <Text style={styles.tableColHeader}>Deskripsi Tugas</Text>
            <Text style={styles.tableColHeader}>Catatan</Text>
            <Text style={styles.tableColHeader}>Nama Asisten</Text>
          </View>

          {/* Table Content */}
          {tasks && tasks.length > 0 ? (
            tasks.map((task, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>
                  {task.tsk_created ? new Date(task.tsk_created).toLocaleDateString("id-ID") : "N/A"}
                </Text>
                <Text style={styles.tableCol}>{task.course_name || "N/A"}</Text>
                <Text style={styles.tableColLeftAlign}>{task.description || "N/A"}</Text>
                <Text style={styles.tableColLeftAlign}>{task.notes || "N/A"}</Text>
                <Text style={styles.tableCol}>{task.user_fullname || "N/A"}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>Tidak ada data untuk ditampilkan.</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default TaskPDFAssistantDoc;