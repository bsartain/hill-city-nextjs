import catechismData from "data/catechismData.json";

const NewCityCatechism: React.FC<{ selectedQuestion: string }> = ({ selectedQuestion }) => {
  return (
    <div>
      {catechismData.map((item: any, index: number) => {
        if (index + 1 === parseInt(selectedQuestion)) {
          return (
            <div key={index}>
              <p>
                <strong>New City Catechism: Question {selectedQuestion}</strong>
              </p>
              <div>
                <strong style={{ color: "#767676" }}>Question:&nbsp;</strong>
                <p dangerouslySetInnerHTML={{ __html: item.question }}></p>
              </div>
              <div>
                <strong style={{ color: "#767676" }}>Answer:&nbsp;</strong>
                <p dangerouslySetInnerHTML={{ __html: item.answer.adult }}></p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default NewCityCatechism;
