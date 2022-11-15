// import "./styles/Test.css";
import axios from "axios";

function Test() {
  async function getTest() {
    const { data } = await axios.get("/api/tests");
    console.log(data);
  }

  async function postTest() {
    await axios.post("/api/tests", {
      name: "Daniel",
      age: 23,
      status: "UNKNOWN",
    });
  }

  return (
    <div>
      <button className="create-new-table" type="submit" onClick={getTest}>
        Test GET
      </button>
      <button className="create-new-table" type="submit" onClick={postTest}>
        Test POST
      </button>
    </div>
  );
}

export default Test;
