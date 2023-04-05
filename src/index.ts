import * as shellSdkHelper from './shell-sdk-helper';


const updateUI = (text: string) => {
    (document.querySelectorAll('#info')[0] as any).innerHTML = text;
};

function disableButton() {
    let removeWorkTimeBtn = <HTMLInputElement> document.querySelector('#removeWorkTimeBtn');

    if (removeWorkTimeBtn) {
        removeWorkTimeBtn.disabled = true;
    }
}

function enableButton() {
    let removeWorkTimeBtn = <HTMLInputElement> document.querySelector('#removeWorkTimeBtn');

    if (removeWorkTimeBtn) {
        removeWorkTimeBtn.disabled = false;
    }
}

window.addEventListener('load', async () => {

    let UIContextList = '';

    if (shellSdkHelper.isInsideShell) {
        const context = await shellSdkHelper.getContext();

        UIContextList = '<ul>';
        for (const [key, value] of Object.entries(context)) {
            UIContextList = UIContextList + (typeof value === 'object' ?
                '<li>' + `${key}: ${JSON.stringify(value)}` + '</li>' :
                '<li>' + `${key}: ${value}` + '</li>');
        }
        UIContextList = UIContextList + '</ul>';
    }

    updateUI(UIContextList);
});
