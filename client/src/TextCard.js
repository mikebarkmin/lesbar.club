import React, { useState, useEffect } from 'react';
import { Card, CardFooter, CardHeader, CardContent } from './Card';
import LanguageSelect from './LanguageSelect';
import { ButtonSecondary } from './Button';
import TextArea from './TextArea';
import TextResult from './TextResult';
import TextNotify from './TextNotify';
import TextMarkup from './TextMarkup';
import config from './config';

function TextCard() {
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState();
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);
  const [altResults, setAltResults] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch(config.apiURL + '/api/v1/languages', {
      method: 'GET'
    })
      .then(r => r.json())
      .then(json => {
        setLanguages(json.languages);
        setLanguage(json.languages[0]);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  function testText() {
    fetch(config.apiURL + '/api/v1/lesbar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, language })
    })
      .then(response => response.json())
      .then(json => {
        setResults(json['results']);
        setShowResult(true);
        if ('alt_results' in json) {
          setAltResults(json['alt_results']);
        }
      })
      .catch(e => {});
  }

  function handleLanguageChange(value) {
    setLanguage(value);
  }

  function handleShowTextArea() {
    setShowResult(false);
  }

  function handleTextChange(e) {
    setText(e.target.value);
    setShowResult(false);
  }

  function handleUseAlt() {
    setLanguage(altResults.text.language);
    setResults(altResults);
    setAltResults(null);
  }

  return (
    <Card>
      <CardHeader>
        <h2>Text</h2>
        <LanguageSelect
          languages={languages}
          value={language}
          onChange={handleLanguageChange}
        />
        <ButtonSecondary onClick={testText} style={{ marginLeft: 8 }}>
          Überprüfen
        </ButtonSecondary>
      </CardHeader>
      <CardContent>
        {!showResult ? (
          <TextArea
            onChange={handleTextChange}
            value={text}
            placeholder="Gib den zu prüfenden Text hier ein..."
          ></TextArea>
        ) : (
          <TextMarkup
            onClick={handleShowTextArea}
            sentences={results.text.sentences}
          ></TextMarkup>
        )}
      </CardContent>
      <CardFooter>
        {altResults && <TextNotify onClick={handleUseAlt} />}
        {results && <TextResult {...results} />}
      </CardFooter>
    </Card>
  );
}

export default TextCard;
