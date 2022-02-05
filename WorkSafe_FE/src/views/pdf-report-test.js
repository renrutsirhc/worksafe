import React, { useState } from "react";
import { usePDF, Document, Page } from "@react-pdf/renderer";
import Dashboard from "./dashboard";

const MyReport = (
  <Document>
    <Page>
      <Dashboard />
    </Page>
  </Document>
);

const PDFReport = () => {
  const [instance, updateInstance] = usePDF({ document: MyReport });

  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>Something went wrong: {error}</div>;

  return (
    <a href={instance.url} download="test.pdf">
      Download
    </a>
  );
};

export default PDFReport;
