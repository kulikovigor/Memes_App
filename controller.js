class Controller {
    constructor() {
        this.model = new Model({
            onMemesChange: this.handleModelMemesChange, // если в Модели что-то меняется сразу идет вызов метода handleModelMemesChange
            onCurrentMemeIdChange: this.handleModelCurrentMemeIdChange,
            onTextTopChange: this.handleModelTextTopChange,
            onTextBottomChange: this.handleModelTextBottomChange
        });

        this.view = new View({
            onMemeChange: this.handleViewMemeChange,
            onTextTopChange: this.handleViewTextTopChange,
            onTextBottomChange: this.handleViewTextBottomChange,
        });

        this.api = new API();
    }

    //метод init - идем в API и достаем данные, после делаем set mems
    init() {
        // получаем мемы из API
        this.api.getMemes()
            .then(data => {
                const memes = data.data.memes;
                memes.length = 90; // сократил кол-во элементов в массиве
                // сетим их в модель
                // console.log(memes)
                this.model.setMemes(memes);
            });

            // this.view.validationMessageTopNode.style.display = 'none';
            this.view.validationMessageBottomNode.style.display = 'none';
    }

    // на изменение Мемов в Моделе есть отображение Select(a)
    // когда меняют Мемы в Модели - делаем renderMemesSelect
    handleModelMemesChange = () => {
        // делаем renderMemesSelect
        this.view.renderMemesSelect(this.model.getMemes(), this.model.getCurrentMemeId());
    }

    // когда в модели меняется currentmemеID запускается handleModelCurrentMemeIdChange
    // на изменение currendID в Модели есть изменение Вьюхи
    handleModelCurrentMemeIdChange = () => {
        // и вызовется renderPreview новое
            this.view.renderPreview(this.model.getPreview());
        }

    // когда меняется тексСверху  то вызываем рендер
    handleModelTextTopChange = () => {
        this.view.renderPreview(this.model.getPreview());
    }

    handleModelTextBottomChange = () => {
        this.view.renderPreview(this.model.getPreview());
    }

    //когда меняется Мем во вьюхе Селект - поменяем в моделе currentmemеID
    //на изменение Мема внутри вьюхи - меняем модель.
    handleViewMemeChange = (id) => {
        this.model.setCurrentMemeId(id);
    }

    //когда меняет обработчик текста сверху и в Модели соответсвенно тоже меняем
    handleViewTextTopChange = (text) => {
        validation();

        this.model.setTextTop(text);
    }

    handleViewTextBottomChange = (text) => {
        validation();

        this.model.setTextBottom(text);
    }
}

    function validation () {

        const textValid = document.getElementById('validationMessage');

        if (50 < document.getElementById('uptext').value.length || 50 < document.getElementById('downtext').value.length) {
            // this.view.validationMessageBottomNode.innerText = "You have entered a lot of characters. Delete the previous character";
            textValid.innerText = "You have entered a lot of characters. Delete the previous character";
            
    }   
}
