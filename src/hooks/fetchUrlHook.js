"use client";
import { useState, useEffect } from "react";

export default function useFetchDataByUrl(baseUrl) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataByUrl = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (baseUrl) {
      fetchDataByUrl();
    }
  }, [baseUrl]);

  return { data, loading, error };
}
