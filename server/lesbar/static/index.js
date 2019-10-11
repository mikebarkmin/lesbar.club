(function() {
  let rootURL =
    location.protocol +
    '//' +
    location.hostname +
    (location.port ? ':' + location.port : '');
  let checkBtn = document.getElementById('check');
  let textInput = document.getElementById('text-input');
  let results = document.getElementById('results');

  let trans_dict = {'check': {de: 'Überprüfen',
                              en: 'Check'},
                    'text-input': {de: 'Gib den zu prüfenden Text hier ein...',
                                   en: 'Enter the text to be checked here...'},
                    'chars': {de: 'Zeichen',
                              en: 'Characters'},
                    'letters': {de: 'Buchstaben',
                                en: 'Letters'},
                    'syllables': {de: 'Silben',
                                  en: 'Syllables'},
                    'sentences': {de: 'Sätze',
                                  en: 'Sentences'},
                    'words': {de: 'Wörter',
                              en: 'Words'},
                    };

  function translate(){
      if (getLanguage().startsWith('en')){
          for(var key in trans_dict){
                if(key === 'check'){
                    document.getElementById('check').innerText = trans_dict[key].en;
                }else{
                    if(key === 'text-input'){
                        document.getElementById('text-input').placeholder = trans_dict[key].en;
                    }
                    else{
                        var tmp_el = document.getElementById(key).childNodes[1];
                        tmp_el.innerHTML = trans_dict[key].en;
                    }
                }
            }
          }
  }

  translate();

  function getLanguage(){
    var userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.replace('-', '_');
    return userLang;
  }

  function checkText() {
    let text = textInput.value;
    let data = { text, language: getLanguage()};

    checkBtn.classList.add('active');
    results.classList.remove('show');
    checkBtn.disabled = true;

    fetch(rootURL + '/api/v1/lesbar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        checkBtn.classList.remove('active');
        checkBtn.disabled = false;
        displayResults(json);
      })
      .catch(e => {
        checkBtn.classList.remove('active');
        checkBtn.disabled = false;
        console.log(e);
      });
  }

  function displayResults({ text, lesbar }) {
    results.classList.add('show');
    let letters = document.getElementById('letters');
    let chars = document.getElementById('chars');
    let syllables = document.getElementById('syllables');
    let sentences = document.getElementById('sentences');
    let words = document.getElementById('words');

    letters.getElementsByClassName('number')[0].innerHTML = text.num_letters;
    chars.getElementsByClassName('number')[0].innerHTML = text.num_character;
    syllables.getElementsByClassName('number')[0].innerHTML =
      text.num_syllables;
    sentences.getElementsByClassName('number')[0].innerHTML =
      text.num_sentences;
    words.getElementsByClassName('number')[0].innerHTML = text.num_words;

    let fre = document.getElementById('fre');
    let wstf = document.getElementById('wstf');
    let lix = document.getElementById('lix');

    fre.getElementsByClassName('result')[0].innerHTML = round(lesbar.fre_de);
    wstf.getElementsByClassName('result')[0].innerHTML = round(lesbar.wstf_1);
    lix.getElementsByClassName('result')[0].innerHTML = round(lesbar.lix);
  }

  function round(number, precision = 2) {
    return (
      Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision)
    );
  }

  checkBtn.addEventListener('click', checkText);
})();
