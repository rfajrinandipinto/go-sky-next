import React from "react";

const PreviewContext = React.createContext({
  PreviewData: {},
  setPreviewData: (data) => {},
});

export default PreviewContext;
