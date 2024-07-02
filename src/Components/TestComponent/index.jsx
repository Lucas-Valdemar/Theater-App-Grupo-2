import React from "react";
import useFetchDataByUrl from "@/hooks/fetchUrlHook";

const TestComponent = () => {
  const apiUrl = "http://localhost:3000/api/movies/6684366607276e54b53ce448JJ";

  const { data, loading, error } = useFetchDataByUrl(apiUrl);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;
  return (
    <div>
      {data && (
        <>
          <img src={data.movieThumb} alt={data.movieTitle} />
          <h1>{data.movieTitle}</h1>
          <p>{data.movieDescription}</p>
          <span>{data.movieYear}</span>
        </>
      )}
    </div>
  );
};

export default TestComponent;
