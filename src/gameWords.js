const gameWords = {
    words: ['Roma', 'Imperio', 'Encriptacion', 'Olimpiadas', 'Cesar'],

    shuffleWords() {
        for (let i = this.words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
        }
        return this.words;
    }
};

export default gameWords;