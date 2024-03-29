import {openModal, closeModal} from '../modules/modal';
import {postData} from '../services/services';


function form({formSelector, modalSelector, modalWindowTimer}) {
    //Forms

    const forms = document.querySelectorAll(formSelector);

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const message = {
                loading: 'img/form/spinner.svg',
                success: 'Готово!',
                failure: 'Что-то не так'
            };

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'multipart/form-data'); -- НЕ ВВОДИТЬ КОГДА ОТПРАВЛЯЕМ ФОРМЫ
            // request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // request.send(JSON.stringify(object));

            form.append(statusMessage);

            postData("http://localhost:3000/requests", json)
            .then((data) => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal(modalSelector, modalWindowTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal(modalSelector);
        }, 4000);
    }

    // fetch('https://jsonplaceholder.typicode.com/posts',{
    //     method: "POST",
    //     body: JSON.stringify({name: 'Artem'}),
    //     headers: {
    //         "Content-type": "application/json"
    //     }
    // }
    // )
    //   .then(response => response.json())
    //   .then(json => console.log(json));


    fetch('http://localhost:3000/menu')
        .then(item => item.json())
        .then(item => console.log(item));
}

export default form;