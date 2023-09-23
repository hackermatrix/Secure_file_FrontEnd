import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// import { FileViewer } from 'react-file-viewer';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function ViewerPage() {
  const location = useLocation();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const url = location.state.url;

  useEffect(() => {
    async function fetchFileAccessStatus() {
      try {
        const response = await axios.get(url);
        setAllowed(true);
      } catch (error) {
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    }

    fetchFileAccessStatus();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!allowed) {
    return <center><h2>File Access Expired</h2></center>;
  }

  const docs = [
    { uri: url },
  ];

  return (
    <DocViewer prefetchMethod="GET" documents={docs} pluginRenderers={DocViewerRenderers} />
  );
}