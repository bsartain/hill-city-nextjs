import westminsterLargerCatechism from "data/westminsterLargerCatechism.json";
import { RefTagger } from "react-reftagger";

const WestminsterShorterCatechism: React.FC<{ selectedQuestion: string }> = ({ selectedQuestion }) => {
  return (
    <div>
      {westminsterLargerCatechism.Data.map((item: any, index: number) => {
        if (item.Number.toString() === selectedQuestion) {
          return (
            <div key={index}>
              <h3>
                {westminsterLargerCatechism.Metadata.Title}: Question {selectedQuestion}
              </h3>
              <div>
                <strong style={{ color: "#767676" }}>Question:&nbsp;</strong>
                <p dangerouslySetInnerHTML={{ __html: item.Question }}></p>
              </div>
              <div>
                <strong style={{ color: "#767676" }}>Answer:&nbsp;</strong>
                <p dangerouslySetInnerHTML={{ __html: item.Answer }}></p>
              </div>
              <div>
                <strong style={{ color: "#767676" }}>Proofs:&nbsp;</strong>
                <div>
                  {item.Proofs.map((verse: any, index: number) => {
                    return (
                      <>
                        <RefTagger bibleVersion={"ESV"} />
                        <span
                          style={{ fontSize: "18px", color: "#737373" }}
                          key={index}
                          dangerouslySetInnerHTML={{ __html: verse.References }}></span>
                        ;&nbsp;
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default WestminsterShorterCatechism;
