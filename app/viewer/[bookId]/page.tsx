"use client";


import "regenerator-runtime";
import ReaderContainer from "./components/ReaderContainer";

function Page({ params }: { params: { bookId: string } }) {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <ReaderContainer />
    </div>
  );
}


export default Page;
