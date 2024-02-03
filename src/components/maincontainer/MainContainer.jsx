import { useEffect, useState } from "react";
import data from "../../data/updated-articles.json";
import "./mainContainer.css";
const MainContainer = () => {
  const [selectView, setSelectView] = useState("all");
  const [myQuestions, setMyQuestions] = useState([]);
  const [myQuestionsAfterMainSearch, setMyQuestionsAfterMainSearch] = useState([]);
  const [mainSearchInput, setMainSearchInput] = useState("");
  const mainFilter = () => {
    const filteredQuestions = myQuestions.filter(
      (question) =>
        question.Question.toLowerCase().includes(mainSearchInput.toLowerCase()) ||
        question.Answer.toLowerCase().includes(mainSearchInput.toLowerCase()) ||
        question["Arabic Question"].toLowerCase().includes(mainSearchInput.toLowerCase()) ||
        question["Arabic Answer"].toLowerCase().includes(mainSearchInput.toLowerCase())
    );
    setMyQuestionsAfterMainSearch(filteredQuestions);
    setSelectView("mainResults");
    setSubSearchInput("")
  };
//   Secondary Search
const [myQuestionsAfterSubSearch, setMyQuestionsAfterSubSearch] = useState([]);
  const [subSearchInput, setSubSearchInput] = useState("");
  const secondaryFilter = () => {
    const filteredQuestions = myQuestionsAfterMainSearch?.filter(
      (question) =>
        question.Question.toLowerCase().includes(subSearchInput.toLowerCase()) ||
        question.Answer.toLowerCase().includes(subSearchInput.toLowerCase()) ||
        question["Arabic Question"].toLowerCase().includes(subSearchInput.toLowerCase()) ||
        question["Arabic Answer"].toLowerCase().includes(subSearchInput.toLowerCase())
    );
    setMyQuestionsAfterSubSearch(filteredQuestions);
    setSelectView("secondaryResults");
  };
  useEffect(() => {
    data && setMyQuestions(data?.KnowledgeArticleAdvanced);
  }, []);
  return (
    <div>
      <div>
        <input
          className="main-search"
          value={mainSearchInput}
          onChange={(e) => setMainSearchInput(e.target.value)}
          type="search"
        />
        <button
          className="main-search-btn"
          onClick={() => {
            mainFilter();
          }}
        >
          Search
        </button>
      </div>
      <div style={{marginTop:"10px"}}>
        <input
          className="main-search"
          value={subSearchInput}
          onChange={(e) => setSubSearchInput(e.target.value)}
          type="search"
        />
        <button
          className="main-search-btn"
          onClick={() => {
            secondaryFilter();
          }}
        >
          Secondary Search
        </button>
      </div>
      <div>
        <p>
          Total Questions: <strong> {myQuestions?.length} </strong>
        </p>
        <p>
          Total Filter: <strong> {myQuestionsAfterMainSearch?.length} </strong>
        </p>
        {
            selectView!="mainResults"&&
            <p>
          Total secondary Filter: <strong> {myQuestionsAfterSubSearch?.length} </strong>
        </p>
        }
        <h3>You are Using: {selectView}</h3>
      </div>
      <div className="articles">
        {selectView == "all"
          ? myQuestions?.map((question) => {
              return (
                <div className="article-container">
                  <div className="questions-container">
                    <div className="question-box">{question.Question}</div>
                    <div className="question-box">{question["Arabic Question"]}</div>
                  </div>
                  <div className="answers-container">
                    <div className="answer-box">{question.Answer}</div>
                    <div className="answer-box">{question["Arabic Answer"]}</div>
                  </div>
                </div>
              );
            }):selectView == "mainResults"
            ? myQuestionsAfterMainSearch?.map((question) => {
              return (
                <div className="article-container">
                  <div className="questions-container">
                    <div className="question-box">{question.Question}</div>
                    <div className="question-box">{question["Arabic Question"]}</div>
                  </div>
                  <div className="answers-container">
                    <div className="answer-box">{question.Answer}</div>
                    <div className="answer-box">{question["Arabic Answer"]}</div>
                  </div>
                </div>
              );
            }) :
            myQuestionsAfterSubSearch?.map((question) => {
                return (
                  <div className="article-container">
                    <div className="questions-container">
                      <div className="question-box">{question.Question}</div>
                      <div className="question-box">{question["Arabic Question"]}</div>
                    </div>
                    <div className="answers-container">
                      <div className="answer-box">{question.Answer}</div>
                      <div className="answer-box">{question["Arabic Answer"]}</div>
                    </div>
                  </div>
                );
              }) 
        }
      </div>
    </div>
  );
};
export default MainContainer;
