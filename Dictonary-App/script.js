const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');
// const sound = document.getElementById('sound');

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});


const getWordInfo = async (word)=>{
    try{
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "Fetching Data...";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        console.log(data);

        let wordDefinition = data[0].meanings[0].definitions[0];
        let audioSrc = data[0].phonetics[0].audio;

        resultDiv.innerHTML =`
            <h2><strong>Word:</strong>${data[0].word}</h2>

            <h2><strong>Phonetics:</strong>${data[0].phonetic}
            
            <audio src=${audioSrc=== undefined? "Not Found": audioSrc} controls controlsList="nodownload"></audio></h2>

            <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning:</strong>${wordDefinition.definition === undefined ? "Not Found": wordDefinition.definition}</p>
            <p><strong>Example:</strong>${wordDefinition.example === undefined ? "Not Found": wordDefinition.example}</p>
            <p><strong>Antonyms:</strong></p>
            
            
        `;
        
        //Fethching Antonyms from API
        if(wordDefinition.antonyms.length===0){
            resultDiv.innerHTML += `<span>Not Found</span>`;
        }
        else{
                for(let i =0; i<wordDefinition.antonyms.length;i++){
                        resultDiv.innerHTML += `<li>${wordDefinition.antonyms[i]}</li>`;
                    }
            }      

        //Fethching Synonyms from API
        if(wordDefinition.synonyms.length===0){
            resultDiv.innerHTML += `<p><strong>Synonyms:</strong>Not Found</p>`;
        }
        else{
                for(let i =0; i<wordDefinition.synonyms.length;i++){
                        resultDiv.innerHTML += `<p><strong>Synonyms:</strong></p><ul>${wordDefinition.synonyms[i]}</ul>`;
                    }
            }          
        
        //Adding Read More Button
        resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;

    }

    catch (error){
        resultDiv.innerHTML =`<p>Sorry, the word could not be Found</p>`;
    }

    // function playSound() {
    //     // src = `https://api.dictionaryapi.dev/media/pronunciations/en/${word}`;
    //     sound.setAttribute = `${data[0].phonetics[0].audio}`;
    //     sound.play();
    // }
}

{/* <audio src="" controls ></audio> */}