const galleryInit = () => {
    const moveRight = (photoThumbsContainer) => {
        photoThumbsContainer.insertBefore(photoThumbsContainer.lastElementChild, photoThumbsContainer.childNodes[0]);
    };

    const appendImg = (el, wrapper) => {
        let img = new Image();
        img.src = el.dataset.imgSrc;
        wrapper.innerHTML = '';
        wrapper.appendChild(img);
    };

    appendText = (el) => {
        let text = el.dataset.imgText;
        document.getElementById('js_photo_text').innerHTML = text;
    };

    const slidePhoto = (event) => {
        let singlePhoto = event.currentTarget;
        let photoContainer = document.getElementById('js_photo_preview');
        let thumbsContainer = document.getElementById('js_photo_thumbs');

        let moveRightCount = countRightMove(singlePhoto, thumbsContainer);

        let i = 0;
        while (i < moveRightCount) {
            moveRight(thumbsContainer);
            i++;
        }
        appendImg(singlePhoto, photoContainer);
        appendText(singlePhoto);
    };

    const lastVisiblePhoto = () => {
        let thumbsContainer = document.getElementById('js_photo_thumbs');
        let thumbsContainerWidth = thumbsContainer.getClientRects()[0].width;
        let singlePhotoWidth = document.getElementsByClassName('js_photo_thumb')[0].getClientRects()[0].width;
        let num = thumbsContainerWidth / singlePhotoWidth;
        return document.getElementsByClassName('js_photo_thumb')[num];
    };

    const countRightMove = (singlePhoto, thumbsContainer) => {
        let thumbsContainerWidth = thumbsContainer.getClientRects()[0].width;
        let singlePhotoWidth = singlePhoto.getClientRects()[0].width;
        const index = [ ...singlePhoto.parentElement.children ].indexOf(singlePhoto);
        return thumbsContainerWidth / singlePhotoWidth - index;
    };

    document.querySelectorAll('.js_photo_thumb').forEach((el) => {
        el.onclick = slidePhoto;
    });

    document.getElementById('js_next_photo').onclick = () => {
        let photo = lastVisiblePhoto();
        moveRight(document.getElementById('js_photo_thumbs'));
        appendImg(photo, document.getElementById('js_photo_preview'));
        appendText(photo);
    };
};
