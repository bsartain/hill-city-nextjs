import westminsterShorterCatechism from "data/westminsterShorterCatechism.json";

const WestminsterShorterCatechism: React.FC<{ selectedQuestion: string }> = ({ selectedQuestion }) => {
  return (
    <div>
      {westminsterShorterCatechism.Data.map((item: any, index: number) => {
        if (item.Number.toString() === selectedQuestion) {
          return (
            <div key={index}>
              <p>
                <strong>
                  {westminsterShorterCatechism.Metadata.Title}: Question {selectedQuestion}
                </strong>
              </p>
              <div>
                <strong style={{ color: "#767676" }}>Question:&nbsp;</strong>
                <p dangerouslySetInnerHTML={{ __html: item.Question }}></p>
              </div>
              <div>
                <strong style={{ color: "#767676" }}>Answer:&nbsp;</strong>
                <p dangerouslySetInnerHTML={{ __html: item.Answer }}></p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default WestminsterShorterCatechism;
