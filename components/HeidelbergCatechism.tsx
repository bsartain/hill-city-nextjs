import HeidelbergCatechsimData from "data/heidelbergCatechism.json";

const HeidelbergCatechsim: React.FC<{ selectedQuestion: string }> = ({ selectedQuestion }) => {
  return (
    <div>
      {HeidelbergCatechsimData.Data.map((item: any, index: number) => {
        if (item.Number.toString() === selectedQuestion) {
          return (
            <div key={index}>
              <p>
                <strong>
                  {HeidelbergCatechsimData.Metadata.Title}: Question {selectedQuestion}
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

export default HeidelbergCatechsim;
