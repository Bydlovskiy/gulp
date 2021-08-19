'use strict'
$(document).ready(function () {
    // BUTTONS PART 1

    $('[name=bold]').click(function () {
        $('.pblock').toggleClass('bold')
    })
    $('[name=underLine]').click(function () {
        $('.pblock').toggleClass('underline')
    })
    $('[name=cursive]').click(function () {
        $('.pblock').toggleClass('cursive')
    })
    $('[name=through]').click(function () {
        $('.pblock').toggleClass('through')
    })
    // BUTTONS PART 2

    $('[name=start]').click(function () {
        $('.pblock').toggleClass('left');
        $('.pblock').removeClass('center right')
    })
    $('[name=center]').click(function () {
        $('.pblock').toggleClass('center')
        $('.pblock').removeClass('left right')
    })
    $('[name=end]').click(function () {
        $('.pblock').toggleClass('right')
        $('.pblock').removeClass('left center')
    })
    // BUTTONS PART 3
    // FONT SIZE

    $('.fontSize a').each(function (i, elem) {
        $(elem).css('font-size', $(elem).text())
    })
    $('.fontSize a').click(function () {
        $('.container1').css('font-size', $(this).text())
    })
    // FONT FAMILY

    $('.fontFamily a').each(function (i, elem) {
        $(elem).css('font-family', $(elem).text())
    })
    $('.fontFamily a').click(function () {
        $('.container1').css('font-family', $(this).text())
    })
    // TEXT COLOR

    $('button[name=textColorBtn]').click(() => {
        $('[name=textColorBlock]').fadeIn(500)
    })
    $('[name=closeColorBlock]').click(() => {
        $('[name=textColorBlock]').fadeOut(500)
    })
    $('.closeBlock').mouseover(function () {
        $(this).css({
            'background-color': 'grey',
            'border-radius': '5px'
        })
    })
    $('.closeBlock').mouseout(function () {
        $(this).css('background-color', 'white')
    })
    $('[name=colorText]').click(function () {
        $('.container1').css('color', $(this).attr('style').slice(18, -1));
    })
    // BACKGROUND

    $('button[name=backgroundBtn]').click(() => {
        $('[name=backgrounContainer]').fadeIn(500)
    })
    $('[name=closeBackgroundBlock]').click(() => {
        $('[name=backgrounContainer]').fadeOut(500)
    })
    $('[name=chooseColor]').click(function () {
        $('[name=backgroundImageBlock]').hide();
        $('[name=backgroundFile]').hide();
        $('[name=backgroundColorsPalette]').show()
    })
    $('[name=chooseImage]').click(function () {
        $('[name=backgroundFile]').hide();
        $('[name=backgroundColorsPalette]').hide();
        $('[name=backgroundImageBlock]').show()
            .css('display', 'flex');
    })
    $('[name=chooseFiles]').click(function () {
        $('[name=backgroundImageBlock]').hide();
        $('[name=backgroundColorsPalette]').hide();
        $('[name=backgroundFile]').show();
    })
    // COLOR

    $('[name=colorBackgound]').click(function () {
        $('.container1').css({
            'background-image': 'none',
            'background-color': $(this).attr('style').slice(18, -1)
        });
    })
    // IMAGE

    $('.backgroundImage').click(function () {
        $('.container1').css({
            'background-image': `url(${$(this).attr('src')})`,
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%'
        })
    })
    // FILE

    $('[name=inputFile]').change(function (event) {
        let url = "url(" + URL.createObjectURL(event.target.files[0]) + ")";
        $('.container1').css({
            'background-image': url,
            'backgroundSize': '100%'
        })
    })
    // LOGIN LOGOUT

    $('button[name=LogInBtn]').click(() => {
        if ($('[name=LogInBtn] img').attr('src') == './icons/lock.svg') {
            $('[name=signInContainer]').fadeIn(500)
        } else {
            $('[name=signOutContainer]').fadeIn(500)
        }
    })
    $('[name=cancelSignOut]').click(() => {
        $('[name=signOutContainer]').fadeOut(500);
    })
    $('[name=signOut]').click(() => {
        $('[name=signOutContainer]').fadeOut(500);
        $('button[name=LogInBtn] img').attr('src', './icons/lock.svg');
        $('[name=createBtn]').attr('disabled', 'disabled')
    })
    $('[name=closeSignBlock]').click(() => {
        $('[name=signInContainer]').fadeOut(500)
        $('.SignForm').get(0).reset();
        $('[name=loginUser],[name=passwordUser]').removeClass('is-invalid')
        $('.wrongLog').hide()
    })

    function loginCheck() {
        let login = /^admin$/;
        if (login.test($('[name=loginUser]').val())) {
            $('[name=loginUser]').addClass('is-valid');
            $('[name=loginUser]').removeClass('is-invalid');
            return true
        } else if ($('[name=loginUser]').val() == '') {
            $('[name=loginUser]').addClass('is-invalid');
            $('[name=loginUser]').removeClass('is-valid');
            return 'empty'
        } else {
            $('[name=loginUser]').addClass('is-invalid');
            $('[name=loginUser]').removeClass('is-valid');
            return 'wrong'
        }
    }

    function passwordCheck() {
        let password = /^admin$/;
        if (password.test($('[name=passwordUser]').val())) {
            $('[name=passwordUser]').addClass('is-valid');
            $('[name=passwordUser]').removeClass('is-invalid');
            return true
        } else if ($('[name=passwordUser]').val() == '') {
            $('[name=passwordUser]').addClass('is-invalid');
            $('[name=passwordUser]').removeClass('is-valid');
            return 'empty'
        } else {
            $('[name=passwordUser]').addClass('is-invalid');
            $('[name=passwordUser]').removeClass('is-valid');
            return 'wrong'
        }
    }
    $('[name=signUserBtn]').click(() => {
        loginCheck();
        passwordCheck();
        if (loginCheck() == true && passwordCheck() == true) {
            $('.wrongLog').text('');
            $('button[name=createBtn]').removeAttr('disabled');
            $('button[name=LogInBtn] img').attr('src', './icons/lock(1).svg');
            $('[name=signInContainer]').fadeOut(500);
            $('.SignForm').get(0).reset();
            $('[name=passwordUser]').removeClass('is-valid is-invalid');
            $('[name=loginUser]').removeClass('is-valid is-invalid');
        } else if (loginCheck() == 'empty' || passwordCheck() == 'empty') {
            $('.wrongLog').text('Value is empty')
        } else {
            $('.wrongLog').text('Please check your login or password')
        }
    })
    // CREATE BUTTON 

    $('button[name=createBtn]').click(function () {
        $('form[name=mainForm]').hide();
        $('form[name=secondForm]').show();
        $('.pblock').hide();
        $('textarea').show()
        $('textarea').val($('.pblock').html());
    })
    $('button[name=save]').click(() => {
        $('.pblock').html($('textarea').val());
        $('.pblock').show();
        $('textarea').hide()
        $('form[name=mainForm]').show();
        $('form[name=secondForm]').hide();
    })
    // TABLE BLOCK

    $('button[name=table]').click(() => {
        $('[name=tableContainer]').fadeIn(500)
    })
    $('[name=closeTableBlock]').click(() => {
        $('[name=tableContainer]').fadeOut(500);
        $('[name=countTr],[name=countTd],[name=widthOfTd],[name=heightOfTd],[name=borderWidth],[name=borderStyle],[name=borerColor]').removeClass('is-invalid')
    })
    $('[name=tableReset]').click(() => {
        $('form[name=tableForm]').get(0).reset();
        $('[name=countTr],[name=countTd],[name=widthOfTd],[name=heightOfTd],[name=borderWidth],[name=borderStyle],[name=borerColor]').removeClass('is-invalid')
    })
    let tableInputs = /^\d+$/;
    let tableBorder = /^[a-zA-Z]+$/
    $('[name=tableCreate]').click(() => {
        if (TableAllValid()) {
            let td = '';
            let tbody = '';
            for (let i = 1; i <= $('[name=countTd]').val(); i++) {
                td += `<td style="width:${$('[name=widthOfTd]').val()+ 'px'};height:${$('[name=heightOfTd]').val()+'px'};text-align: center;border:${$('[name=borderWidth]').val() + 'px'} ${$('[name=borderStyle]').val()} ${$('[name=borerColor]').val()};font-size:${$('[name=heightOfTd]').val()+'px'}"></td>`;
            }
            for (let i = 1; i <= $('[name=countTr]').val(); i++) {
                tbody += `<tr>${td}</tr>`;
            }
            document.querySelector('textarea').value += `<table><tbody>${tbody}</tbody></table>`;
        } else {}
    })

    function tableValid(elem) {
        return tableInputs.test(elem.val());
    }

    function tableBorderValid(elem) {
        return tableBorder.test(elem.val())
    }

    function TableAllValid() {
        if (!tableValid($('[name=countTr]'))) {
            $('[name=countTr]').addClass('is-invalid')
        } else($('[name=countTr]').removeClass('is-invalid'))
        if (!tableValid($('[name=countTd]'))) {
            $('[name=countTd]').addClass('is-invalid')
        } else($('[name=countTd]').removeClass('is-invalid'))
        if (!tableValid($('[name=widthOfTd]'))) {
            $('[name=widthOfTd]').addClass('is-invalid')
        } else($('[name=widthOfTd]').removeClass('is-invalid'))
        if (!tableValid($('[name=heightOfTd]'))) {
            $('[name=heightOfTd]').addClass('is-invalid')
        } else($('[name=heightOfTd]').removeClass('is-invalid'))
        if (!tableValid($('[name=borderWidth]'))) {
            $('[name=borderWidth]').addClass('is-invalid')
        } else($('[name=borderWidth]').removeClass('is-invalid'))
        if (!tableBorderValid($('[name=borderStyle]'))) {
            $('[name=borderStyle]').addClass('is-invalid')
        } else($('[name=borderStyle]').removeClass('is-invalid'))
        if (!tableBorderValid($('[name=borerColor]'))) {
            $('[name=borerColor]').addClass('is-invalid')
        } else($('[name=borerColor]').removeClass('is-invalid'))
        if (tableValid($('[name=countTr]')) && tableValid($('[name=countTd]')) && tableValid($('[name=widthOfTd]')) && tableValid($('[name=heightOfTd]')) && tableValid($('[name=borderWidth]')) && tableBorderValid($('[name=borderStyle]')) && tableBorderValid($('[name=borerColor]'))) {
            return true
        }
    }
    // LIST

    let countLi = /^\d+$/;
    let markStyleOl = /^(1|i|I|a|A){1}$/;

    function validListCount(elem) {
        return countLi.test(elem.val())
    }

    function validListStyle(elem) {
        return markStyleOl.test(elem.val())
    }

    function olBlockValid() {
        if (!validListCount($('[name=countLiOl]'))) {
            $('[name=countLiOl]').addClass('is-invalid')
        } else {
            $('[name=countLiOl]').removeClass('is-invalid')
        }
        if (!validListStyle($('[name=OlListStyle]'))) {
            $('[name=OlListStyle]').addClass('is-invalid')
        } else {
            $('[name=OlListStyle]').removeClass('is-invalid')
        }
        if (validListCount($('[name=countLiOl]')) && validListStyle($('[name=OlListStyle]'))) {
            return true
        } else {

        }
    }
    // OLLIST

    $('button[name=olList]').click(() => {
        $('[name=olListContainer]').fadeIn(500)
    })
    $('[name=closeOlListBlock]').click(() => {
        $('[name=olListContainer]').fadeOut(500);
        $('[name=countLiOl],[name=OlListStyle]').removeClass('is-invalid')
    })
    $('button[name=olListReset]').click(() => {
        $('[name=countLiOl],[name=OlListStyle]').removeClass('is-invalid')
        $('form[name=olList]').get(0).reset()
    })
    $('button[name=olListCreate]').click(() => {
        if (olBlockValid()) {
            let ol = '';
            for (let i = 1; i <= $('input[name=countLiOl]').val(); i++) {
                ol += `<li>Item${i}</li>`
            }
            document.querySelector('textarea').value += `<ol type="${$('select[name=OlListStyle]').val()}">${ol}</ol>`
        }
    })
    let countList = /^\d+$/;
    let StyleOl = /^(1|i|I|a|A){1}$/;

    function validListCount(elem) {
        return countList.test(elem.val())
    }

    function validListStyle(elem) {
        return StyleOl.test(elem.val())
    }

    function olBlockValid() {
        if (!validListCount($('[name=countLiOl]'))) {
            $('[name=countLiOl]').addClass('is-invalid')
        } else {
            $('[name=countLiOl]').removeClass('is-invalid')
        }
        if (!validListStyle($('[name=OlListStyle]'))) {
            $('[name=OlListStyle]').addClass('is-invalid')
        } else {
            $('[name=OlListStyle]').removeClass('is-invalid')
        }
        if (validListCount($('[name=countLiOl]')) && validListStyle($('[name=OlListStyle]'))) {
            return true
        } else {

        }
    }
    // ULLIST

    let markStyleUl = /^(circle)|(disc)|(square)$/

    function validListMark(elem) {
        return markStyleUl.test(elem.val())
    }

    function ulBlockValid() {
        if (!validListCount($('[name=countLiUl]'))) {
            $('[name=countLiUl]').addClass('is-invalid')
        } else {
            $('[name=countLiUl]').removeClass('is-invalid')
        }
        if (!validListMark($('[name=UlListStyle]'))) {
            $('[name=UlListStyle]').addClass('is-invalid')
        } else {
            $('[name=UlListStyle]').removeClass('is-invalid')
        }
        if (validListCount($('[name=countLiUl]')) && validListMark($('[name=UlListStyle]'))) {
            return true
        }
    }
    $('button[name=UlList]').click(() => {
        $('[name=UlListContainer]').fadeIn(500)
    })
    $('[name=closeUlListBlock]').click(() => {
        $('[name=UlListContainer]').fadeOut(500);
        $('[name=countLiUl],[name=UlListStyle]').removeClass('is-invali')
    })
    $('button[name=UlListReset]').click(() => {
        $('form[name=UlList]').get(0).reset();
        $('[name=countLiUl],[name=UlListStyle]').removeClass('is-invali');
    })
    $('button[name=UlListCreate]').click(() => {
        if (ulBlockValid()) {
            let ul = '';
            for (let i = 1; i <= $('input[name=countLiUl]').val(); i++) {
                ul += `<li>Item${i}</li>`
            }
            document.querySelector('textarea').value += `<ul type="${$('select[name=UlListStyle]').val()}">${ul}</ul>`
        } else {}
    })
})