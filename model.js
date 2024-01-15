// есть preview храним в моделе
class Model {
    constructor({
        onMemesChange,
        onCurrentMemeIdChange, // - забираем
        onTextTopChange, //
        onTextBottomChange
    }) {
        //хранилка для мемов - this.memes
        this.memes = [];
        // добавили хранение текущего выбранного iD мема
        this.currentMemeId = null;
        // есть текст сверху и снизу
        this.textTop = '';
        this.textBottom = '';

        // как только в модели произойдут изменения TextTop Text Bottom и др. у меня запустяться обработчики
        this.onMemesChange = onMemesChange;
        this.onCurrentMemeIdChange = onCurrentMemeIdChange; // забрали и складываем в св-во
        this.onTextTopChange = onTextTopChange;
        this.onTextBottomChange = onTextBottomChange;
    }
// создали метод get, чтобы получить снаружи эту preview
    //get получает
    // добавили для хранилки мемов get и set, чтобы можно было получить и достать мемы
    getMemes() {
        return this.memes;
    }

    // set устанавливает, когда прийдет ответ нужно сделать set memes, чтобы он осел в модели.
    // SetMemes и мемы меняет и CurrentMemeID
    //  SetMemes запускает отрисовку Селекта и Превью
    setMemes(memes) {
        this.memes = memes;
        this.currentMemeId = memes[2].id; // мем который пришел от бекенда

        this.onMemesChange();
        this.onCurrentMemeIdChange();
    }

    setCurrentMemeId(currentMemeId) {
        this.currentMemeId  = currentMemeId;

        // вызывается onCurrentMemeIdChange
        this.onCurrentMemeIdChange();
    }

    getCurrentMemeId() {
        return this.currentMemeId;
    }

    // там где есть тексТоп
    setTextTop(text) {
        this.textTop = text;
        // запускается обработчик
        this.onTextTopChange();
    }

       // там где есть тексBottom
    setTextBottom(text) {
        this.textBottom = text;
        // запускается обработчик
        this.onTextBottomChange();
    }


    // когда из Модели делаю getPreview - собираю:
    getPreview = () => {
        return {
            textTop: this.textTop,
            textBottom: this.textBottom,
            url: this.getCurrentMeme().url
        };
    }

    //умеет доставать текущей Mem обьект
    getCurrentMeme() {
        let currentMeme = null;

        this.memes.forEach (meme => {
            if(meme.id === this.getCurrentMemeId()) {
                currentMeme = meme;
            }
        })
        return currentMeme;
    }
}