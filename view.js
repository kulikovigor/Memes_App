// сделали во вьюхе доступ ко всем нодам html элементам
class View {
    constructor( {
        onMemeChange,
        onTextTopChange, // получает действия кот.нужно сделать когда меняется текст
        onTextBottomChange  // получает действия кот.нужно сделать когда меняется текст
    }) {
        this.previewTopTextNode = document.querySelector('.js-top-text');
        this.previewBottomTextNode = document.querySelector('.js-bottom-text');
        this.previewImageNode = document.querySelector('.js-image');
        
        this.settingSelectNode = document.querySelector('.js-memes-select');
        this.textTopInputNode = document.querySelector('.js-text-top-input');
        this.textBottomInputNode = document.querySelector('.js-text-bottom-input');

        this.validationMessageBottomNode = document.querySelector('.validationMessage');

        this.onMemeChange = onMemeChange;
        this.onTextTopChange = onTextTopChange;
        this.onTextBottomChange = onTextBottomChange;

        // обработчики событий
        this.settingSelectNode.addEventListener('change', this._handleSelectChange);
        this.textTopInputNode.addEventListener('input', this._handleTextTopChange);
        this.textBottomInputNode.addEventListener('input', this._handleTextBottomChange);
    }

    // принимаем превью и обьект и вырисовывает данные в интерфейсе, по готовому набору данных
    renderPreview(prewiew) {
        const {
            url,
            textTop,
            textBottom
        } = prewiew;

            if (textBottom.length > 50) {
            this.validationMessageBottomNode.style.display = 'block';
            } else {
            this.validationMessageBottomNode.style.display = 'none';
            }

    // тут взаимодействуем с DOM деревом, меняем обновляем данные 
        this.previewTopTextNode.innerText = textTop;
        this.previewBottomTextNode.innerText = textBottom;
        this.previewImageNode.src = url;
    }


    // отрисовывает метод Select, чтобы он отрисовался надо передать мемы и выб ID
    // внутри селекта генерируем options
    renderMemesSelect(memes, currentMemeId) {
        // берем массив мемом пробегаемся по нему, достаем id и name
        memes.forEach(meme => {
            const {
                id,
                name,
            } = meme;

            // cоздаем опшины(option),
            const optionNode = document.createElement('option');
            // добавляем им value
            optionNode.setAttribute('value', id);
            // добавляем им innerText
            optionNode.innerText = name;
            // если текущей мем совпадает с тем кот выбран то нужно обозначить его как выбранный.
            if (id === currentMemeId) {
                optionNode.setAttribute('selected', true);
            }

            // затем внутрь селекта вставляем опшион элементы
            this.settingSelectNode.appendChild(optionNode);
        });

    }

    // происходит событие и Вьюха сообщает наружу 
    // добавляем обработку смены Select_а
    _handleSelectChange = () => {
        const id = this.settingSelectNode.value;

        // как только меняется селект запусти метод что селект поменялся, передай iD
        this.onMemeChange(id);
    }
     // происходит событие и Вьюха сообщает наружу
    // запускатем обработчики передаем новое value в callback
    _handleTextTopChange = (event) => {
        this.onTextTopChange(event.target.value);
    }
     // происходит событие и Вьюха сообщает наружу
    _handleTextBottomChange = (event) => {
        this.onTextBottomChange(event.target.value);
    }
}
